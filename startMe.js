const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').Server(app);
require('./services/pushClient.js').init(http);

app.use(Logger());
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/client/'});
});

app.use("/notes", require('./routes/noteRoutes.js'));
app.use(notFound);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;
http.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });

function Logger( options ){
    options = options ? options : {};

    return function log(req, res, next)
    {
        console.log(req.method +":"+ req.url);
        next();
    }
}

// middlewares
function notFound(req,res, next) {
    res.setHeader("Content-Type", 'text/html');
    res.send(404, "Nöö Nöö Nööö!  We could not find the page! ")
}

function errorHandler(err, req, res, next) {
    res.status(500).end(err.message);
}
