const express = require('express');

const app = express();

app.use(express.static(__dirname + '/client'));

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/client/'});
});


const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });