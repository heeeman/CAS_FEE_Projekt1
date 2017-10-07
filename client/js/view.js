class MainView {

    constructor(){
        this.init();
    }

    init () {
        document.getElementsByTagName('select')[0].
            addEventListener('input', this.changeStyle);
    }

    changeStyle(event) {
        let filename = event.target.value;
        document.getElementById('baseStyleSheet').href = '../css/' + filename + '.css';
    }


    addCreateNoteListener(eventListener) {
        document.getElementById("createButton").addEventListener('click', eventListener);
    }

    addSorter(eventListener){
        document.querySelectorAll(".js-sort").forEach(e =>
            e.addEventListener('click',eventListener));
    }

    addFilter(eventListener){
        document.querySelectorAll(".js-filter").forEach(e =>
            e.addEventListener('click',eventListener));
    }

}