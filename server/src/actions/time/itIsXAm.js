const Action = require('../../models/action');
const moment = require('moment');

const name = "it_is_X_am";

const checkItIsXAm = (date, action) => {
    let {day, triggered} = action.poll_data;

    if (day !== date.format('dddd')) {
        initPollData(action.id, false);
        triggered = false;
    }
    return !triggered && (date.format("H") === `${action.params.hour - 1}` && date.format("m") === `${action.params.min}`);
};

const initPollData = (action_id, trigger) =>  {
    Action.update({
        id: action_id,
        poll_data: JSON.stringify({triggered: trigger, day: moment().format("dddd")})
    }, (err) => {if (err) console.log(err)})
};

const trigger = (action, callback) => {
    const date = moment();
    if (!action.poll_data) {
        initPollData(action.id, false);
        callback(false);
    } else if (checkItIsXAm(date, action)) {
        initPollData(action.id, true);
        callback(true, {
            day: date.format("dddd"),
            hour: action.params.hour,
            min: action.params.min
        });
    } else
        callback(false)
};

module.exports = {
    trigger,
    name,
};

