var connect = (function () {

    function loadAll() {

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (xhr.status !== 200) {
                    alert('There was a problem with the request. status = ' + xhr.status);
                }
            }
        };
        xhr.open('GET', location.origin + '/notes/', false); //sync
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.send();
        return xhr.responseText;
    }

    function saveAll(content) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (xhr.status !== 200) {
                    alert('There was a problem with the request. status = ' + xhr.status);
                }
            }
        };
        xhr.open('POST', location.origin + '/notes/all', false); //sync
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(content);
    }

    return {getAll: loadAll, persistNotes: saveAll};

})();