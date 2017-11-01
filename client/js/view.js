class AbstractView {
    initContent(htmlTemplate, context){

        let source   = document.getElementById(htmlTemplate).innerHTML;
        let template = Handlebars.compile(source);
        let html    = template(context);
        document.getElementById("entryPoint").innerHTML = html;
    }
}

class MainView extends AbstractView{
    static get STYLE() { return 'NOTE-APP-STYLE'; }
    constructor() {
        super();
        this.STYLE = "NOTE-APP-STYLE";
        let lastStyle = localStorage.getItem(MainView.STYLE);
        if(lastStyle) {
            this.setStyle(lastStyle);
        }
    }

    init (template, context) {
        super.initContent(template, context)
        this.initStyleSeletor();
        document.querySelector('select.style-sheet').addEventListener('input', this.changeStyle.bind(this));
        document.getElementById("createButton").addEventListener('click', this.createNoteListener);
        document.querySelectorAll(".js-sort").forEach(e => e.addEventListener('click', this.sortListener));
        document.querySelectorAll(".js-filter").forEach(e => e.addEventListener('click', this.filterListener));
        document.querySelectorAll(".edit-button").forEach(e => e.addEventListener('click', this.editNoteListener));
        document.querySelectorAll("input[type='checkbox']").forEach(e => e.addEventListener('click', this.finishedListener));
    }

    initHandlebars() {
        // registriert die notwendigen Helper im Handlebar
        Handlebars.registerHelper('dateConverter', this.dateConverter);
        Handlebars.registerHelper('checkboxConverter', this.checkboxConverter);
        Handlebars.registerHelper('todayConverter', this.todayConverter);
        Handlebars.registerHelper('priorityConverter', this.priorityConverter);
    }

    initStyleSeletor() {
        let styleTag = document.querySelector('link.style-sheet');
        let selector = document.querySelector('select.style-sheet');
        selector.value = styleTag.dataset.selectedStyle;
    }

    changeStyle(event) {
        this.setStyle(event.target.value);
        localStorage.setItem(MainView.STYLE, event.target.value);
    }

    setStyle(filename) {
        let styleTag = document.querySelector('link.style-sheet')
        styleTag.href = '../css/' + filename + '.css';
        styleTag.dataset.selectedStyle = filename;
    }

    addCreateNoteListener(eventListener) {
        this.createNoteListener = eventListener;
    }

    addSorter(eventListener){
        this.sortListener = eventListener;
    }

    addFilter(eventListener){
        this.filterListener = eventListener;
    }

    addEditNoteListener(eventListener) {
        this.editNoteListener = eventListener;
    }

    addFinishedListener(eventListener) {
        this.finishedListener = eventListener;
    }

    dateConverter(dateString) {

        let dayInMs = 24 * 60 * 60 * 1000;
        let today = new Date(getTodayString());
        let trans = new Date(dateString);

        switch(trans.getTime()) {
            case today.getTime():
                return 'heute';
            case (today.getTime() - dayInMs):
                return 'gestern';
            case (today.getTime() + dayInMs):
                return 'morgen';
            default:
                return trans.toLocaleDateString();
        }
    }

    checkboxConverter(finishedDate) {
        if(finishedDate != ''){
            return 'checked';
        }else {
            return '';
        }
    }

    todayConverter(finishedDate) {
        if(getTodayString() == finishedDate) {
            return ' [heute]';
        }
        return '';
    }

    priorityConverter(prio) {
        let result = '';
        for(let i = 0 ; i < prio ; i++) {
            result += '🗲';
        }
        return result;
    }
}

class EditView extends AbstractView{

    init (template, context) {
        super.initContent(template, context)

        this.setPriority(context.priority);
        document.querySelectorAll(".priority").forEach((btn, index) =>{
            btn.addEventListener("click", (event) =>{
                this.setPriority(index + 1);
            });
        });

        document.querySelector('.cancel-button').addEventListener('click', this.cancelListener);
        // onsubmit muss gesetzt sein, ansonsten kann der browser ne Warning schmeissen
        document.querySelector('form').onsubmit = this.saveListener;

    }

    addCancelListener(eventListener) {
        this.cancelListener = eventListener;
    }

    addSaveListener(eventListener) {
        this.saveListener = eventListener;
    }

    getTitle() {
        return title.value;
    }

    getEndtime() {
        return endTime.value;
    }

    getDescription() {
        return description.value;
    }

    getPriority() {
        let prioritySigns = document.querySelectorAll('.priority');
        let priority = 0;
        prioritySigns.forEach(el => { if(el.classList.contains('checked')) priority++ });
        return priority;
    }

    getNoteId() {
        return noteid.value;
    }

    setPriority(clickIndex) {
        document.querySelectorAll(".priority").forEach((b, i) => {
            if ( i < clickIndex) {
                b.classList.add('checked');
            }else {
                b.classList.remove('checked')
            }
        })
    }
}