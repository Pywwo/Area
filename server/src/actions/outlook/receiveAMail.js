const reaction = require('../../reactions/index');
const name = 'receive_a_mail';

const trigger = (applet, mail) => {
    mail = JSON.parse(mail);
    if (!mail.sender || !mail.sender.emailAddress) return console.error("error outlook api");
    const outputs = {
        sender_name: mail.sender.emailAddress.name,
        sender_mail: mail.sender.emailAddress.address,
        object: mail.subject,
        content: mail.bodyPreview
    };
    reaction.react(applet, outputs);
};

module.exports = {
    name,
    trigger
};
