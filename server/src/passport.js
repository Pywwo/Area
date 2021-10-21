const passport = require('passport');
const fbPassportStart = require('passport-facebook').Strategy;
const githubPassportStart = require('passport-github2').Strategy;
const DropboxPassportStart = require('passport-dropbox-oauth2').Strategy;

function stratCallback(accessToken, refreshToken, profile, cb)
{
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    return cb(null, profile);
}

passport.use(new fbPassportStart({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/facebook/login/callback'
}, stratCallback));

passport.use(new githubPassportStart({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://area51.ngrok.io/github/login/callback",
    scope: ['admin:repo_hook', 'read:repo_hook', 'repo']
}, stratCallback));

passport.use(new DropboxPassportStart({
    apiVersion: '2',
    clientID: process.env.DROPBOX_CLIENT_ID,
    clientSecret: process.env.DROPBOX_CLIENT_SECRET,
    callbackURL: "https://area51.ngrok.io/dropbox/login/callback"
}, stratCallback));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;
