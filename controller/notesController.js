const store = require("../services/notesStore.js");

module.exports.getNotes = function(req, res)
{
    store.all(function (err, orders) {
        res.json(orders || {});
    })
};

module.exports.persistNotes = function(req, res)
{
    req.body.forEach(note => store.update(note, (err, n) => {
        if(err) {
            console.log('ging wohl in die Hose err: ', err);
            console.log('ging wohl in die Hose note: ', note);
        }else {
            console.log('Es gibt viele Updates : ', n);
        }
    }))
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


