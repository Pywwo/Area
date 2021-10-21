const request = require('request');
const utils = require('../utils');

const name = "delete_file";

const reaction = (applet, outputs) => {
    let {repo_name, file_name} = applet.reaction.params;

    repo_name = utils.newParamOutputs(repo_name, outputs);
    file_name = utils.newParamOutputs(file_name, outputs);

    if (repo_name.slice(-1) !== '/')
        repo_name += '/';

    const options = {
        url: `https://api.dropboxapi.com/2/files/delete_v2`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${applet.reaction.service.token}`,
            'Content-Type': 'application/json'
        },
        json: {
            path: repo_name + file_name
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
