const reaction = require('../../reactions/index');
const Applet = require('../../models/applet');

const newGameWithRequestedKills = require("./newGameWithRequestedKills");
const newGameWithRequestedMultiKill = require("./newGameWithRequestedMultiKill");

/* timer as second */
const timer = 120;

const trigger = (action, callback) => {
    if (action.name === newGameWithRequestedKills.name)
        newGameWithRequestedKills.trigger(action, callback);
    else if (action.name === newGameWithRequestedMultiKill.name)
        newGameWithRequestedMultiKill.trigger(action, callback);
    else
        callback(false);
};

const checkRiotActions = () => {
    Applet.findEnabledByServiceAction('riot', (err, applets) => {
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

setInterval(checkRiotActions, timer * 1000);
