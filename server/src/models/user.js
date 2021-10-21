const orm = require("../orm");
const db = require("../database");
const table = 'users';

const dbQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data.rows);
        });
    });
};

const User = {
    all: () => {
        const query = orm.generateSelectRequest(table);

        return dbQuery(query);
    },
    create: (username, email, password, callback) => {
        const query = orm.generateInsertRequest(table,{
            username: username,
            password: password,
            email: email
        });
        db.query(query, (err, data) => {
            if (err)
                return callback(err);
            callback(null, data.rows);
        });
    },

    destroy: (id) => {
        const query = orm.generateDeleteRequest(table, id);

        return dbQuery(query);
    },

    update: (update) => {
        const query = orm.generateUpdateRequest(table, update);

        return dbQuery(query);
    },

    findByUsernameOrEmail: (username) => {
        const query = orm.generateSelectRequest(table, undefined,
            'username=\'' + username + '\' OR email=\'' + username +'\'');
        return new Promise((resolve, reject) => {
            db.query(query, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data.rows[0])
                    resolve(data.rows[0]);
                else
                    reject({message: 'Invalid user'})
            });
        });
    }
};

module.exports = User;
