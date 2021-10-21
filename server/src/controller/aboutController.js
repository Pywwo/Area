const servicesInfo = require('../about').server.services;
const status = require('../htmlResponseCodes');
const Service = require('../models/service');

const actionsData = () => {
    let actions = [];
    servicesInfo.forEach(service => {
        service.actions.forEach(action => {
            action.service = service.name;
            actions.push(action);
        })
    });
    return actions;
};

const reactionsData = () => {
    let reactions = [];
    servicesInfo.forEach(service => {
        service.reactions.forEach(reaction => {
            reaction.service = service.name;
            reactions.push(reaction);
        })
    });
    return reactions;
};

const filter = (data, userId, callback) => {
    let dataFiltered = [];
    Service.findServicesByUser(userId).then( services => {
        services.forEach( service => {
            service.oauthed = !!(!service.oauth || service.token);
            const filtered = data.filter(a => (a.service === service.name) && service.oauthed);
            dataFiltered = [...dataFiltered, ...filtered];
        });
        callback(null, dataFiltered);
    }).catch( err =>
        callback(err)
    );
};

const aboutController = {
    /*
     *  Function routing about json file
     */
    about: (req, res) => {
        let file = require('../about.json');
        /* filling ip */
        file.client.host = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        /* filling date */
        file.server.current_time = Date.now();
        res.status(status.NO_ERROR).json(file);
    },
    getActionsInformation: (req, res) => {
        const actions = actionsData();

        filter(actions, req.userId, (err, actions) => {
            if (err) return res.status(status.ERROR).json({message: "KO", data: err});
            res.status(status.NO_ERROR).json({message: 'OK', actions: actions});
        })
    },
    getReactionsInformation: (req, res) => {
        const reactions = reactionsData();

        filter(reactions, req.userId, (err, reactions) => {
            if (err) return res.status(status.ERROR).json({message: "KO", data: err});
            res.status(status.NO_ERROR).json({message: 'OK', reactions: reactions});
        })
    }
};

module.exports = aboutController;
