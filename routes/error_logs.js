var redis = require('redis');
var url = require('url');
config = require('../config')

if(process.env.REDISCLOUD_URL != null ){
    var redisURL = url.parse(process.env.REDISCLOUD_URL);
    var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
    client.auth(redisURL.auth.split(":")[1]);
}
else
    client = redis.createClient();

TIME_TO_EXPIRE =config.redisKeyTimeToExpire
SECRET_KEY = config.readRedisRecordSecret
REDIS_KEY_PREFIX = config.redisKeyPrefix

exports.createErrorLog = function(req, res) {
    var id = req.body.userId
    var projectId = req.body.projectId
    var pageContent = req.body.pageContent
    var responseContent = req.body.responseContent
    console.log("Saving Action Content: " + id + " " + projectId )

    var key = REDIS_KEY_PREFIX + projectId

    var jsonToStore = '{ "userId" : "'+id+'", "projectId" : "'+projectId+'" , "pageContent" : "'+pageContent+'", "responseContent" :"'+responseContent+'"}'

    client.setex(
        key,
        TIME_TO_EXPIRE,
        jsonToStore
    );

    res.send({redisKey:key})

};

exports.showErrorLog = function(req, res) {
    var query = require('url').parse(req.url,true).query;

    var id = query.redisKey
    var secret = query.secret

    var readisKey = REDIS_KEY_PREFIX + id

    console.log("Read Action Content: " + id + " " + secret )

    if(secret == SECRET_KEY)
        client.get(readisKey, function(err, replies){
                if(replies==null){
                    res.send("No Results FOUND")
                }
                else{
                    res.send(replies)
                }
            }
        );
    else
        res.send("No Valid Secret Key")
};

