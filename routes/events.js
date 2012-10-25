var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
client.auth(redisURL.auth.split(":")[1]);

exports.addEvent = function(req, res) {
  var id = req.body.user_id
  var event = req.body.event.split(' ').join('_')
  console.log("Adding event: " + id + " " + event)
  
  client.hincrby('user:'+id+':count', event, 1, function(e, reply) {
    var date = new Date();
    var ts = Math.round(date.getTime() / 1000);
    client.lpush('user:'+id+':'+event, ts);
    res.send({count:reply});
  });
};