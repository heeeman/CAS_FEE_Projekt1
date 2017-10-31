const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').Server(app);
require('./services/pushClient.js').init(http);

app.use(myDummyLogger());

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/client/'});
});

app.use("/notes", require('./routes/noteRoutes.js'));

const hostname = '127.0.0.1';
const port = 3000;
http.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });

function myDummyLogger( options ){
    options = options ? options : {};

    return function myInnerDummyLogger(req, res, next)
    {
        console.log(req.method +":"+ req.url);
        next();
    }
}