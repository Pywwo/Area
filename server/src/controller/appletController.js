const status = require('../htmlResponseCodes');
const Applet = require('../models/applet');
const Action = require('../models/action');
const Service = require('../models/service');
const Reaction = require('../models/reaction');
const webHookController = require('./webhookController');
const aboutServices = require('../about').server.services;

/*
    Object describing a controller, contains one or several functions each describing any route from the controller
 */

const errorCreation= (res, applet, error) => {
    Applet.destroy(applet.id, (err) => {
        if (err)
            return res.status(status.ERROR).json({message: 'KO', error: err});
        res.status(status.ERROR).json({message: 'KO', error: error});
    })
};

const checkActionParams = (serviceName, actionName, params) => {
    const services = aboutServices.filter(s => s.name === serviceName);
    if (!services.length || !params)
        return false;
    const actions = services[0].actions.filter(a => a.name === actionName);
    if (!actions.length)
        return false;
    let check = true;
    actions[0].params.forEach(param => {
        if (params[param.name] === undefined)
            check = false;
    });
    return check;
};

const checkReactionParams = (serviceName, reactionName, params) => {
    const services = aboutServices.filter(s => s.name === serviceName);
    if (!services.length || !params)
        return false;
    const reactions = services[0].reactions.filter(a => a.name === reactionName);
    if (!reactions.length)
        return false;
    let check = true;
    reactions[0].params.forEach(param => {
        if (params[param.name] === undefined)
            check = false;
    });
    return check;
};

const serviceController = {
    addApplet: (req, res) => {
        const userId = req.userId;
        const {name, description, action_name, action_service, action_params, reaction_name, reaction_service, reaction_params} = req.body;
        Applet.create(userId, name, description, (err, applet) => {
            if (err) return res.status(status.ERROR).json({message: 'KO', error: err});

            Service.findOne(userId, undefined, action_service, (err, actionService) => {
                if (err) return errorCreation(res, applet,'service action not found');
                if (actionService.oauth && !actionService.token) return errorCreation(res, applet, `auth required for service ${actionService.name}`);
                if (!checkActionParams(actionService.name,action_name, action_params)) return errorCreation(res, applet, `error action creation`);
                Action.create(actionService.id, applet.id, action_name, action_params, (err, action) => {
                    if (err) return errorCreation(res, applet, err);

                    Service.findOne(userId, undefined, reaction_service, (err, reactionService) => {
                        if (err) return errorCreation(res, applet, 'service reaction not found');
                        if (!checkReactionParams(reactionService.name,reaction_name, reaction_params)) return errorCreation(res, applet, `error reaction creation`);
                        if (reactionService.oauth && !reactionService.token) return errorCreation(res, applet, `auth required for service ${reactionService.name}`);
                        Reaction.create(reactionService.id, applet.id, reaction_name, reaction_params, (err, reaction) => {
                            if (err) return errorCreation(res, applet, err);
                            const response = {
                                message: 'OK',
                                applet: {
                                    applet,
                                    action: action,
                                    reaction: reaction
                                }
                            };
                            webHookController.initWebhook(response.applet, (err) => {
                                if (err) return errorCreation(res, applet, err);
                                res.status(status.NO_ERROR).json(response);
                            });
                        })
                    })
                })
            })
        })
    },

    getApplets: (req, res) => {
        Applet.getAppletsFromUser(req.userId, (err, data) => {
          if (err)
              return res.status(status.ERROR).json({message: 'KO', error: err});
          res.status(status.NO_ERROR).json({message: 'OK', applets: data})
        });
    },

    enableApplet: (req, res) => {
        if (!req.body.applet_id)
            return res.status(status.ERROR).json({message: 'KO', error: 'applet_id required'});
        Applet.findByIdFromUser(req.userId, req.body.applet_id, (err, applet) => {
            if (err)
                return res.status(status.ERROR).json({message: 'KO', error: err});
            Applet.update({
                id: applet.id,
                enabled: !applet.enabled
            }, (err, applet) => {
                if (err)
                    return res.status(status.ERROR).json({message: 'KO', error: err});
                res.status(status.NO_ERROR).json({message: 'OK', applet: applet});
            })
        })
    },
    removeApplet: (req, res) => {
        const {applet_id} = req.query;

        if (!applet_id)
            return res.status(status.ERROR).json({message: 'KO', error: 'applet_id required'});
        Applet.findByIdFromUser(req.userId, applet_id, (err, applet) => {
            if (err)
                return res.status(status.ERROR).json({message: 'KO', error: err});
            webHookController.removeWebhook(applet);
            Applet.destroy(applet.id, (err) => {
                if (err)
                    return res.status(status.ERROR).json({message: 'KO', error: err});
                res.status(status.NO_ERROR).json({message: 'OK'});
            })
        }, true)
    },
    getAppletData(req, res) {
        const {applet_id} = req.query;
        if (!applet_id)
            return res.status(status.ERROR).json({message: 'KO', error: 'applet_id required'});
        Applet.findByIdFromUser(req.userId, applet_id, (err, applet) => {
            if (err)
                return res.status(status.ERROR).json({message: 'KO', error: err});
            res.status(status.NO_ERROR).json({message: 'OK', applet: applet});
        }, true);
    }
};

module.exports = serviceController;
