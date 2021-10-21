const reaction = require('../../reactions/index');
const Applet = require('../../models/applet');

const receiveMsgFromSeller = require("./receiveMsgFromSeller");

/* timer as second */
const timer = 5;

const trigger = (action, callback) => {
    if (action.name === receiveMsgFromSeller.name)
        receiveMsgFromSeller.trigger(action, callback);
    else
        callback(false);
};

const checkDiscogsActions = () => {
    Applet.findEnabledByServiceAction('discogs', (err, applets) => {
        if (err)
            return console.log(err);
        applets.forEach(applet => {
            const app = Applet.appletObject(applet);
            trigger(app.action, (done, output) => {
                if (done)
                    reaction.react(app, output);
            });
        });
    });
};

setInterval(checkDiscogsActions, timer * 1000);