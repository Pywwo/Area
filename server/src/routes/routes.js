/* Import whatever controller you need */
const userController = require('../controller/UserController');
const exampleController = require('../controller/exampleController');
const accessTokenHandler = require("../jwtAccesTokens");
const serviceController = require('../controller/serviceController');
const displayController = require('../controller/displayController');
const authController = require('../controller/authController');
const webhookController = require('../controller/webhookController');
const passport = require('passport');
const aboutController = require('../controller/aboutController');
const appletController = require('../controller/appletController');
const status = require('../htmlResponseCodes');

//const bodyParser = require('body-parser');

module.exports = (app) => {
    /*
        Adding and GET '/example' route with an access token verification
        @param1 the name of the route
        @param2 the access token verification function
        @param3 the function from the controller to be executed when the route is accessed

        If you do not want any access token verification,
        simply remove the verification function from the route declaration
     */
    app.get('/example', accessTokenHandler.verifyToken, exampleController.exampleQuery);

    /*
     * get the about.json who contains information of the area
     * POST     http://localhost:8080/about.json
     */
    app.get('/about.json', aboutController.about);

    /*
     * get the information of the actions
     * POST     http://localhost:8080/about/actions
     * @access_token                in header required
     */
    app.get('/about/actions', accessTokenHandler.verifyToken, aboutController.getActionsInformation);

    /*
     * get the information of the reactions
     * POST     http://localhost:8080/about/reactions
     * @access_token                in header required
     */
    app.get('/about/reactions', accessTokenHandler.verifyToken, aboutController.getReactionsInformation);

    /*
     * login on the area
     * POST     http://localhost:8080/user/login
     * @username or @email          identifier to register
     * @password                    password to register
     */
    app.post('/user/login', userController.login);

    /*
     * register on the area
     * POST     http://localhost:8080/user/register
     * @username                    username of the user
     * @email                       email of the user
     * @password                    password of the user
     */
    app.post('/user/register', userController.register);

    /*
     * get all users information from the area
     * GET      http://localhost:8080/users
     */
    app.get('/users', userController.getUsers);
    app.get('/connected', accessTokenHandler.verifyToken, (req, res) => {
        res.status(status.NO_ERROR).json({message: "OK"});
    });

    app.get('/facebook/login', authController.passportPersistUser, passport.authenticate('facebook'));
    app.get('/facebook/login/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), authController.facebookAuthCallback);

    app.get('/github/login', authController.passportPersistUser, passport.authenticate('github'));
    app.get('/github/login/callback', passport.authenticate('github', { failureRedirect: '/login' }), authController.githubAuthCallback);

    app.get('/dropbox/login', authController.passportPersistUser, passport.authenticate('dropbox-oauth2'));
    app.get('/dropbox/login/callback', passport.authenticate('dropbox-oauth2', { failureRedirect: '/login' }), authController.dropboxAuthCallback);

    app.get('/discogs/login', authController.passportPersistUser, authController.discogsLogin);
    app.get('/discogs/login/callback', authController.discogsAuthCallback);

    app.get('/youtube/login', authController.passportPersistUser, authController.youtubeAuth);
    app.get('/youtube/login/callback', authController.youtubeAuthCallback);

    app.post('/github/webhook/receive', webhookController.verifyGithubWebhook, webhookController.githubWebhookReceive);

    app.get('/dropbox/webhook/receive', webhookController.confirmDropboxWebhook);
    app.post('/dropbox/webhook/receive', webhookController.verifyDropboxWebhook, webhookController.dropboxWebhookReceive);

    // app.post('/youtube/webhook', webhookController.createYoutubeHook);
    app.get('/youtube/webhook/receive/:hook_id', webhookController.youtubeWebhookReceiveValidate);
    app.post('/youtube/webhook/receive/:hook_id', webhookController.youtubeWebhookReceive);

    app.get('/outlook/login', authController.passportPersistUser, authController.outlookLogin);
    app.get('/outlook/login/callback', authController.outlookLoginCallback);
    app.post('/outlook/webhook/receive', webhookController.outlookWebhookReceive);
    /*
     * get all services information from the user
     * GET      http://localhost:8080/services
     * @access_token                in header required
     */
    app.get('/services', accessTokenHandler.verifyToken, serviceController.getServices);

    /*
     * get all displays of the user
     * GET      http://localhost:8080/displays
     * @access_token                in header required
     */
    app.get('/displays', accessTokenHandler.verifyToken, displayController.getDisplays);

    /*
     * delete a display of the user
     * DELETE   http://localhost:8080/display
     * @access_token                in header required
     * @display_id                  to identify the display to delete
     */
    app.delete('/display', accessTokenHandler.verifyToken, displayController.deleteDisplay);

    /*
     * create an applet which is a association of an action and a reaction from an user
     * POST     http://localhost:8080/applet
     * @access_token                in header required
     * @name                        name of the applet, not required
     * @description                 description of the applet, not required
     * @action_service              service of the action associate
     * @action_name                 name of the action
     * @action_params               parameters of the action
     * @reaction_service            service of the reaction associate
     * @reaction_name               name of the reaction
     * @reaction_params             parameters of the reaction
     *
     * return the applet created if success
     */
    app.post('/applet', accessTokenHandler.verifyToken, appletController.addApplet);

    /*
     * get all applets from user
     * GET      http://localhost:8080/applets
     * @access_token                in header required
     */
    app.get('/applets', accessTokenHandler.verifyToken, appletController.getApplets);

    /*
     * enable or disable an applet
     * PUT      http://localhost:8080/applet/enable
     * @access_token                in header required
     * @applet_id                   id of the applet to enable or disable
     */
    app.put('/applet/enable', accessTokenHandler.verifyToken, appletController.enableApplet);
    
        /*
     * update service tokens
     * PUT      http://localhost:8080/service/tokens
     * @access_token                in header required
     * @service_id or service_name  required to identify the service
     */
    app.put('/service/tokens', accessTokenHandler.verifyToken, serviceController.unsubscribe);

    /*
     * get all services
     * GET      http://localhost:8080/service/all
     */
    app.get('/service/all', serviceController.getAllServices);


    /*
     * remove an applet
     * DELETE   http://localhost:8080/reaction
     * @access_token                in header required
     * @applet_id                   id of the applet to remove
     */
    app.delete('/applet', accessTokenHandler.verifyToken, appletController.removeApplet);

    /*
     * get all infos of an applet
     * GET   http://localhost:8080/reaction
     * @access_token                in header required
     * @applet_id                   id of the applet to remove
     */
    app.get('/applet', accessTokenHandler.verifyToken, appletController.getAppletData);

    app.use((req, res) => {
        res.status(404).json({url: req.originalUrl, error: '404: not found'});
    });
};
