const store = require("../services/notesStore.js");

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

// module.exports.createNote = function(req, res)
// {
//     let order = store.add(req.body.name, util.current(req), function(err, order) {
//         res.json(order);
//     });
// };
//
// module.exports.getNote = function(req, res){
//     store.get(req.params.id, util.current(req), function(err, order) {
//         res.json(order);
//     });
// };


