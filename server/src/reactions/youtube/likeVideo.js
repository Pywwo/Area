const name = 'like_a_video';
const request = require('request');
const utils = require('../utils');
const {google} = require('googleapis');
const googleOauth2Client = google.auth.OAuth2;

const reaction = (applet, outputs) => {
    let {url} = applet.reaction.params;
    url = utils.newParamOutputs(url, outputs);
    const oauth2Client = new googleOauth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "https://area51.ngrok.io/google/login/callback"
    );
    oauth2Client.credentials = {
        access_token: applet.reaction.service.token,
        refresh_token: applet.reaction.service.refresh_token
    };
    google.youtube({version: 'v3', auth: oauth2Client}).videos.rate({
        id: url.substring(url.lastIndexOf('=') + 1),
        rating: "like"
    }, function(err, data, response) {
        if (err)
            console.error(err);
    });
};

module.exports = {
    reaction,
    name
};
