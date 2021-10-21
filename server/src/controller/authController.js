const status = require('../htmlResponseCodes');
const Discogs = require("disconnect").Client;
const Service = require('../models/service');
const url = require('url');
const {privateKey} = require('../jwtAccesTokens');
const {jwt} = require('../jwtAccesTokens');
const axios = require('axios');
const qs = require('querystring');
const {google} = require('googleapis');

let userPersist = {};
const redirectURLAfterOauth = "http://localhost:8081/home/services";

const OUTLOOK_SCOPES = [
    "https://graph.microsoft.com/.default",
    "offline_access"
];

const outlookData = {
    scopes: OUTLOOK_SCOPES.join(' '),
    clientId: process.env.OUTLOOK_CLIENT_ID,
    responseType: "code",
    client_secret: process.env.OUTLOOK_CLIENT_SECRET,
    grant_type: "authorization_code"
};

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://area51.ngrok.io/youtube/login/callback"
);

const scopes = [
    'https://www.googleapis.com/auth/youtube'
];

function getUserIdFromAccessToken(token) {
    if (!token)
        return null;
    let userId = null;
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            console.log(err);
            return null;
        }
        userId = decoded.id;
    });
    return userId;
}

const setAccessToken = (userId, service, token, refreshToken, cb) => {
    Service.findOne(userId, undefined, service, (err, service) => {
        if (err)
            return cb(err);
        Service.update({
            id: service.id,
            token: token,
            refresh_token: refreshToken
        }, (err, service) => {
            if (err)
                return cb(err);
            cb(null, service);
        });
    });
};

const authController = {
    passportPersistUser: (req, res, next) => {
        if (!req.query.service || !req.query.accessToken)
            return res.status(status.ERROR).json({message: "KO"});
        userPersist = {
            service: req.query.service,
            accessToken: req.query.accessToken
        };
        next();
    },

    facebookAuthCallback: (req, res) => {
        if (userPersist.service !== "facebook")
            return res.status(status.ERROR).json({message: "KO"});
        setAccessToken(getUserIdFromAccessToken(userPersist.accessToken), userPersist.service, req.user.accessToken, req.user.refreshToken, (err, data) => {
            res.redirect(url.format({
                pathname: redirectURLAfterOauth,
                query: {"message": (err) ? 'KO' : 'OK'}
            }));
        });
    },

    githubAuthCallback: (req, res) => {
        if (userPersist.service !== "github")
            return res.status(status.ERROR).json({message: "KO"});
        setAccessToken(getUserIdFromAccessToken(userPersist.accessToken), userPersist.service, req.user.accessToken, req.user.refreshToken, (err, data) => {
            res.redirect(url.format({
                pathname: redirectURLAfterOauth,
                query: {"message": (err) ? 'KO' : 'OK'}
            }));
        });
    },

    dropboxAuthCallback: (req, res) => {
        if (userPersist.service !== "dropbox")
            return res.status(status.ERROR).json({message: "KO"});
        setAccessToken(getUserIdFromAccessToken(userPersist.accessToken), userPersist.service, req.user.accessToken, req.user.refreshToken, (err, data) => {
            res.redirect(url.format({
                pathname: redirectURLAfterOauth,
                query: {"message": (err) ? 'KO' : 'OK'}
            }));
        });
    },

    youtubeAuth: (req, res) => {
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
        res.redirect(url);
    },

    youtubeAuthCallback: async (req, res) => {
        if (userPersist.service !== "youtube")
            return res.status(status.ERROR).json({message: "KO"});
        const {tokens} = await oauth2Client.getToken(req.query.code);
        oauth2Client.setCredentials(tokens);
        setAccessToken(getUserIdFromAccessToken(userPersist.accessToken), userPersist.service, tokens.access_token, tokens.refresh_token, (err, data) => {
            res.redirect(url.format({
                pathname: redirectURLAfterOauth,
                query: {"message": (err) ? 'KO' : 'OK'}
            }));
        });
    },

    /*
     * Function used by GET /discogs/login, used to verify an user on discogs.
     * Redirects the user to https://www.discogs.com/oauth/authorize so the user can authorize the application
     */
    discogsLogin: (req, res) => {
        const oAuth = new Discogs().oauth();
        oAuth.getRequestToken(
            process.env.DISCOGS_CLIENT_ID,
            process.env.DISCOGS_CLIENT_SECRET,
            'https://area51.ngrok.io/discogs/login/callback',
            function(err, requestData){
                userPersist.data = requestData;
                res.redirect(requestData.authorizeUrl);
            }
        );
    },

    /*
     * Function used by GET /discogs/login/callback, Oauth2 callback for Discogs authentification
     */
    discogsAuthCallback: (req, res) => {
        const oAuth = new Discogs(userPersist.data).oauth();
        const userId = getUserIdFromAccessToken(userPersist.accessToken);
        oAuth.getAccessToken(
            req.query.oauth_verifier,
            function(err, accessData) {
                setAccessToken(userId, 'discogs', accessData.token, accessData.tokenSecret, (err, data) => {
                    res.redirect(url.format({
                        pathname: redirectURLAfterOauth,
                        query: {"message": (err) ? 'KO' : 'OK'}
                    }));
                });
            }
        );
    },

    outlookLogin: (req, res) => {
        const redirectUri = "https%3A%2F%2Farea51.ngrok.io%2Foutlook%2Flogin%2Fcallback";
        res.redirect(`https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=${outlookData.clientId}&redirect_uri=${redirectUri}&response_type=${outlookData.responseType}&scope=${outlookData.scopes}`);
    },

    outlookLoginCallback: (req, res) => {
        const data = {
            client_id: outlookData.clientId,
            scope: outlookData.scopes,
            redirect_uri: "https://area51.ngrok.io/outlook/login/callback",
            grant_type: outlookData.grant_type,
            client_secret: outlookData.client_secret,
        };
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        if (req.query.code) {
            const urlOutlook = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
            data.code = req.query.code;
            axios.post(urlOutlook, qs.stringify(data), config).then((result) => {
                if (userPersist.service !== "outlook")
                    return res.status(status.ERROR).json({message: "KO"});
                const {access_token, refresh_token} = result.data;
                setAccessToken(getUserIdFromAccessToken(userPersist.accessToken), userPersist.service, access_token, refresh_token, (err) => {
                    res.redirect(url.format({
                        pathname: redirectURLAfterOauth,
                        query: {"message": (err) ? 'KO' : 'OK'}
                    }));
                });
            }).catch((error) => {
                console.error(error);
                res.status(status.ERROR).json(error);
            });
        } else {
            res.status(status.ERROR).json("error");
        }
    }
};

module.exports = authController;
