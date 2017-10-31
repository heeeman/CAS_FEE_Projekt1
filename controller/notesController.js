const store = require("../services/notesStore.js");
const io = require('../services/pushClient');

module.exports.getNotes = function(req, res, next)
{
    store.all(function (err, orders) {

        if(err && next) {
            next(err);
        }
        res.json(orders || {});
    })
};

module.exports.persistNotes = function(req, res, next)
{
    req.body.notes.forEach(note => store.update(note, (err, n) => {
        if(err && next) {
            next(err)
        }
    }))
    res.end();
};

module.exports.updateNote = function(req, res)
{
    let order = store.update(req.body, (err, n) => {
        if(err && next) {
            next(err)
        }
        io.notifyClient(req.body._id);
    })
    res.end();
};

module.exports.createNote = function(req, res, next)
{
    let order = store.insert(req.body, (err, note) => {
        if(err && next) {
            next(err)
        }
        res.json(note);
        io.notifyClient();  // ganze liste erneuern
    })
};


