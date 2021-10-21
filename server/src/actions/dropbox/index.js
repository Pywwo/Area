const Action = require('../../models/action');
const request = require('request');
const fileUploaded = require('./fileUploaded');
const folderUploaded = require('./folderUploaded');
const fileOrFolderDeleted = require('./fileOrFolderDeleted');
const Applet = require('../../models/applet');

const name = 'dropbox';

const setWebHookInformation = (actionId, cursor, accountId) => {
    Action.update({
        id: actionId,
        poll_data: JSON.stringify({accountId: accountId, cursor: cursor})
    }, (err) => {if (err) console.log(err)})
};

const setDropboxWebHook = (action, callback) => {
    let options = {
        url: `https://api.dropboxapi.com/2/users/get_current_account`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${action.service.token}`
        }
    };
    request(options, (err, res) => {
        if (err)
            return callback(err);
        const accountId = JSON.parse(res.body).account_id;
        let path = action.params.folder;

        if (path.slice(-1) === '/')
            path = path.slice(0, -1);
        options = {
            url: 'https://api.dropboxapi.com/2/files/list_folder',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${action.service.token}`,
                'Content-Type': 'application/json'
            },
            json: {
                path: path,
                recursive: action.params.recursive === 'true'
            }
        };
        request(options, (err, res) => {
            if (err || !res.body || !res.body.cursor)
                return callback('error: ', err);
            setWebHookInformation(action.id, res.body.cursor, accountId);
            callback(null);
        });
    });
};

const splitPath = (path) => {
    const file = path.substring(path.lastIndexOf('/') + 1);
    const folder = path.substring(0, path.lastIndexOf('/')) + '/';

    return {folder: folder, file: file};
};

const findDropboxReaction = (applet) => {
    const action = applet.action;
    const options = {
        url: `https://api.dropboxapi.com/2/files/list_folder/continue`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${action.service.token}`,
            "Content-Type": "application/json"
        },
        json: {
            cursor: action.poll_data.cursor
        }
    };
    request(options, (err, res) => {
        if (err || !res.body.entries || !res.body.cursor)
            return console.log(err);
        res.body.entries.forEach(entry => {
            fileUploaded.trigger(applet, entry, splitPath(entry.path_display));
            folderUploaded.trigger(applet, entry, splitPath(entry.path_display));
            fileOrFolderDeleted.trigger(applet, entry, splitPath(entry.path_display));
        });
        setWebHookInformation(action.id, res.body.cursor, action.poll_data.accountId);
    });
};

const trigger = (accountId) => {
    Applet.findEnabledByServiceAction(name, (err, data) => {
        if (err)
            return console.log(err);
        const applets = data.filter(applet =>
            applet.action_data &&
            applet.action_data.accountId &&
            applet.action_data.accountId === accountId);
        applets.forEach(app => {
            const applet = Applet.appletObject(app);
            findDropboxReaction(applet);
        })
    });
};

module.exports = {
    setDropboxWebHook,
    trigger,
    name
};
