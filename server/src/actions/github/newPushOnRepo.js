const Action = require('../../models/action');
const axios = require('axios');
const reaction = require('../../reactions/index');
const Applet = require('../../models/applet');
const githubWebhookSecret = process.env.GITHUB_CLIENT_SECRET;
const name = 'new_push_on_repo';

const setWebhookId = (actionId, webhookId) => {
    Action.update({
        id: actionId,
        poll_data: JSON.stringify({webhookId: webhookId})
    }, (err) => {if (err) console.log(err)})
};

const addGithubWebhook = (action, callback) => {
    const {repo_owner, repo_name} = action.params;
    const url = `https://api.github.com/repos/${repo_owner}/${repo_name}/hooks`;
    axios.post(url, {
        config: {
            url: "https://area51.ngrok.io/github/webhook/receive",
            content_type: "json",
            secret: githubWebhookSecret
        }
    }, {
        headers: {
            'User-Agent': 'AREA51-Skeird-App',
            'Authorization': `token ${action.service.token}`
        },
    }).then(result => {
        setWebhookId(action.id, result.data.id);
        callback(null, result);
    }).catch(err => {
        callback(err);
    });
};

const trigger = (outputs) => {
    Applet.findEnabledByActionName(name, (err, data) => {
        if (err)
            return console.log(err);
        const applets = data.filter(applet =>
            applet.action_params.repo_owner === outputs.repo_owner &&
            applet.action_params.repo_name === outputs.repo_name);
        if (applets[0])
            reaction.react(Applet.appletObject(applets[0]), outputs);
    });
};

const deleteGithubWebhook = (applet) => {
    const webhookId = applet.action.poll_data.webhookId;
    const {repo_owner, repo_name} = applet.action.params;
    axios.delete(`https://api.github.com/repos/${repo_owner}/${repo_name}/hooks/${webhookId}`, {
        headers: {
            'User-Agent': 'AREA51-Skeird-App',
            'Authorization': `token ${applet.action.service.token}`
        },
    }).catch(err => {
        console.log(err);
    });
};

module.exports = {
    addGithubWebhook,
    deleteGithubWebhook,
    name,
    trigger
};
