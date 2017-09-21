const MAIN_PAGE = "main-template";
const EDIT_PAGE = "edit-template";

setContent(MAIN_PAGE, loadNotes());

function setContent(htmlTemplate, context) {
    console.log('context ', context);
    let source   = document.getElementById(htmlTemplate).innerHTML;
    let template = Handlebars.compile(source);
    let html    = template(context);
    document.getElementById("entryPoint").innerHTML = html;
}

function loadNoteById(id) {
    if (!id) return {};
    let a= loadNotes().notes.filter(note => note.id == id);
    return a.length > 0 ? a[0] : {};
}

/**
 * lädt die Notes vom Server und gibt ein Array von notes zurück.
 * Die Methode liefert ein leeres Array wenn keine Notes da sind.
 * @returns {{notes: [null,null,null]}}
 */
function loadNotes() {
  console.log('tue so als ob ich was vom Server lade');
    return     {notes: [
        {title: "My New Post",
            issueDate: "2017-03-17",
            dueDate:  "2017-10-17",
            description: "This is my first post!",
            priority: "🗲🗲🗲🗲🗲",
            finished: "checked",
            id:1},
        {title: "Rasen mähen",
            issueDate: "2017-01-12",
            dueDate:  "2017-09-12",
            description: "Unbedingt alle Flächen. Die Randsteine nicht vergessen." +
            "und \n endlich die Rosen schneiden",
            priority: "🗲",
            finished: "",
            id:2},
        {title: "einkaufen",
            issueDate: "2017-02-12",
            dueDate:  "2017-09-12",
            description: "Für Fest einen Braten und etwas Feuerwasser." +
            "Zum Dessert wäre es noch lässig etwas Käse, ach was Eis und ..... wer weiss dass schon so genau. es muss jedenfall genug her",
            priority: "",
            finished: "",
            id:3}]};
}

function changeStyle(filename) {
    document.getElementById('baseStyleSheet').href = filename + '.css';
}

function sortNotesOnFinishDate() {
    console.log('sort Notes on finish date -> give me soul');
    setContent(MAIN_PAGE, {notes: [

        {title: "Rasen mähen",
            issueDate: "12.01.2017",
            dueDate:  "12.9.2017",
            description: "Unbedingt alle Flächen. Die Randsteine nicht vergessen." +
            "und \n endlich die Rosen schneiden",
            priority: "🗲",
            finished: "",
            id:2},
        {title: "einkaufen",
            issueDate: "12.2.2017",
            dueDate:  "12.9.2017",
            description: "Für Fest einen Braten und etwas Feuerwasser." +
            "Zum Dessert wäre es noch lässig etwas Käse, ach was Eis und ..... wer weiss dass schon so genau. es muss jedenfall genug her",
            priority: "",
            finished: "",
            id:3}]})
}

function sortNotesOnIssueDate() {
    console.log('sort Notes on issue date -> give me soul');
}

function sortNotesOnPriority() {
    console.log('sort Notes on priority -> give me soul');
}
