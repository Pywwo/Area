const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./src/routes/routes');
const cors = require('cors');
const passport = require('./src/passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const xmlparser = require('express-xml-bodyparser');

require('./src/actions/time/index');
require('./src/actions/riot/index');

const server = express();

const rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
};

server.use(function(req, res, next) {
    let data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
    });
    next();
});

server.use(cors());
server.use(logger('dev'));
server.use(xmlparser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(bodyParser.json({ verify: rawBodySaver }));
server.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
server.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(session({
    name: 'sess',
    secret: 'WillyDenzey',
    resave: false,
    saveUninitialized: false,
    secure: false,
    cookie: { secure: false }
}));
server.use(passport.initialize());
server.use(passport.session());

(async function() {
    await ngrok.connect({
        proto: 'http',
        addr: parseInt(process.env.PORT),
        subdomain: 'area51',
        authtoken: process.env.NGROK_AUTH_TOKEN,
        onStatusChange: status => {console.log("ngrok tunnel state: " + status)},
        onLogEvent: data => {/*console.log(data)*/}
    }).catch(err => {
        console.log(err);
    });
})();

routes(server);

module.exports = server;
