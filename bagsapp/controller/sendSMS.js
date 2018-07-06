const accountSid = 'AC9d11bb0f67906143f66daaee512bc036';
const authToken = '15d87cef2a383c7b4fb4ac4944925b53';
const client = require('twilio')(accountSid, authToken);


module.exports = {

sendSMS: function(body, from, to){
    client.messages
    .create({
        Body: body,
        From: from,
        To: to
    })
    .then(message => console.log(message.sid))
    .done()
}
}
// client.messages
// .create({
//     body: 'Are you at the grocery store? Do not forget your bags!',
//     from: '+19162498645',
//     to: '+15304009728'
// })
// .then(message => console.log(message.sid))
// .done()

// 