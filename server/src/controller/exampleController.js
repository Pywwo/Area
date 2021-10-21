const status = require('../htmlResponseCodes');

/*
    Object describing a controller, contains one or several functions each describing any route from the controller
 */
const exempleController = {
    /*
        Function describing a route
    */
    exampleQuery: (req, res) => {
        let statusToSend = 0;
        let response = {message: "KO"};
        /* req parameter = what the client send */

        /* check parameters
        ex: if register route, check username, email, password, birthday
        then answer by the error code or good code by the status array */

        /* set status with the status to send */
        statusToSend = status['NoError'];
        /* if no errors so far, set message by OK if request worked / no error */
        response.message = "OK";
        /* if no error so far, set other datas */
        /* here */

        /* if error, add this block of code */
        response.error = statusToSend + ": " + status[statusToSend];
        res.status(statusToSend).json(response);
    }
};

module.exports = exempleController;