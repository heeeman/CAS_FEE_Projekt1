const MAIN_PAGE = "main-template";
const EDIT_PAGE = "edit-template";
// const LOCALSTORAGE_ID = "CAS_FEE_V1";
const BOLT = '🗲'

let model;
let mainView;
let editView;

initApplication();

function initApplication() {

    model = new Notelist();
    mainView = new MainView();
    editView = new EditView();


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

        editView.addCancelListener(() => setContent(MAIN_PAGE, model.getNotes()));
        editView.addSaveListener(() => save());

        setBolts(context.priority ? context.priority.length / 2 : 0);
        document.querySelectorAll(".bolt").forEach((btn, index) =>{

            btn.addEventListener("click", (event) =>{
                console.log('click on bolt');

                setBolts(index + 1);


            });
        });
    }else {

        mainView.init();
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
    issuedate : (a, b) => b.issueDate - a.issueDate,
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

function save() {
    let note =             {
        title: editView.getTitle(),
        issueDate: new Date().getTime(),
        dueDate: editView.getEndtime(),
        description: editView.getDescription(),
        priority: editView.getPriority(),
        finished: "",
        id: editView.getNoteId()
    }

    if (note.id) {
        model.updateNote(note);
    }else {
        model.addNewNote(note);
    }

    setContent(MAIN_PAGE, model.getNotes());
}

function getInt(s) {
    return parseInt(s.replace(/-/g, ''));
}

