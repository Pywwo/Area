const status = require('../htmlResponseCodes');
const jwt = require('jsonwebtoken');
const accessTokenHandler = require("../jwtAccesTokens");
const User = require('../models/user');
const Service = require('../models/service');
const infoServices  = require ('../about').server.services;
const bcrypt = require('bcrypt');

function initServices(username)
{
    User.findByUsernameOrEmail(username)
        .then(user => {
            infoServices.forEach( service => {
            Service.create(user.id, service.name, service.oauth);
            })
        })
        .catch(err => console.log(err));
}

/*
 * Generates an access token from the user's id and sends it to the client
 */
function sendaccessToken(res, data)
{
    let response = {message: "OK"};

    response.accessToken = jwt.sign({id: data.id}, accessTokenHandler.privateKey, {
        expiresIn: 86400
    });
    res.status(status.NO_ERROR).json(response);
}

/*
 * Function to register with the datas collected in the post request
 * also checking if email or username exists
 */
function registerInDatabase(req, res) {
    let response = {message: "KO"};
    const regexUsername = new RegExp("^[a-zA-Z0-9_]*$");
    const regexEmail = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

    if (regexUsername.test(req.body.username) === false){
        /* username has incompatible characters */
        response.error = status.INVALID_USER + ": Invalid user";
        res.status(status.INVALID_USER).json(response);
        return;
    }
    if (regexEmail.test(req.body.email) === false) {
        /* email is not an email */
        response.error = status.INVALID_EMAIL + ": Invalid email";
        res.status(status.INVALID_EMAIL).json(response);
        return;
    }
    bcrypt.hash(req.body.username, parseInt(process.env.BCRYPT_SALT_ROUNDS)).then(function(hashedPassword) {
        User.create(req.body.username, req.body.email, hashedPassword, (err) => {
            if (err) {
                let tmp = err.detail.split('=');
                let error = tmp[0].substring(
                    tmp[0].lastIndexOf("(") + 1,
                    tmp[0].lastIndexOf(")")
                );
                if (error === "username") {
                    response.error = status.INVALID_USER + ': username already exists';
                    return res.status(status.INVALID_USER).json(response);
                } else if (error === 'email') {
                    response.error = status.INVALID_EMAIL + ': email already exists';
                    return res.status(status.INVALID_EMAIL).json(response);
                }
                response.error = status.ERROR + ": Error occurred in database";
                return res.status(status.ERROR).json(response);
            }
            initServices(req.body.username);
            /* send response that user is registered */
            response.message = "OK";
            res.status(status.NO_ERROR).json(response);
        });
    }).catch(err => {
        console.log(err);
        res.status(status.ERROR).json({message: "KO"});
    });
}

/*
 *  Object describing the user controller, contains one or several functions each describing any route from the user controller
 */
const userController = {
    /*
     *  Function routing get all users
     */
    //TODO Remove it
    getUsers: (req, res) => {
        User.all().then( data =>
            res.status(status.NO_ERROR).json(data)
        ).catch( err =>
            res.status(status.ERROR).json(err)
        )
    },
    /*
     *  Function routing login
     */
    login: (req, res) => {
        User.findByUsernameOrEmail(req.body.username)
            .then(data => {
                bcrypt.compare(req.body.password, data.password).then(function(result) {
                    if (!result) {
                        let response = {message: "KO"};
                        response.error = status.INVALID_PASSWORD + ": Invalid password";
                        return res.status(status.INVALID_PASSWORD).json(response);
                    }
                    sendaccessToken(res, data);
                }).catch(err => {
                    console.log(err);
                    return res.status(status.ERROR).json({message: "KO"});
                });
            })
            .catch(err => {
                let response = {message: "KO"};
                response.error = status.INVALID_USER + ": Invalid user";
                res.status(status.INVALID_USER).json(response);
            });
    },

    /*
     * Function routing register
     */
    register: (req, res) => {
        let response = {message: "KO"};

        if (req.body.username === undefined ) {
            response.error = status.INVALID_USER + ': Invalid user';
            res.status(status.INVALID_USER).json(response);
        } else if (req.body.email === undefined) {
            response.error = status.INVALID_EMAIL + ': Invalid email';
            res.status(status.INVALID_EMAIL).json(response);
        } else if (req.body.password === undefined) {
            response.error = status.INVALID_PASSWORD + ': Invalid password';
            res.status(status.INVALID_PASSWORD).json(response);
        } else {
            /* calling function to check if user exists, otherwise create user and send register response*/
            registerInDatabase(req, res);
        }
    }
};

module.exports = userController;
