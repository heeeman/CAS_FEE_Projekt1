const MAIN_PAGE = "main-template";
const EDIT_PAGE = "edit-template";
// const LOCALSTORAGE_ID = "CAS_FEE_V1";
const BOLT = '🗲'

let model;

initApplication();

function initApplication() {

    model = new Notelist();


    // registriert die notwendigen Helper im Handlebar
    Handlebars.registerHelper('dateConverter', function(dateString){
        return new Date(dateString).toLocaleDateString();
    });

    // laden der Daten und rendern des main page
    setContent(MAIN_PAGE, model.getNotes());
}

function setContent(htmlTemplate, context) {
    let source   = document.getElementById(htmlTemplate).innerHTML;
    let template = Handlebars.compile(source);
    let html    = template(context);
    document.getElementById("entryPoint").innerHTML = html;

    if(EDIT_PAGE == htmlTemplate) {
        setBolts(context.priority ? context.priority.length / 2 : 0);
        document.querySelectorAll(".bolt").forEach((btn, index) =>{

            btn.addEventListener("click", (event) =>{
                console.log('click on bolt');

                setBolts(index + 1);


            });
        });
    }else {
        let mainView = new MainView();
        mainView.addCreateNoteListener(() => setContent(EDIT_PAGE, {}));
        mainView.addSorter(sort);
        mainView.addFilter(filter)
    }
}


function setBolts(clickIndex) {
    console.log('bolt index , ' , clickIndex);
    document.querySelectorAll(".bolt").forEach((b, i) => {
        // console.log('btn index,  checked', i, b.checked)
        // console.log('btn index,  attrib[]', i, b.attributes['checked'])
        if ( i < clickIndex) {

            b.setAttribute('checked', null);

        }else {

            b.removeAttribute('checked');

        }
    })
}



var sortActions = {
    finishdate: (a, b) => getInt(b.dueDate) - getInt(a.dueDate),
    issuedate : (a, b) => getInt(b.issueDate) - getInt(a.issueDate),
    priority : (a, b) => b.priority.length - a.priority.length
}

function sort(event){
    let newOrder = model.getNotes().sort(sortActions[event.currentTarget.dataset.sortType]);
    setContent(MAIN_PAGE, newOrder);
}

var filterActions = {
    finished: (note) => note.finished == 'checked'
}

function filter(event){
    let newOrder = model.getNotes().filter(filterActions[event.currentTarget.dataset.filterType]);
    setContent(MAIN_PAGE, newOrder);
}



function save(event) {
    console.log("TODO save()");
    console.log("submit event: ", event);
    var form = document.getElementsByTagName("form")[0];

    let title = form.elements['title'].value;
    let description = form.elements['description'].value;
    let bolt = getPriority(form); // TODO
    let endtime = form.elements['endtime'].value;
    let noteId = form.elements['noteid'].value;



    let note =             {
        title: title,
        issueDate: new Date().toDateString(),
        dueDate: endtime,
        description: description,
        priority: bolt,
        finished: "",
        id: noteId
    }

    if (noteId) {
        model.updateNote(note);
    }else {
        model.addNewNote(note);
    }



}

function getPriority(form) {
    let bolts = form.elements['bolt'];
    let priority = "";
    bolts.forEach(el => { if(el.hasAttribute('checked')) priority += BOLT });
    return priority;
}


function getInt(s) {
    return parseInt(s.replace('-',''));
}

