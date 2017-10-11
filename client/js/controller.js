const MAIN_PAGE = "main-template";
const EDIT_PAGE = "edit-template";


class Controller {

    constructor(pModel, pMainView, pEditView){
        this.model = pModel;
        this.mainView = pMainView;
        this.editView = pEditView;
        this.init();
        // laden der Daten und rendern des main page
        this.setContent(MAIN_PAGE, this.model.getNotes());
    }

    init() {
        this.sortActions = {
            finishdate: (a, b) => this.getInt(b.dueDate) - this.getInt(a.dueDate),
            issuedate : (a, b) => b.issueDate - a.issueDate,
            priority : (a, b) => b.priority.length - a.priority.length
        }

        this.filterActions = {
            finished: (note) => note.finished == 'checked'
        }
        this.sortListener = this.sort.bind(this);
        this.filterListener = this.filter.bind(this);
        this.editListener = this.editNote.bind(this);
    }


    setContent(htmlTemplate, context) {
        let source   = document.getElementById(htmlTemplate).innerHTML;
        let template = Handlebars.compile(source);
        let html    = template(context);
        document.getElementById("entryPoint").innerHTML = html;

        if(EDIT_PAGE == htmlTemplate) {

            this.editView.init(context.priority);
            this.editView.addCancelListener(() => this.setContent(MAIN_PAGE, this.model.getNotes()));
            this.editView.addSaveListener(() => this.save());
        }else {

            this.mainView.init();
            this.mainView.addCreateNoteListener(() => this.setContent(EDIT_PAGE, {}));
            this.mainView.addSorter(this.sortListener);
            this.mainView.addFilter(this.filterListener);
            this.mainView.addEditNoteListener(this.editListener);
        }
    }

    editNote(event) {
        this.setContent(EDIT_PAGE, this.model.loadNoteById(event.target.dataset.noteId));
    }

    sort(event){
        let newOrder = this.model.getNotes().sort(this.sortActions[event.currentTarget.dataset.sortType]);
        this.setContent(MAIN_PAGE, newOrder);
    }

    filter(event){
        let newOrder = this.model.getNotes().filter(this.filterActions[event.currentTarget.dataset.filterType]);
        this.setContent(MAIN_PAGE, newOrder);
    }

    save() {
        let note =             {
            title: this.editView.getTitle(),
            issueDate: new Date().getTime(),
            dueDate: this.editView.getEndtime(),
            description: this.editView.getDescription(),
            priority: this.editView.getPriority(),
            finished: "",
            id: this.editView.getNoteId()
        }

        if (note.id) {
            this.model.updateNote(note);
        }else {
            this.model.addNewNote(note);
        }

        this.setContent(MAIN_PAGE, this.model.getNotes());
    }

    getInt(s) {
        return parseInt(s.replace(/-/g, ''));
    }

}