var express = require('express');
    event = require('./routes/events')    
    config = require('./config')
var app = express.createServer();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowedDomains);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
});

// app.get('/user/:id/log/:event', function(request, response) {
//   client.set('foo', 'bar');
//   client.get('foo', function (err, reply) {
//         console.log(reply.toString()); // Will print `bar`
//   });
//   response.send('Hello World!');
// });

app.post('/events', event.addEvent);

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
