const status = require('../htmlResponseCodes');
const Display = require('../models/display');

/*
    Object describing a controller, contains one or several functions each describing any route from the controller
 */
const displayController = {
    /*
        Function describing a route
    */
    getDisplays: (req, res) => {
        Display.findDisplaysByUser(req.userId).then( data =>
            res.status(status.NO_ERROR).json({message: 'OK', displays: data})
        ).catch( err =>
            res.status(status.ERROR).json({message: 'KO', error: err})
        )
    },
    deleteDisplay: (req, res) => {
        Display.findOne(req.userId, req.query.display_id)
            .then(display => {
                Display.destroy(display.id)
                    .then(data => res.status(status.NO_ERROR).json({message: 'OK'}))
                    .catch(err => res.status(status.ERROR).json({message: 'KO', error: err}));
            })
            .catch( err => res.status(status.ERROR).json({message: 'KO', error:  'Display not found'}));
    }
};

module.exports = displayController;
