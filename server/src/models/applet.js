const orm = require("../orm");
const db = require("../database");

const table = 'applets';
const columns = ['applets.id', 'applets.user_id', 'applets.name', 'applets.enabled', 'applets.description', 'applets.created_at',
    'a.id action_id', 'a.name action_name', 'a.params action_params', 'a.polling action_polling', 'a.poll_data action_data',
    'a_s.name action_s_name, a_s.oauth action_s_oauth', 'a_s.token action_s_token', 'a_s.refresh_token action_s_refresh_token',
    'r.id reaction_id', 'r.name reaction_name', 'r.params reaction_params',
    'r_s.name reaction_s_name, r_s.oauth reaction_s_oauth', 'r_s.token reaction_s_token', 'r_s.refresh_token reaction_s_refresh_token'];

const joins = {
    'users u': 'u.id=applets.user_id',
    'actions a': 'a.applet_id=applets.id',
    'services a_s': 'a.service_id=a_s.id',
    'reactions r': 'r.applet_id=applets.id',
    'services r_s': 'r_s.id=r.service_id'
};

const condition = (appletId, userId) => {
    if (!userId)
        return `id=${appletId}`;
    let str = `applets.user_id=${userId}`;
    str += appletId ?`AND applets.id=${appletId}` : ``;
    return str;
};

const Applet = {
    appletObject: (applet) => {
        return {id: applet.id, user_id: applet.user_id, name: applet.name, enabled: applet.enabled, description: applet.description, created_at: applet.created_at,
            action: {
                id: applet.action_id,
                name: applet.action_name,
                params: applet.action_params,
                polling: applet.action_polling,
                poll_data: applet.action_data,
                service: {
                    name: applet.action_s_name,
                    oauth: applet.action_s_oauth,
                    token: applet.action_s_token,
                    refresh_token: applet.action_s_refresh_token,
                }
            },
            reaction: {
                id: applet.reaction_id,
                name: applet.reaction_name,
                params: applet.reaction_params,
                service: {
                    name: applet.reaction_s_name,
                    oauth: applet.reaction_s_oauth,
                    token: applet.reaction_s_token,
                    refresh_token: applet.reaction_s_refresh_token,
                }
            }};
    },
    create: (userId, name, description, callback) => {
        const query = orm.generateInsertRequest(table, {
            user_id: userId,
            name: name ? name : `name`,
            description: description ? description : `description`,
            enabled: true
        });
        db.query(query, (err, data) => {
            if (err)
                return callback(err);
            callback(null, data.rows[0]);
        });
    },
    findById: (id, callback) => {
        const query = orm.generateSelectRequest(table, columns, `applets.id=${id}`, joins);

        db.query(query, (err, data) => {
            if (err)
                return callback(err);
            if (data.rows && data.rows[0])
                return callback(null, data.rows[0]);
            callback('applet not found');
        });
    },

    findByIdFromUser: (userId, appletId, callback, fullData) => {
        const query = fullData ? orm.generateSelectRequest(table, columns, condition(appletId, userId), joins) :
            orm.generateSelectRequest(table, undefined, condition(appletId, userId));

        db.query(query, (err, data) => {
            if (err)
                return callback(err);
            if (data.rows && data.rows[0])
                return callback(null, Applet.appletObject(data.rows[0]));
            callback('applet not found');
        });
    },
    getAppletsFromUser: (userId, callback) => {
        const query = orm.generateSelectRequest(table, columns, condition(undefined, userId), joins);

        db.query(query, (err, data) => {
            if (err)
                return callback(err);
            callback(null, data.rows);
        });
    },
    update: (update, callback) => {
        const query = orm.generateUpdateRequest(table, update);

        db.query(query, (err, data) => {
            if (err)
                return callback(err);
            callback(null, data);
        });
    },
    destroy: (id, callback) => {
        const query = orm.generateDeleteRequest(table, id);

        db.query(query, (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        })
    },
    findEnabledByServiceAction: (service, callback) => {
        const query = orm.generateSelectRequest(table, columns, `applets.enabled=true AND a_s.name='${service}'`, joins);

        db.query(query, (err, data) => {
            if (err)
                return callback(err);
            callback(null, data.rows);
        });
    },
    findEnabledByActionName(name, callback) {
        const query = orm.generateSelectRequest(table, columns, `applets.enabled=true AND a.name='${name}'`, joins);

        db.query(query, (err, data) => {
            if (err)
                callback(err);
            callback(null, data.rows);
        });
    }
};

module.exports = Applet;
