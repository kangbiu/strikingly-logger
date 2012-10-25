var express = require('express');
    eventLogger = require('./routes/events')
    
var app = express.createServer();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

// app.get('/user/:id/log/:event', function(request, response) {
//   client.set('foo', 'bar');
//   client.get('foo', function (err, reply) {
//         console.log(reply.toString()); // Will print `bar`
//   });
//   response.send('Hello World!');
// });

app.post('/user/:user_id/log/:event', event.addEvent);

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
