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

exports.savePageSubmitAction = function(req, res) {
    var id = req.body.user_id
    var projectId = req.body.project_id
    var pageContent = req.body.page_content
    var responseContent = req.body.response_content
    console.log("Saving Action Content: " + id + " " + projectId )

    var key = 'pageError_'+projectId

    var jsonToStore = '{ "userId" : "'+id+'", "projectId" : "'+projectId+'" , "pageContent" : "'+pageContent+'", "responseContent" :"'+responseContent+'"}'

    client.setex(
        key,
        TIME_TO_EXPIRE,
        jsonToStore
    );

    res.send({redisKey:key})

};

exports.readRedisRecord = function(req, res) {
    var query = require('url').parse(req.url,true).query;

    var id = query.redisKey
    var secret = query.secret

    console.log("Read Action Content: " + id + " " + secret )

    if(secret == SECRET_KEY)
        client.get(id, function(err, replies){
                res.send(replies)
            }
        );
    else
        res.send("No Valid Secret Key")
};

