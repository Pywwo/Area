const Display = require('../../models/display');
const name = "display";
const utils = require('../utils');

const reaction = (applet, outputs) => {
    const {color, title, content} = applet.reaction.params;

    Display.create(applet.user_id,
        utils.newParamOutputs(color, outputs),
        utils.newParamOutputs(title, outputs),
        utils.newParamOutputs(content, outputs),
        applet.action.service.name,
        (err, display) => {
        if (err)
            console.log(err);
    });
};

module.exports = {
    reaction,
    name
};
