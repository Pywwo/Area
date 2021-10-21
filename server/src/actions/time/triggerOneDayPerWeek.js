const Action = require('../../models/action');
const moment = require('moment');

const name = "one_day_per_week";

const initPollData = (action_id, trigger) =>  {
    Action.update({
        id: action_id,
        poll_data: JSON.stringify({triggered: trigger, week: moment().format('W')})
    }, (err) => {if (err) console.log(err)})
};

const checkTrigger = (date, action) => {
    let {week, triggered} = action.poll_data;
    const {day, hour, min} = action.params;

    if (week !== date.format('W')) {
        initPollData(action.id, false);
        triggered = false;
    }
    return !triggered && date.format('dddd') === `${day}` && date.format("H") === `${hour - 1}` && date.format("m") === `${min}`;
};

const trigger = (action, callback) => {
    const date = moment();
    if (!action.poll_data) {
        initPollData(action.id, false);
        callback(false);
    } else if (checkTrigger(date, action)) {
        initPollData(action.id, true);
        callback(true, {
            week: date.format('W'),
            day: action.params.day,
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

