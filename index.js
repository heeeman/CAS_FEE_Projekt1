var source   = document.getElementById("note-template").innerHTML;
var template = Handlebars.compile(source);
var context =
    {notes: [
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
var html    = template(context);


console.log(html);
document.getElementById("entryPoint").innerHTML = html;

