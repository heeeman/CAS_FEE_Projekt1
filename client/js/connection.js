var connect = (function () {

    const urlRoot = location.origin + '/notes/';

    function loadAll(callBack) {
        fetch(urlRoot, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            // return res.json(); // so liessen sich direkt JS Objekte erzeugen
            return res.text();
        }).then(json => {callBack(json);});
    }

    /**synchrone Verbindung**/
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

        fetch(urlRoot, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
            },
            body: content
        }).then(function (res) {
            return res.text();
        });

        /**Variante xhr**/
        //
        //
        // var xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function () {
        //     if (4 === xhr.readyState) {
        //         if (xhr.status !== 200) {
        //             alert('There was a problem with the request. status = ' + xhr.status);
        //         }
        //     }
        // };
        // xhr.open('PUT', urlRoot, true); //async
        // xhr.setRequestHeader('Content-Type', 'application/json')
        // xhr.send(content);
    }

    function postNote(content, callback) {

        fetch(urlRoot, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: content
        }).then(function (res) {
            // return res.json(); // so liessen sich direkt JS Objekte erzeugen
            return res.text();
        }).then(json => {callback(json);});

        /**Variante xhr**/
        //
        // var xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function () {
        //     if (4 === xhr.readyState) {
        //         if (xhr.status === 200) {
        //             callback(xhr.responseText);
        //         }else {
        //             alert('There was a problem with the request. status = ' + xhr.status);
        //         }
        //     }
        // };
        // xhr.open('POST', urlRoot, true); //async
        // xhr.setRequestHeader('Content-Type', 'application/json')
        // xhr.send(content);
    }

    return {getAll: loadAll,
            persistNotes: saveAll,
            createNote: postNote,
            updateNote: putNote
    };

})();