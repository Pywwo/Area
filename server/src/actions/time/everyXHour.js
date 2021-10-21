const Action = require('../../models/action');

const name = "every_X_hour";

const checkEveryXTime = (action) => {
    const now = Date.now();
    let timeDiff = now - action.poll_data.time;
    timeDiff /= 1000;
    const seconds = Math.round(timeDiff);
    const min = (seconds - (seconds % 60)) / 60;
    const hours =  (min - (min % 60)) / 60;
    return hours >= action.params.hour && min >= action.params.min;
};

const initPollData = (action) =>  {
    Action.update({
        id: action.id,
        poll_data: JSON.stringify({time: Date.now()})
    }, (err) => {if (err) console.log(err)})
};

const trigger = (action, callback) => {
    if (!action.poll_data) {
        initPollData(action);
        callback(false);
    } else if (checkEveryXTime(action)) {
        initPollData(action);
        callback(true, {hour: action.params.hour, min: action.params.min});
    } else
        callback(false)
};

module.exports = {
    trigger,
    name,
};
