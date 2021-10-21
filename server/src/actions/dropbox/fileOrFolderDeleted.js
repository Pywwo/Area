const reaction = require('../../reactions/index');
const tag = 'deleted';
const name = 'file_or_folder_deleted';

const trigger = (applet, entry, path) => {
    if (applet.action.name !== name || !entry['.tag'] || entry['.tag'] !== tag) return;
    const outputs = {
        folder: path.folder,
        name: path.file
    };
    reaction.react(applet, outputs);
};

module.exports = {
    tag,
    trigger
};
