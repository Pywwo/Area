const utils = require('../utils');
const request = require('request');

const name = 'comment_on_pull_request';

const reaction = (applet, outputs) => {
    let {repo_owner, repo_name, pull_number, comment} = applet.reaction.params;
    repo_owner = utils.newParamOutputs(repo_owner, outputs);
    repo_name = utils.newParamOutputs(repo_name, outputs);
    pull_number = utils.newParamOutputs(pull_number, outputs);
    comment = utils.newParamOutputs(comment, outputs);

    let options = {
        uri: `https://api.github.com/repos/${repo_owner}/${repo_name}/pulls/${pull_number}`,
        method: 'GET',
        headers: {
            'User-Agent': 'AREA51-Skeird-App',
            'Authorization': `token ${applet.reaction.service.token}`
        }
    };
    request(options, (err, res, body) => {
        if (!body || err) return console.log(err);
        options.uri = JSON.parse(body).issue_url;
        options.json = {body: comment.toString()};
        options.method = 'POST';
        request(options, (err, res, body) => {
            if (!body || err) return console.log(err);
        })
    });
};

module.exports = {
    reaction,
    name
};
