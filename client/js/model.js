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
        note.id = this.getNewId();
        this.notes.push(note);
        this.persistNotes();
    }

    updateNote(note) {
        let toUpdate = this.notes.find(no => no.id == note.id);
        toUpdate.title = note.title;
        toUpdate.dueDate = note.dueDate;
        toUpdate.description = note.description;
        toUpdate.priority = note.priority;
        this.persistNotes();
    }

    getNewId() {
        let x = this.notes.reduce((a, b) => a.id > b.id ? a.id : b.id);
        return x + 1;
    }

    persistNotes() {
        window.localStorage.setItem(this.LOCALSTORAGE_ID, JSON.stringify({notes: this.notes}));
    }

    loadNoteById(id) {
        if (!id) return {};
        let a= this.notes.filter(note => note.id == id);
        return a.length > 0 ? a[0] : {};
    }

    /**
     * lädt die Notes vom Server und gibt ein Array von notes zurück.
     * Die Methode liefert ein leeres Array wenn keine Notes da sind.
     * @returns {{notes: [null,null,null]}}
     */
    loadNotes() {
        var noteString = window.localStorage.getItem(this.LOCALSTORAGE_ID);
        if (!noteString || noteString == 'undefined') return [];
        return JSON.parse(noteString).notes;
    }


    getTestData() {
        let notes = [
            {
                title: "My New Post",
                issueDate: "2017-03-17",
                dueDate: "2017-10-17",
                description: "This is my first post!",
                priority: "",
                finished: "checked",
                id: 1
            },
            {
                title: "Rasen mähen",
                issueDate: "2017-01-12",
                dueDate: "2018-09-12",
                description: "Unbedingt alle Flächen. Die Randsteine nicht vergessen." +
                "und \n endlich die Rosen schneiden",
                priority: "🗲🗲🗲🗲🗲",
                finished: "",
                id: 2
            },
            {
                title: "einkaufen",
                issueDate: "2017-02-12",
                dueDate: "2017-09-12",
                description: "Für Fest einen Braten und etwas Feuerwasser." +
                "Zum Dessert wäre es noch lässig etwas Käse, ach was Eis und ..... wer weiss dass schon so genau. es muss jedenfall genug her",
                priority: "🗲🗲🗲",
                finished: "",
                id: 3
            }];
        return notes;
    }
}