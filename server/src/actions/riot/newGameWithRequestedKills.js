const Action = require('../../models/action');
const request = require('request');


const name = "new_game_with_requested_kills";

const checkNewGameWithRequestedKills = (action, callback) => {
    let apiKey = process.env.RIOT_API_KEY;
    let sumId = "0";
    request.get({
    headers: {
        "X-Riot-Token": apiKey,
    },
    url: "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + action.params.summoner_name
    }, function (err, response, body) {
        if (err || response.statusCode != 200) {
            return callback(false);
        }
        sumId = JSON.parse(body).accountId;
        let url = "https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + sumId + "?endIndex=1&beginIndex=0";
        request.get({
        headers: {
        "X-Riot-Token": apiKey,
        },
        url: url
        }, function (err, response, body) {
            if (err || response.statusCode !== 200) {
                return callback(false);
            }
            let history = JSON.parse(body);
            if (history["matches"][0] && typeof history["matches"][0] !== 'undefined' && history["matches"][0].timestamp <= action.poll_data.timeStamp) {
                return callback(false);
            }
            Action.update({
                id: action.id,
                poll_data: JSON.stringify({timeStamp: history["matches"][0].timestamp})
            }, (err) => {if (err) console.log(err)})
            let gameId = history["matches"][0].gameId;
            request.get({
                headers: {
                  "X-Riot-Token": apiKey,
                },
                url: "https://euw1.api.riotgames.com/lol/match/v4/matches/" + gameId
              }, function (err, response, body) {
                if (err) {
                  return callback(false);
                }
                let responseParsed = JSON.parse(body).participantIdentities;
                let playerId = 0;
                if (!responseParsed)
                    return callback(false);
                responseParsed.forEach(item => {
                  if (item.player.summonerName === action.params.summoner_name)
                    playerId = item.participantId;
                });
                let pl = JSON.parse(body).participants;
                pl.forEach(item => {
                    if (item.participantId === playerId) {
                        if (item.stats.kills >= action.params.kills) {
                            const outputs = {
                                kills_asked : action.params.kills,
                                win_loss : item.stats.win ? "win" : "loss",
                                kills: item.stats.kills,
                                deaths: item.stats.deaths,
                                assists: item.stats.deaths
                            };
                            callback(true, outputs)
                        }
                  }
                });
                callback(false)
            });
        });
    });
};

const initPollData = (action) =>  {
    Action.update({
        id: action.id,
        poll_data: JSON.stringify({timeStamp: 0})
    }, (err) => {if (err) console.log(err)})
};

const trigger = (action, callback) => {
    if (!action.poll_data) {
        initPollData(action);
        return callback(false);
    }
    checkNewGameWithRequestedKills(action, (should, outputs) => {
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
