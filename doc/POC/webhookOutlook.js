const request = require('request');
const cryptoRandomString = require('crypto-random-string');
const moment = require('moment');

let now = moment();

console.log(`Now: ${now.format('ll')}`);
console.log(now);

now.add('4230', 'minutes');
console.log(now);
const token ="eyJ0eXAiOiJKV1QiLCJub25jZSI6IllWem1aaVpwNld0Rng3Z0Z5bDNkb3pZWU43S1dMcUVhMDFTR0dZNlpSNTQiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85MDFjYjRjYS1iODYyLTQwMjktOTMwNi1lNWNkMGY2ZDlmODYvIiwiaWF0IjoxNTgzMDg2ODM5LCJuYmYiOjE1ODMwODY4MzksImV4cCI6MTU4MzA5MDczOSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IjQyTmdZRERTU3RTSjAyM1ovTHBjYU8zdFBMV2dhMXRjUTNzK1RicSs0bDJGenFiRTVDVUEiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkFSRUFfV09SS0lORyIsImFwcGlkIjoiZWJkNTcxMTktNjYzYy00NWJmLTgyZTYtYTU0ZGRiYjU2MTg4IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJKYWZmcmVkbyIsImdpdmVuX25hbWUiOiJUaMOpbyIsImlwYWRkciI6IjgwLjIxNS44NC43MCIsIm5hbWUiOiJUaMOpbyBKYWZmcmVkbyIsIm9pZCI6IjBkMDg3YjY1LTY3MTYtNGU5MS05YzY4LTcwODRiYzQyODZlZSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNTUyNDM1Mjc3LTE1OTY0OTU3OTUtMzA4OTYxMzczMS0zMTEyNCIsInBsYXRmIjoiMTQiLCJwdWlkIjoiMTAwMzAwMDBBNDIxRDg1NyIsInNjcCI6ImVtYWlsIE1haWwuUmVhZCBNYWlsLlNlbmQgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiWkdXZHd0X2FPVGs3RU1jblZVeFRCTGJ1cU13cURlNjk4T1d1ejktMUNkbyIsInRpZCI6IjkwMWNiNGNhLWI4NjItNDAyOS05MzA2LWU1Y2QwZjZkOWY4NiIsInVuaXF1ZV9uYW1lIjoidGhlby5qYWZmcmVkb0BlcGl0ZWNoLmV1IiwidXBuIjoidGhlby5qYWZmcmVkb0BlcGl0ZWNoLmV1IiwidXRpIjoicWZEM3lPUHRwMDI4WG5OUmU2MXBBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJGSTQtV0syWFFaZWJ5MDVlZ1ZJUFR5ZmhWQnlydXhSR2xya0hHN01ic2gwIn0sInhtc190Y2R0IjoxNDE3ODA0ODg3fQ.Hlp9G_oFl0Rj8bF6Sx7m7mP0TEuvWkfkS9T1r06tAVqPpWglrL6Hs0p8Zs2di_kYJdBVjUnq8ZVxaDLgA8CwJNB_iWAWOdCEwBrd6KBuvy9_JFrLtNHheagaBDays00oEbljK4IEKL2Sjyz5ZKUKxsImhhiU4dT6egPjxEET9Es55aXRKW1P2VLLreIojBO2R-WZOjdRdH0APC-QCo294gA-v2K2W2Dso-9nMgXT6qX1rGPZ93Tdwt1VqKpsiy0A5Y1LtZCyyvWUhdu07NdhXC2F5FklBa3X_2mtgdbl27UxNMb71bVL4gHIFlvSHxsaIorabY8-OAGJFleehmWR9A";
let options = {
    url: `https://graph.microsoft.com/v1.0/subscriptions`,
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type':	'application/json'
    },
    json: {
        changeType: "created",
        notificationUrl: `https://area51.ngrok.io/outlook/webhook/receive`,
        resource: "me/mailFolders('Inbox')/messages",
        expirationDateTime:now,
        clientState: cryptoRandomString({length: 20, type: 'url-safe'}),
        latestSupportedTlsVersion: "v1_2"
    }
};
// options = {
//     url: `https://graph.microsoft.com/v1.0/subscriptions`,
//     method: 'GET',
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// };
// options = {
//     url: "https://graph.microsoft.com/v1.0/me/messages/AQMkAGYzMjEyZWY0LTY4Y2QtNDQBYy1hNjNmLTk0ZWYzZjc1ZTJmYgBGAAADIWYUsE_vPE6d5eYrgq7OPwcAbU7_jVzh4k6RjYJ3gXaW-AAAAgEMAAAAbU7_jVzh4k6RjYJ3gXaW-AACUJ_ucQAAAA==",
//     method: 'GET',
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// };
// options = {
//     url: `https://graph.microsoft.com/v1.0/subscriptions/1b80c5e9-73a7-451d-a61f-296a62ec25b0`,
//     method: 'DELETE',
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// };

request(options, (err, res) => {
    if (err)
        return console.log(err);
    console.log("NICE PLAY");
    console.log(res.body);
});
