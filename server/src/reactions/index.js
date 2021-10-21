const display = require('./area/display');
const area_send_mail = require('./area/area_send_mail');
const commentOnIssue = require('./github/commentOnIssue');
const commentOnPullRequest = require('./github/commentOnPullRequest');
const deleteFile = require('./dropbox/deleteFile');
const duplicateFile = require('./dropbox/duplicateFile');
const likeVideo = require('./youtube/likeVideo');
const dislikeVideo = require('./youtube/dislikeVideo');
const unrateVideo = require('./youtube/unrateVideo');
const sendMail = require('./outlook/send_mail');

const actions = {};

actions[display.name] = display.reaction;
actions[area_send_mail.name] = area_send_mail.reaction;
actions[commentOnIssue.name] = commentOnIssue.reaction;
actions[commentOnPullRequest.name] = commentOnPullRequest.reaction;
actions[deleteFile.name] = deleteFile.reaction;
actions[duplicateFile.name] = duplicateFile.reaction;
actions[likeVideo.name] = likeVideo.reaction;
actions[dislikeVideo.name] = dislikeVideo.reaction;
actions[unrateVideo.name] = unrateVideo.reaction;
actions[sendMail.name] = sendMail.reaction;

module.exports = {
    react: (applet, output) => {
        if (actions[applet.reaction.name])
            actions[applet.reaction.name](applet, output);}
};
