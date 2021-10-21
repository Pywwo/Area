const reaction = require('../../reactions/index');
const tag = 'file';
const name = 'file_uploaded';

const trigger = (applet, entry, path) => {
    if (applet.action.name !== name || !entry['.tag'] || entry['.tag'] !== tag) return;
    const outputs = {
        folder: path.folder,
        file_name: path.file,
        size: entry.size,
        date: entry.server_modified
    };
    reaction.react(applet, outputs);
};

module.exports = {
    tag,
    trigger
};
