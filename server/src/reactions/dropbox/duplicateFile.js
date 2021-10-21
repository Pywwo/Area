const request = require('request');
const utils = require('../utils');

const name = "duplicate_file";

const reaction = (applet, outputs) => {
    let {repo_name, file_name, new_repo, new_file} = applet.reaction.params;

    repo_name = utils.newParamOutputs(repo_name, outputs);
    file_name = utils.newParamOutputs(file_name, outputs);
    new_repo = utils.newParamOutputs(new_repo, outputs);
    new_file = utils.newParamOutputs(new_file, outputs);

    if (repo_name.slice(-1) !== '/')
        repo_name += '/';

    const options = {
        url: `https://api.dropboxapi.com/2/files/copy_v2`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${applet.reaction.service.token}`,
            'Content-Type': 'application/json'
        },
        json: {
            from_path: repo_name + file_name,
            to_path: new_repo + new_file,
            autorename: true
        }
    };

    request(options, (err, res) => {
        if (err)
            console.log(err);
    });
};

module.exports = {
    reaction,
    name
};
