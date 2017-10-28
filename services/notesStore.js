const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });


function publicAddNote(note, callback)
{
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

/**
 * updated eine note, wird keine gefunden, so wird einen neuer erstellt -> upsert: true
 * @param note
 * @param callback
 */
function publicUpdateNote(note, callback) {
    db.update({_id: note._id}, note, {upsert: true}, function (err, numReplaced) {
        callback(err, numReplaced);
    });
}

function publicGet(id, currentUser, callback)
{
    db.findOne({ _id: id}, function (err, doc) {
        callback( err, doc);
    });
}

function publicAllNotes(callback)
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNote, update : publicUpdateNote, /*get : publicGet,*/ all : publicAllNotes};