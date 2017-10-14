
window.onload = (function initApplication() {

    // registriert die notwendigen Helper im Handlebar
    Handlebars.registerHelper('dateConverter', function(dateString){
        return new Date(dateString).toLocaleDateString();
    });

    new Controller(noteRepo, new MainView(), new EditView());
});
