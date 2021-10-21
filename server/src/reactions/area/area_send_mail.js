const nodeMailer = require('nodemailer');
const utils = require('../utils');
const name = "area_send_mail";

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: "areazone51walid@gmail.com",
        pass: "LEMOTDEPASSEDELAREA(&"
    }
});

const reaction = (applet, outputs) => {
    let {receiver, object, content} = applet.reaction.params;
    receiver = utils.newParamOutputs(receiver, outputs);
    object = utils.newParamOutputs(object, outputs);
    content = utils.newParamOutputs(content, outputs);

    const options = {
        from: "areazone51walid@gmail.com",
        to: receiver,
        subject: object,
        text: content
    };
    transporter.sendMail(options, (err, res) => {
        if (err)
            console.error(err);
    })
};

module.exports = {
    reaction,
    name
};

