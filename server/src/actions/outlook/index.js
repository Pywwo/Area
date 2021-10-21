const Action = require('../../models/action');
const request = require('request');
const Applet = require('../../models/applet');
const cryptoRandomString = require('crypto-random-string');
const receiveAMail = require('./receiveAMail');
const receiveAMailFromX = require('./receiveAMailFromX');
const moment = require('moment');

const name = 'outlook';

const setWebHookInformation = (actionId, webhookId, clientState) => {
    Action.update({
        id: actionId,
        poll_data: JSON.stringify({webHookId: webhookId, clientState: clientState})
    }, (err) => {if (err) console.log(err)})
};

const setOutlookWebHook = (action, callback) => {
    const clientState = cryptoRandomString({length: 30, type: 'url-safe'});
    let expiationDateTime = moment();
    expiationDateTime.add('4230', 'minutes');
    const options = {
        url: `https://graph.microsoft.com/v1.0/subscriptions`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${action.service.token}`,
            'Content-Type':	'application/json'
        },
        json: {
            changeType: "created",
            notificationUrl: `https://area51.ngrok.io/outlook/webhook/receive`,
            resource: "me/mailFolders('Inbox')/messages",
            expirationDateTime:expiationDateTime,
            clientState: clientState,
            latestSupportedTlsVersion: "v1_2"
        }
    };
    request(options, (err, res) => {
        if (err)
            return callback(err);
        if (res.body.error)
            return callback(res.body.error);
        setWebHookInformation(action.id, res.body.id, clientState);
        callback(null);
    });
};

const findOutlookReaction = (applet, mailId) => {
    const action = applet.action;
    const options = {
        url: `https://graph.microsoft.com/v1.0/me/messages/${mailId}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${action.service.token}`
        }
    };
    request(options, (err, res) => {
        if (err)
            return console.log(err);
        if (applet.action.name === receiveAMailFromX.name)
            receiveAMailFromX.trigger(applet, res.body);
        if (applet.action.name === receiveAMail.name)
            receiveAMail.trigger(applet, res.body);
    });
};

const removeWebhook = (action) => {
    const options = {
        url: `https://graph.microsoft.com/v1.0/subscriptions/${action.poll_data.webHookId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${action.service.token}`
        }
    };
    request(options, (err) => {
        if (err)
            return console.log(err);
    });
};

const trigger = (clientState, mailId) => {
    Applet.findEnabledByServiceAction(name, (err, data) => {
        if (err)
            return console.log(err);
        const applets = data.filter(applet => applet.action_data.clientState === clientState);
        applets.forEach(app => {
            const applet = Applet.appletObject(app);
            findOutlookReaction(applet, mailId);
        })
    });
};

module.exports = {
    setOutlookWebHook,
    removeWebhook,
    trigger,
    name
};
