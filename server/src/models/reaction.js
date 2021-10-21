const orm = require("../orm");
const db = require("../database");
const Promise = require('promise');

const table = 'reactions';
const columns = ['reactions.id', 'actions.id action_id', 'actions.name action_name','reactions.name reaction_name', 'services.name service_name', 'reactions.params'];
const joins = {
    'actions': 'actions.id=reactions.action_id',
    'services': 'actions.service_id=services.id',
    'users': 'users.id=services.user_id'
};

const condition = (userId) => {return 'users.id=' + userId;};

const reactionQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data.rows);
        });
    });
};

const Reaction = {
    create: (serviceId, appletId, name, params, callback) => {
        const query = orm.generateInsertRequest(table,{
            service_id: serviceId,
            applet_id: appletId,
            name: name,
            params: JSON.stringify(params)
        });
        db.query(query, (err, data) => {
            if (err) return callback(err);
            callback(null, data.rows[0]);
        })
    },

    findReactionsByUser: (userId, serviceEnable) => {
        const enable = (serviceEnable && serviceEnable === false) ?  '': 'AND services.enable=true';
        const query = orm.generateSelectRequest(table, columns, condition(userId) + enable, joins);
        return reactionQuery(query);
    },

    findOne : (userId, id) => {
        const query = orm.generateSelectRequest(table, columns, condition(userId) + ' AND reactions.id='+ id, joins);

        return new Promise((resolve, reject) => {
            db.query(query, (err, data) => {
                if (data && data.rows && data.rows[0])
                    resolve(data.rows[0]);
                else
                    reject(err);
            });
        });
    },

    destroy: (id) => {
        const deleteRequest = orm.generateDeleteRequest(table, id);

        return reactionQuery(deleteRequest);
    },

    update: (update) => {
        const query = orm.generateUpdateRequest(table, update);

        return reactionQuery(query);
    }
};

module.exports = Reaction;
