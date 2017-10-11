

(function initApplication() {

    // registriert die notwendigen Helper im Handlebar
    Handlebars.registerHelper('dateConverter', function(dateString){
        return new Date(dateString).toLocaleDateString();
    });

    new Controller(new Notelist(), new MainView(), new EditView());
})();
