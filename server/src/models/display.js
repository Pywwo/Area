const orm = require("../orm");
const db = require("../database");
const Promise = require('promise');

const table = 'displays';
const columns = ['displays.id', 'displays.user_id', 'displays.title', 'displays.color', 'displays.content', 'displays.service', 'displays.created_at'];
const joins = {
    'users': 'users.id=displays.user_id'
};

const condition = (userId) => {return 'users.id=' + userId;};

const displayQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data.rows);
        });
    });
};

const Display = {
    create: (userId, color, title, content, service, callback) => {
        const query = orm.generateInsertRequest(table,{
            user_id: userId,
            color: color,
            title: title,
            content: content,
            service: service
        });
        db.query(query, (err, data) => {
            if (err) return callback(err);
            callback(null, data.rows[0]);
        });
    },
    findDisplaysByUser: (userId) => {
        const query = orm.generateSelectRequest(table, columns, condition(userId), joins);
        return displayQuery(query);
    },

    findOne : (userId, id) => {
        const query = orm.generateSelectRequest(table, columns, condition(userId) + ' AND displays.id='+ id, joins);

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

        return displayQuery(deleteRequest);
    }
};

module.exports = Display;
