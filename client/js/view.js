class MainView {



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

class EditView {

    init(priority) {

        this.setBolts(priority ? priority.length / 2 : 0);
        document.querySelectorAll(".bolt").forEach((btn, index) =>{
            btn.addEventListener("click", (event) =>{
                this.setBolts(index + 1);
            });
        });
    }

    addCancelListener(eventListener) {
        document.querySelector('.cancelButton').addEventListener('click', eventListener);
    }

    addSaveListener(eventListener) {
        document.querySelector('.saveButton').addEventListener('click', eventListener);
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
        bolts.forEach(el => { if(el.classList.contains('checked')) priority += BOLT });
        return priority;
    }

    getNoteId() {
        return noteid.value;
    }


    setBolts(clickIndex) {
        console.log('bolt index , ' , clickIndex);
        document.querySelectorAll(".bolt").forEach((b, i) => {
            if ( i < clickIndex) {
                b.classList.add('checked');
            }else {
                b.classList.remove('checked')
            }
        })
    }
}