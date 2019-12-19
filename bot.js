var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
  
  const botRegexOne = /I love you/;
  const botRegexTwo = /i love you/;
  const botRegexThree = /I love u/;
  const botRegexFour = /i love u/;
  const botRegexFive = /I luv you/;
  const botRegexSix = /i luv you/;
  const botRegexSeven = /I luv u/;
  const botRegexEight = /i luv u/;

  if (request.text && (botRegexOne.test(request.text) || botRegexTwo.test(request.text) || botRegexThree.test(request.text)
            || botRegexFour.test(request.text) || botRegexFive.test(request.text) || botRegexSix.test(request.text)
            || botRegexSeven.test(request.text) || botRegexEight.test(request.text)) && request.name !== "Phil's Bot") {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;