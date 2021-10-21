const axios = require('axios');
const qs = require('qs');
const Action = require('../../models/action');
const reaction = require('../../reactions/index');
const Applet = require('../../models/applet');
const cryptoRandomString = require('crypto-random-string');
const name = 'update_on_subbed_channel';

const setWebhookId = (actionId, webhookId, channelId) => {
    Action.update({
        id: actionId,
        poll_data: JSON.stringify({webhookId: webhookId, channelId: channelId})
    }, (err) => {if (err) console.log(err)})
};

const addYoutubeWebhook = (action, callback) => {
    const hookId = cryptoRandomString({length: 30, type: 'url-safe'});
    const {channelId} = action.params;
    const url = `https://pubsubhubbub.appspot.com/subscribe`;
    axios.post(url, qs.stringify({
        "hub.callback": `https://area51.ngrok.io/youtube/webhook/receive/${hookId}`,
        "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
        "hub.verify": 'async',
        "hub.mode": 'subscribe',
        "hub.verify_token": "",
        "hub.secret": "",
        "hub.lease_seconds": ""
    }), {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(result => {
        setWebhookId(action.id, hookId, channelId);
        callback(null, result);
    }).catch(err => {
        callback(err);
    });
};

const trigger = (hookId, channelId, feed) => {
    Applet.findEnabledByActionName(name, (err, data) => {
        if (err)
            return console.log(err);
        const applets = data.filter(applet =>
            applet.action_data.channelId === channelId &&
                applet.action_data.webhookId === hookId
        );
        if (applets.length === 0) {
            return deleteYoutubeWebhook({action: {poll_data: {
                webhookId: hookId,
                channelId: channelId
            }}});
        }
        const outputs = {
            channel: channelId,
            title: feed.title,
            link: feed.link[0].$.href
        };
        applets.forEach(applet => {
            reaction.react(Applet.appletObject(applet), outputs);
        });
    });
};

const deleteYoutubeWebhook = (applet) => {
    const {webhookId, channelId} = applet.action.poll_data;
    const url = `https://pubsubhubbub.appspot.com/subscribe`;
    axios.post(url, qs.stringify({
        "hub.callback": `https://area51couille.ngrok.io/youtube/webhook/receive/${webhookId}`,
        "hub.topic": `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
        "hub.verify": 'async',
        "hub.mode": 'unsubscribe',
        "hub.verify_token": "",
        "hub.secret": "",
        "hub.lease_seconds": ""
    }), {
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).catch(err => {
        console.log(err);
    });
};

module.exports = {
    addYoutubeWebhook,
    deleteYoutubeWebhook,
    name,
    trigger
};
