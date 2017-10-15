
window.onload = (function initApplication() {
    new Controller(noteRepo, new MainView(), new EditView());
});

