const orm = require("../orm");
const db = require("../database");
const table = 'services';
const Promise = require('promise');

const serviceQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data.rows);
        });
    });
};

const Service = {
    // dev
    all: () => {
        const query = orm.generateSelectRequest(table);

        return serviceQuery(query);
    },

    create: (userId, name, oauth) => {
        const query = orm.generateInsertRequest(table,{
            user_id: userId,
            name: name,
            oauth: oauth ? oauth : false
        });
        return serviceQuery(query);
    },

    findServicesByUser: (userId, columns) => {
        const query = columns ? orm.generateSelectRequest(table, columns, 'user_id=' + userId, undefined, 'name') :
            orm.generateSelectRequest(table, undefined, 'user_id=' + userId, undefined, 'name');
        return serviceQuery(query);
    },
    findOne: (userId, id, name, callback) => {
        const param = id ?
            {key: 'id', value: id} :
            {key: 'name', value: name};
        const query = orm.generateSelectRequest(table, undefined, 'user_id=' + userId + ' AND ' + param.key + '=\'' + param.value + '\'');

        db.query(query, (err, data) => {
           if (err)
               return callback(err);
           else if (data.rows && data.rows[0])
               return callback(null, data.rows[0]);
           callback({error: 'service not found'});
        });
    },
    destroy: (id) => {
        const query = orm.generateDeleteRequest(table, id);

        return serviceQuery(query);
    },

    update: (update, callback) => {
        const query = orm.generateUpdateRequest(table, update);

        db.query(query, (err, data) => {
            if (err) return callback(err);
            callback(null, data.rows[0]);
        });
    }
};

module.exports = Service;
