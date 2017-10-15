
window.onload = (function initApplication() {
    getTodayString = function () {
        return new Date().toISOString().slice(0, 10);
    }
    new Controller(noteRepo, new MainView(), new EditView());
});

