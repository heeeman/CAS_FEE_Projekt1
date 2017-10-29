var connect = (function () {

    const urlRoot = location.origin + '/notes/';

    function loadAll(callBack) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (xhr.status === 200) {
                    callBack(xhr.responseText);
                }else {
                    alert('There was a problem with the request. status = ' + xhr.status);
                }
            }
        };
        xhr.open('GET', urlRoot, true); //async
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
        xhr.open('POST', urlRoot + 'all', false); //sync
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(content);
    }

    function putNote(content) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (xhr.status !== 200) {
                    alert('There was a problem with the request. status = ' + xhr.status);
                }
            }
        };
        xhr.open('PUT', urlRoot, true); //async
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(content);
    }

    function postNote(content, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                }else {
                    alert('There was a problem with the request. status = ' + xhr.status);
                }
            }
        };
        xhr.open('POST', urlRoot, true); //async
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(content);
    }

    return {getAll: loadAll,
            persistNotes: saveAll,
            createNote: postNote,
            updateNote: putNote
    };

})();