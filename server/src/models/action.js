const orm = require("../orm");
const db = require("../database");
const Promise = require('promise');
const {services} = require('../about').server;

const table = 'actions';
const columns = ['actions.id', 'actions.name action_name', 'services.name service_name', 'actions.params'];
const joins = {
    'services': 'actions.service_id=services.id',
    'users': 'users.id=services.user_id'
};
const condition = (userId) => {return 'users.id=' + userId;};

const actionQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data.rows);
        });
    });
};

const isWebhook = (actionName) => {
    let webhook = false;
    services.forEach(service => {
        return service.actions.forEach(action => {
            if (action.name === actionName)
                webhook = action.webhook;
        });
    });
    return webhook;
};

const Action = {
    create: (serviceId, appletId, name, params, callback) => {
        const query = orm.generateInsertRequest(table,{
            service_id: serviceId,
            applet_id: appletId,
            name: name,
            params: JSON.stringify(params),
            polling: !isWebhook(name)
        });
        db.query(query, (err, data) => {
            if (err)
                return callback(err);
            callback(null, data.rows[0]);
        });
    },
    findActionsByUser: (userId, serviceEnable) => {
        const enable = (serviceEnable && serviceEnable === false) ? '' : 'AND services.enable=true';
        const query = orm.generateSelectRequest(table, columns, condition(userId) + enable, joins);
        return actionQuery(query);
    },

    findOne : (userId, id) => {
        const query = orm.generateSelectRequest(table, columns, condition(userId) + ' AND actions.id='+ id, joins);

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

        return actionQuery(deleteRequest);
    },
    update: (update, callback) => {
        const query = orm.generateUpdateRequest(table, update);

        db.query(query, (err) => {
            if (err) return callback(err);
            callback(null);
        });
    }
};

module.exports = Action;
