
setContent("note-template", loadNotes())

function setContent(htmlTemplate, context) {

    let source   = document.getElementById(htmlTemplate).innerHTML;
    let template = Handlebars.compile(source);
    let html    = template(context);
    document.getElementById("entryPoint").innerHTML = html;
}

function loadNotes() {
  console.log('tue so als ob ich was vom Server lade');
    return     {notes: [
        {title: "My New Post",
            issueDate: "12.3.2017",
            dueDate:  "morgen",
            description: "This is my first post!",
            priority: "🗲🗲🗲🗲🗲",
            finished: "checked",
            id:1},
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
            id:3}]};
}

function changeStyle(filename) {
    document.getElementById('baseStyleSheet').href = filename + '.css';
}

function sortNotesOnFinishDate() {
    console.log('sort Notes on finish date -> give me soul');
    setContent("note-template", {notes: [

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
