const status = require('../htmlResponseCodes');
const crypto = require('crypto');
const Applet = require('../models/applet');
const newPushOnRepo = require('../actions/github/newPushOnRepo');
const updateOnSubbedChannel = require('../actions/youtube/updateOnSubbedChannel');
const dropbox = require('../actions/dropbox/index');
const outlook = require('../actions/outlook/index');

// DANS LE DOUTE 8eff93cab58847c9895fe0809c302140de04eb36

const githubWebhookSecret = process.env.GITHUB_CLIENT_SECRET;
const dropboxWebhookSecret = process.env.DROPBOX_CLIENT_SECRET;
const sigHeaderNameGithub = 'X-Hub-Signature';
const sigHeaderNameDropbox = 'x-dropbox-signature';

const webhookController = {
    initWebhook: (app, callback) => {
        if (app.action.polling) return callback(null);
        Applet.findById(app.applet.id, (err, applet) => {
            if (err) return callback(err);
            applet = Applet.appletObject(applet);
            if (applet.action.name === newPushOnRepo.name) {
                newPushOnRepo.addGithubWebhook(applet.action, (err) => {
                    if (err) return callback(err);
                    callback(null);
                });
            } else if (applet.action.service.name === dropbox.name) {
                dropbox.setDropboxWebHook(applet.action, (err) => {
                    if (err) return callback(err);
                    callback(null);
                });
            } else if (applet.action.name === updateOnSubbedChannel.name) {
                updateOnSubbedChannel.addYoutubeWebhook(applet.action, (err) => {
                    if (err) return callback(err);
                    callback(null);
                });
            } else if (applet.action.service.name === outlook.name) {
                outlook.setOutlookWebHook(applet.action, (err) => {
                    if (err) return callback(err);
                    callback(null);
                });
            } else
                callback('action not found');
        });
    },
    removeWebhook: (applet) => {
        if (applet.action.polling) return;
        if (applet.action.name === newPushOnRepo.name)
            newPushOnRepo.deleteGithubWebhook(applet);
        if (applet.action.name === updateOnSubbedChannel.name)
            updateOnSubbedChannel.deleteYoutubeWebhook(applet);
        if (applet.action.service.name === outlook.name)
            outlook.removeWebhook(applet.action);
    },

    youtubeWebhookReceiveValidate: (req, res) => {
        res.status(status.NO_ERROR).send(req.query['hub.challenge']);
    },

    youtubeWebhookReceive: (req, res) => {
        if (!req.body || !req.params.hook_id)
            return res.status(status.ERROR).json({message: "KO"});
        const topicUrl = req.body.feed.link[1].$.href;
        const channelId = topicUrl.substring(topicUrl.lastIndexOf('=') + 1);
        updateOnSubbedChannel.trigger(req.params.hook_id, channelId, req.body.feed.entry[0]);
        res.status(status.NO_ERROR).json({message: "OK"});
    },

    /*
     * Function used by POST /github/webhook/receive, used to execute a REACTION for the github service.
     * Callback set on a github webhook
     */
    githubWebhookReceive: (req, res) => {
        if (req.body.zen) {
            return res.status(status.NO_ERROR).json({message: "OK"});
        }
        const body = req.body;
        const webHookOutputs = {
            repo_owner: body.repository.owner.name,
            repo_name: body.repository.name,
            pusher: body.pusher.name,
            commit_message: body.head_commit.message,
            timestamp: body.head_commit.timestamp
        };
        newPushOnRepo.trigger(webHookOutputs);
        res.status(status.NO_ERROR).json({message: "OK"});
    },

    confirmDropboxWebhook: (req, res) => {
        res.set({
            'Content-Type': 'text/plain',
            'X-Content-Type-Options': 'nosniff'
        });
        console.log("CHALLENGE: "+req.query.challenge);
        res.send(req.query.challenge);
    },

    dropboxWebhookReceive: (req, res) => {
        if (!req.body)
            return res.status(status.ERROR).json({message: "KO"});
        if (req.body.list_folder && req.body.list_folder.accounts[0])
            dropbox.trigger(req.body.list_folder.accounts[0]);
        res.status(status.NO_ERROR).json({message: "OK"});
    },

    /*
     * Function used by POST /github/webhook/receive, used to verify if the request is coming from a valid Github webhook
     * Verifies the signature of the encoded header X-Hub-Signature
     */
    verifyGithubWebhook: (req, res, next) => {
        const payload = JSON.stringify(req.body);
        if (!payload)
            return next('Request body empty');
        const sig = req.get(sigHeaderNameGithub) || '';
        const hmac = crypto.createHmac('sha1', githubWebhookSecret);
        const digest = Buffer.from('sha1=' + hmac.update(payload).digest('hex'), 'utf8');
        const checksum = Buffer.from(sig, 'utf8');
        if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum))
            return next(`Request body digest (${digest}) did not match ${sigHeaderNameGithub} (${checksum})`);
        return next();
    },

    /*
     * Function used by POST /dropbox/webhook/receive, used to verify if the request is coming from a valid Dropbox webhook
     * Verifies the signature of the encoded header x-dropbox-signature
     */
    verifyDropboxWebhook: (req, res, next) => {
        const signature = req.headers[sigHeaderNameDropbox];
        const hash = crypto.createHmac('SHA256', dropboxWebhookSecret).update(req.rawBody).digest('hex');
        if (signature !== hash)
            return next(`Request body digest did not match ${sigHeaderNameDropbox}`);
        return next();
    },
    outlookWebhookReceive: (req, res) => {
        res.set({
            'Content-Type': 'text/plain'
        });
        if (req.query && req.query.validationToken)
            return res.send(req.query.validationToken);
        if (!req.body || !req.body.value)
            return res.send('KO');
        req.body.value.forEach(value => {
            if (value.clientState && value.resourceData)
                outlook.trigger(value.clientState, value.resourceData.id);
        });
        res.send('OK');
    },
};

module.exports = webhookController;

