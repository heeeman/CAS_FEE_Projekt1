class MainView {

    init () {
        this.initStyleSeletor();
        document.querySelector('select.style-sheet').addEventListener('input', this.changeStyle);
        document.getElementById("createButton").addEventListener('click', this.createNoteListener);
        document.querySelectorAll(".js-sort").forEach(e => e.addEventListener('click', this.sortListener));
        document.querySelectorAll(".js-filter").forEach(e => e.addEventListener('click', this.filterListener));
        document.querySelectorAll(".editbutton").forEach(e => e.addEventListener('click', this.editNoteListener));
        document.querySelectorAll("input[type='checkbox']").forEach(e => e.addEventListener('click', this.finishedListener));
    }

    initStyleSeletor() {
        let styleTag = document.querySelector('link.style-sheet');
        let selector = document.querySelector('select.style-sheet');
        selector.value = styleTag.dataset.selectedStyle;
    }

    changeStyle(event) {
        let filename = event.target.value;
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
}

class EditView {

    constructor(){
        this.BOLT = '🗲';
    }

    init(priority) {

        this.setBolts(priority ? priority.length / 2 : 0);
        document.querySelectorAll(".bolt").forEach((btn, index) =>{
            btn.addEventListener("click", (event) =>{
                this.setBolts(index + 1);
            });
        });

        document.querySelector('.cancelButton').addEventListener('click', this.cancelListener);
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
        let bolts = document.querySelectorAll('.bolt');
        let priority = "";
        bolts.forEach(el => { if(el.classList.contains('checked')) priority += this.BOLT });
        return priority;
    }

    getNoteId() {
        return noteid.value;
    }

    setBolts(clickIndex) {
        document.querySelectorAll(".bolt").forEach((b, i) => {
            if ( i < clickIndex) {
                b.classList.add('checked');
            }else {
                b.classList.remove('checked')
            }
        })
    }
}