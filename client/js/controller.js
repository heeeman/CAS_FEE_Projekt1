const MAIN_PAGE = "main-template";
const EDIT_PAGE = "edit-template";

class Controller {

    constructor(pModel, pMainView, pEditView) {
        this.status = new Status();
        this.model = pModel;
        this.model.setRefresher(this.refresh.bind(this));
        this.mainView = pMainView;
        this.editView = pEditView;
        this.init();
        this.mainView.initHandlebars();
        // laden der Daten und rendern des main page
        this.setContent(MAIN_PAGE, this.model.getNotes());
    }

    init() {
        this.mainView.addCreateNoteListener(() => this.setContent(EDIT_PAGE, {}));
        this.mainView.addSorter(this.sort.bind(this));
        this.mainView.addFilter(this.filter.bind(this));
        this.mainView.addEditNoteListener(this.editNote.bind(this));
        this.mainView.addFinishedListener(this.finishNote.bind(this));

        this.editView.addCancelListener(() => this.setContent(MAIN_PAGE, this.model.getNotes()));
        this.editView.addSaveListener((form) => this.save(form));
    }

    setContent(htmlTemplate, context) {
        this.status.page = htmlTemplate;
        if (EDIT_PAGE == htmlTemplate) {
            this.editView.init(htmlTemplate, context);
            this.status.editPage.id = context._id;
        } else {
            this.mainView.init(htmlTemplate, context);
        }
    }

    finishNote(event) {
        let note = this.model.loadNoteById(event.target.dataset.noteId);
        note.finished = event.target.checked ? getTodayString() : "";
        this.model.updateNote(note);
        event.target.nextSibling.nodeValue = 'Finished' + this.mainView.todayConverter(note.finished);
    }

    editNote(event) {
        this.setContent(EDIT_PAGE, this.model.loadNoteById(event.target.dataset.noteId));
    }

    sort(event) {
        let newOrder = this.model.getNotes().sort(this.status.getSorter(event.currentTarget.dataset.sortType));
        this.setContent(MAIN_PAGE, newOrder);
    }

    filter(event) {
        let newOrder = this.model.getNotes().filter(this.status.getFilter(event.currentTarget.dataset.filterType));
        this.setContent(MAIN_PAGE, newOrder);
    }

    save(form) {
        let note = {
            title: this.editView.getTitle(),
            issueDate: new Date().getTime(),
            dueDate: this.editView.getEndtime(),
            description: this.editView.getDescription(),
            priority: this.editView.getPriority(),
            finished: "",
            _id: this.editView.getNoteId()
        }

        if (note._id) {
            this.model.updateNote(note);
        } else {
            this.model.addNewNote(note);
        }

        this.setContent(MAIN_PAGE, this.model.getNotes());
        return false;  // cancel form submission -> we don't need in SPA
    }

    getInt(s) {
        return parseInt(s.replace(/-/g, ''));
    }

    refresh(list, note) {
        switch (this.status.page) {
            case MAIN_PAGE:
                this.status.checkMainPage(list, (viewList) => this.setContent(MAIN_PAGE, viewList));
                break;
            case EDIT_PAGE:
                this.status.checkEditPage(note, _ => this.setContent(EDIT_PAGE, note))
                break;
        }
    }

}

class Status {

    constructor() {
        this.page;
        this.mainPage = {};
        this.editPage = {};
        this.sortActions = {
            finishdate: (a, b) => this.getInt(b.dueDate) - this.getInt(a.dueDate),
            issuedate: (a, b) => b.issueDate - a.issueDate,
            priority: (a, b) => b.priority - a.priority
        }
        this.filterActions = {
            finished: (note) => note.finished != ''
        }
    }

    getFilter(type) {
        this.mainPage.filter = this.filterActions[type];
        this.mainPage.sorter = null;
        return this.mainPage.filter;
    }

    getSorter(type) {
        this.mainPage.sorter = this.sortActions[type];
        this.mainPage.filter = null;
        return this.mainPage.sorter;
    }

    checkEditPage(note, refresh) {
        if (note && this.editPage.id && this.editPage.id == note._id) refresh();
    }

    checkMainPage(list, refresh) {
        if (list) {
            let result = this.filter(list);
            result = this.sort(result);
            refresh(result);
        }
    }

    filter(list) {
        if (this.mainPage.filter) {
            return list.filter(this.mainPage.filter);
        }
        return list;
    }

    sort(list) {
        if (this.mainPage.sorter) {
            return list.sort(this.mainPage.sorter);
        }
        return list;
    }

    getInt(s) {
        return parseInt(s.replace(/-/g, ''));
    }
}