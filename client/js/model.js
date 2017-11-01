var noteRepo = (function () {

    class Notelist {

        constructor() {
            this.refresher = null;
            connect.setServerListener(this.serverPush.bind(this));
            this.notes = this.loadNotes();
        }

        getNotes() {
            return this.notes;
        }

        addNewNote(note) {
            delete note._id;  //Hack -> sonst vergibt die DB keine ID
            connect.createNote(JSON.stringify(note), res => {
                let created = JSON.parse(res);
                this.notes.push(created);
                this.callRefresh(this.notes, created);
            });
        }

        updateNote(note) {
            let toUpdate = this.notes.find(no => no._id == note._id);
            toUpdate.title = note.title;
            toUpdate.dueDate = note.dueDate;
            toUpdate.description = note.description;
            toUpdate.priority = note.priority;
            connect.updateNote(JSON.stringify(toUpdate));
        }

        loadNoteById(id) {
            if (!id) return {};
            let a = this.notes.filter(note => note._id == id);
            return a.length > 0 ? a[0] : {};
        }

        /**
         * lädt die Notes vom Server und gibt ein Array von notes zurück.
         * Die Methode liefert ein leeres Array wenn keine Notes da sind.
         * @returns {{notes: [null,null,null]}}
         */
        loadNotes() {
            connect.getAll(notes => {
                this.notes = (!notes || notes == 'undefined') ? [] : JSON.parse(notes);
                this.callRefresh(this.notes, null);
            })
            return this.notes;
        }

        callRefresh(list, note) {
            if (this.refresher) {
                this.refresher(list, note);
            }
        }

        serverPush(noteId) {
            connect.getAll(notes => {
                this.notes = (!notes || notes == 'undefined') ? [] : JSON.parse(notes);
                let note = null;
                if (noteId) {
                    let n = this.loadNoteById(noteId);
                    if (n._id) note = n;
                }
                this.callRefresh(this.notes, note);
            })
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

    function setRefresh(refresher) {
        nodeList.refresher = refresher;
    }

    return {
        getNotes: getAllNotes,
        addNewNote: addNote,
        updateNote: updateNote,
        loadNoteById: loadNote,
        setRefresher: setRefresh
    };
})();
