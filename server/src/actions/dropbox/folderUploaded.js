const reaction = require('../../reactions/index');
const tag = 'folder';
const name = 'folder_uploaded';

const trigger = (applet, entry, path) => {
    if (applet.action.name !== name || !entry['.tag'] || entry['.tag'] !== tag) return;
    const outputs = {
        folder: path.folder,
        folder_name: path.file
    };
    reaction.react(applet, outputs);
};

module.exports = {
    tag,
    trigger
};
