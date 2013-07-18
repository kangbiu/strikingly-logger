var express = require('express');
    event = require('./routes/events')    
    config = require('./config')
    error_logs = require('./routes/errorLogs')

var app = express.createServer();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowedDomains);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// app config
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
});

app.post('/events', event.addEvent);
app.post('/error_logs', error_logs.savePageSubmitAction);
app.get('/error_logs', error_logs.readRedisRecord);


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
