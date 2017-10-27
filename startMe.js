/**
 * was bauen wir
 *  Schritt 1  wir lösen den localstore ab
 *  =========
 * GET /notes/  -> liefert alle notes
 * POST /notes/all/  -> prov. um localstore abzulösen
 *
 * Schritt 2  wir machen REST
 * ==========
 * GET /notes/:id  -> liefert 1 note
 * POST /notes/  -> erzeugt eine note
 * PUT /notes/:id  -> updated eine note
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/client/'});
});
app.use("/notes", require('./routes/noteRoutes.js'));

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });