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
    console.log('result:')
    console.log(util.inspect(reply, false, null));
    
    result = {};
    if (reply !== null) {
      result = JSON.parse(reply);
    }
    
    result[event] = result[event] || 0;
    result[event] += 1;
    client.set('User.' + id, JSON.stringify(result));
    res.send(result[event]);
  });
};