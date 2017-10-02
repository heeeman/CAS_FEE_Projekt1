const MAIN_PAGE = "main-template";
const EDIT_PAGE = "edit-template";
const LOCALSTORAGE_ID = "CAS_FEE_V1";

initApplication();

function initApplication() {

    //testcode
    // console.log("ACHTUNG : TESTCODE - SCHREIBT FIXE NOTES IN DEN LOCALSTORAGE");
    // persistNotes(getTestData().notes);
    // ende testcode

    // registriert die notwendigen Helper im Handlebar
    Handlebars.registerHelper('dateConverter', function(dateString){
        return new Date(dateString).toLocaleDateString();
    });

    // laden der Daten und rendern des main page
    setContent(MAIN_PAGE, loadNotes());
}

function setContent(htmlTemplate, context) {
    let source   = document.getElementById(htmlTemplate).innerHTML;
    let template = Handlebars.compile(source);
    let html    = template(context);
    document.getElementById("entryPoint").innerHTML = html;
}

function loadNoteById(id) {
    if (!id) return {};
    let a= loadNotes().filter(note => note.id == id);
    return a.length > 0 ? a[0] : {};
}

/**
 * lädt die Notes vom Server und gibt ein Array von notes zurück.
 * Die Methode liefert ein leeres Array wenn keine Notes da sind.
 * @returns {{notes: [null,null,null]}}
 */
function loadNotes() {

    var noteString = window.localStorage.getItem(LOCALSTORAGE_ID);
    if (!noteString || noteString == 'undefined') return [];
    return JSON.parse(noteString).notes;
}

function changeStyle(filename) {
    document.getElementById('baseStyleSheet').href = '../css/' + filename + '.css';
}

function sortNotesOnFinishDate() {
    let newOrder = loadNotes().sort((a, b) => getInt(b.dueDate) - getInt(a.dueDate));
    setContent(MAIN_PAGE, newOrder);
}

function sortNotesOnIssueDate() {
    let newOrder = loadNotes().sort((a, b) => getInt(b.issueDate) - getInt(a.issueDate));
    setContent(MAIN_PAGE, newOrder);
}

function sortNotesOnPriority() {
    let newOrder = loadNotes().sort((a, b) => b.priority.length - a.priority.length);
    setContent(MAIN_PAGE, newOrder);
}

function save(event) {
    console.log("TODO save()");
    console.log("submit event: ", event);
    var form = document.getElementsByTagName("form")[0];

    let title = form.elements['title'].value;
    let description = form.elements['description'].value;
    let bolt = '🗲'; // TODO
    let endtime = form.elements['endtime'].value;
    let noteId = form.elements['noteid'].value;



    let note =             {
        title: title,
        issueDate: "2017-03-17",
        dueDate: endtime,
        description: description,
        priority: bolt,
        finished: "",
        id: noteId
    }

    if (noteId) {
        updateNote(note);
    }else {
        addNewNote(note);
    }

    console.log("validity form: ", form.checkValidity());
    console.log("validity form: ", form.reportValidity());
    console.log("title is : ", form.elements['title'].value);
    console.log("description is : ", form.elements['description'].value);
    console.log("bolt is : ", form.elements['bolt'].value);
    console.log("endTime is : ", form.elements['endtime'].value);
    console.log("nonteId is : ", form.elements['noteid'].value);
}

function getNewId() {
    let x = loadNotes().reduce((a, b) => a.id > b.id ? a.id : b.id);
    return x + 1;
}

function addNewNote(note) {
    let notes = loadNotes();
    notes.push(note);
    persistNotes(notes);
}

function updateNote(note) {
    let notes = loadNotes();
    let index = notes.findIndex(no => no.id == note.id);
    notes[index] = note;
    persistNotes(notes);
}

function persistNotes(notes) {
    window.localStorage.setItem(LOCALSTORAGE_ID, JSON.stringify({notes: notes}));
}

function getInt(s) {
    return parseInt(s.replace('-',''));
}

// ab hier testcode

function getTestData() {
    return {
        notes: [
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
            }]
    };
}
