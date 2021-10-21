const { Client } = require('pg');

const db = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
});

db.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
        process.exit(1);
    }
    console.log('connected');
});

module.exports = db;
