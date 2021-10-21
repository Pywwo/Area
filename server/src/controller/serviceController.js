const status = require('../htmlResponseCodes');
const Service = require('../models/service');
const infoService = require('../about').server.services;

/*
    Object describing a controller, contains one or several functions each describing any route from the controller
 */

const columns = ["name", "oauth", "token"];

const errorResponse = (res, error) => {res.status(status.ERROR).json({message: "KO", data: error})};

const getService = (name) => {
    for (let i = 0; i < infoService.length; i++) {
        if (name === infoService[i].name)
            return infoService[i];
    }
    return undefined;
};

const serviceController = {
    getServices: (req, res) => {
        Service.findServicesByUser(req.userId, columns).then( services => {
            services.forEach( service => {
                const info = getService(service.name);
                service.oauthed = !!(!service.oauth || (service.token !== undefined && service.token));
                delete service.token;
                service.logo = info.logo;
                service.description = info.description;
                service.color = info.color;
                service.link_oauth = info.link_oauth;
            });
            res.status(status.NO_ERROR).json({message: 'OK', services: services})
        }).catch( err =>
            errorResponse(res, err)
        )
    },
    getAllServices: (req, res) => {
        Service.all().then( data =>
            res.status(status.NO_ERROR).json({message: 'OK', services: data})
        ).catch( err =>
            errorResponse(res, err)
        )
    },

    unsubscribe: (req, res) => {
        Service.findOne(req.userId, req.body.service_id, req.body.service_name, (err, service) => {
            if (err)
                return errorResponse(res, err);
            Service.update({
                id: service.id,
                token: "",
                refresh_token: ""
            }, (err, service) => {
                if (err)
                    return errorResponse(res, err);
                res.status(status.NO_ERROR).json({message: 'OK', service: service});
            });
        });
    }
};

module.exports = serviceController;
