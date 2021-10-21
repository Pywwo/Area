const name = 'comment_on_issue';
const request = require('request');
const utils = require('../utils');

const reaction = (applet, outputs) => {
    let {repo_owner, repo_name, issue_number, comment} = applet.reaction.params;
    repo_owner = utils.newParamOutputs(repo_owner, outputs);
    repo_name = utils.newParamOutputs(repo_name, outputs);
    issue_number = utils.newParamOutputs(issue_number, outputs);
    comment = utils.newParamOutputs(comment, outputs);

    const options = {
        url: `https://api.github.com/repos/${repo_owner}/${repo_name}/pulls/${issue_number}/comments`,
        method: 'POST',
        headers: {
            'User-Agent': 'AREA51-Skeird-App',
            'Authorization': `token ${applet.reaction.service.token}`
        },
        json: {
            body: comment
        }
    };

    request(options, (err, res, body) => {
        if (!body || err)
            console.log(err)
    });
};

module.exports = {
    reaction,
    name
};
