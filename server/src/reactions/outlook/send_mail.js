const request = require('request');
const utils = require('../utils');
const name = "send_mail";

const reaction = (applet, outputs) => {
    let {receiver, object, content} = applet.reaction.params;

    receiver = utils.newParamOutputs(receiver, outputs);
    object = utils.newParamOutputs(object, outputs);
    content = utils.newParamOutputs(content, outputs);
    const token = applet.reaction.service.token;

    const options = {
        url: `https://graph.microsoft.com/v1.0/me/sendMail`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':	'application/json'
        },
        json: {
            message: {
                subject: object,
                body: {
                    contentType: 'Text',
                    content: content
                },
                toRecipients: [{
                        emailAddress: {address: receiver}
                }]
            }
        }
    };

    request(options, (err) => {
        if (err)
            console.log(err);
    });
};

module.exports = {
    reaction,
    name
};
