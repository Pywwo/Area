const reaction = require('../../reactions/index');
const Applet = require('../../models/applet');
const everyXHour = require('./everyXHour');
const itIsXAm = require('./itIsXAm');
const triggerWeekly = require('./triggerOneDayPerWeek');
const timer = 15;

const trigger = (action, callback) => {
    if (action.name === everyXHour.name)
        everyXHour.trigger(action, callback);
    if (action.name === itIsXAm.name)
        itIsXAm.trigger(action, callback);
    if (action.name === triggerWeekly.name)
        triggerWeekly.trigger(action, callback);
};

const checkTimeActions = () => {
    Applet.findEnabledByServiceAction('time', (err, applets) => {
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

setInterval(checkTimeActions, timer * 1000);
