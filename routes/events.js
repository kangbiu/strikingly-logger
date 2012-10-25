var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);

var util = require("util");

exports.addEvent = function(req, res) {
  var id = req.params.user_id
  var event = req.params.event
  console.log("Adding event: " + id + " " + event)
  client.get('User.' + id, function (err, reply) {    
    result = {'events':{}};
    if (reply !== null) {
      result = JSON.parse(reply);
    }
    
    result['events'][event] = result['events'][event] || {'count': 0, 'timestamps':[]}; // initialize
    resultEvent = result['events'][event];
    
    resultEvent['count']  += 1; // update the coun
    var date = new Date();
    var ts = Math.round(date.getTime() / 1000);
    resultEvent['timestamps'].push(ts); // insert new timestamp
    
    client.set('User.' + id, JSON.stringify(result));
    res.send({count:resultEvent['count']});
  });
};