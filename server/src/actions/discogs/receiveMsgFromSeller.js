const Action = require('../../models/action');
const request = require('request');

const name = "new_message_from_discogs_user";

const checkReceiveMsgFromSeller = (action, callback) => {
    /*console.log(action.service.token)
    console.log(action.service.refresh_token)
    request.get({
    headers: {
        "User-Agent": "FooBarApp/3.0",
        "Authorization": "oauth_token=UWsiBzkXMvEUTjiJaNwcxGWwSaKOuhixIgCciOLT,\
            oauth_token_secret=ZPWXkWtDVTAMbatdNkKBfzKORIowvNLTMxUuMqVp,\
            OAuth oauth_consumer_key=AllvklwDOQaspWjUHesM,\
            oauth_signature=KevEvBZmagvjqGmzontuEhSkJvnuYjDV&,\
            oauth_signature_method=PLAINTEXT,\
            oauth_verifier=users_verifier,\
            oauth_version=2.0,",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    params: {signatures: {oauth_token:action.service.token,
        oauth_token_secret: action.service.refresh_token,}},
    url: "https://api.discogs.com/oauth/identity"
    }, function (err, response, body) {
        console.log(response.statusCode)
        console.log(body)
    })*/
    callback(false)
}

const initPollData = (action) =>  {
    Action.update({
        id: action.id,
        poll_data: JSON.stringify({last_message: ""})
    }, (err) => {if (err) console.log(err)})
};

const trigger = (action, callback) => {
    if (!action.poll_data) {
        initPollData(action);
        callback(false);
    } else
        checkReceiveMsgFromSeller(action, (should, outputs) => {
            if (!should)
                callback(false);
            else
                callback(true, outputs);
    })
};

module.exports = {
    trigger,
    name,
};