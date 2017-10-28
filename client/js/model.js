
var noteRepo = (function () {

    class Notelist {

        constructor() {
            this.LOCALSTORAGE_ID = "CAS_FEE_V1";
            this.notes = this.loadNotes();
            // this.notes = this.getTestData();
            // this.persistNotes();
        }

        getNotes() {
            return this.notes;
        }

        addNewNote(note) {
            delete note._id;  //Hack -> sonst vergibt die DB keine ID
            this.notes.push(note);
            this.persistNotes();
            this.notes = this.loadNotes();  // sonst haben wir keine Id auf dem neu erstellten Obj
        }

        updateNote(note) {
            let toUpdate = this.notes.find(no => no._id == note._id);
            toUpdate.title = note.title;
            toUpdate.dueDate = note.dueDate;
            toUpdate.description = note.description;
            toUpdate.priority = note.priority;
            this.persistNotes();
        }

        persistNotes() {
            connect.persistNotes(JSON.stringify({notes: this.notes}));
        }

        loadNoteById(id) {
            if (!id) return {};
            let a= this.notes.filter(note => note._id == id);
            return a.length > 0 ? a[0] : {};
        }

        /**
         * lädt die Notes vom Server und gibt ein Array von notes zurück.
         * Die Methode liefert ein leeres Array wenn keine Notes da sind.
         * @returns {{notes: [null,null,null]}}
         */
        loadNotes() {
            var noteString = connect.getAll();
            if (!noteString || noteString == 'undefined') return [];
            return JSON.parse(noteString);
        }


        getTestData() {
            let notes = [
                {
                    title: "My New Post",
                    issueDate: new Date("2017-03-17").getTime(),
                    dueDate: "2017-10-17",
                    description: "This is my first post!",
                    priority: 0,
                    finished: "2017-05-06"
                },
                {
                    title: "Rasen mähen",
                    issueDate: new Date("2017-01-12").getTime(),
                    dueDate: "2018-09-12",
                    description: "Unbedingt alle Flächen. Die Randsteine nicht vergessen." +
                    "und \n endlich die Rosen schneiden",
                    priority: 5,
                    finished: ""
                },
                {
                    title: "einkaufen",
                    issueDate: new Date("2017-02-12").getTime(),
                    dueDate: "2017-09-12",
                    description: "Für Fest einen Braten und etwas Feuerwasser." +
                    "Zum Dessert wäre es noch lässig etwas Käse, ach was Eis und ..... wer weiss dass schon so genau. es muss jedenfall genug her",
                    priority: 3,
                    finished: ""
                }];
            return notes;
        }
    }

    let nodeList = new Notelist();

    function getAllNotes() {
        return nodeList.getNotes();
    }

    function addNote(note) {
        nodeList.addNewNote(note);
    }

    function updateNote(note) {
        nodeList.updateNote(note);
    }

    function loadNote(id) {
        return nodeList.loadNoteById(id);
    }

    return {    getNotes: getAllNotes,
                addNewNote: addNote,
                updateNote: updateNote,
                loadNoteById: loadNote
    };
})();
