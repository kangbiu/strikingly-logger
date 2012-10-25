var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);

exports.addEvent = function(req, res) {
  var id = req.params.user_id
  var event = req.params.event
  console.log("Adding event: " + id + " " + event)
  // client.set('foo', 'bar');
  client.get('User.' + id, function (err, reply) {
    console.log('result:')
    console.log(reply);
  });
};