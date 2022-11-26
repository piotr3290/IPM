const data = [
    ['test@gamil.com', 'test2@edu.p.lodz.pl', 'piwro@wp.pl', 'abd@onet.pl', 'paniKrysia@gmail.com'],
    ['00-000', '23-958', '65-987', '55-888', '66-456'],
    ['PL-123-456789-8', 'PL-185-433389-3', 'PL-185-433389-3', 'PL-185-433389-3', 'PL-185-433389-3'],
    ['ABC132456', 'EKG985587', 'EKG985587', 'EKG985587', 'EKG985587'],
    ['125.98.0.63', '255.8.60.77', '255.8.60.77', '255.8.60.77', '255.8.60.77'],
    ['https://www.google.com/', 'https://www.microsoft.com/pl-pl', 'https://www.microsoft.com/pl-pl', 'https://www.microsoft.com/pl-pl', 'https://www.microsoft.com/pl-pl'],
    ['C:\\windows\\temp', 'd:\\msdos', 'd:\\msdos', 'd:\\msdos', 'd:\\msdos'],
    ['C:\\WinDows\\temp', 'd:\\msdOs', 'd:\\msdOs', 'd:\\msdOs', 'd:\\msdOs'],
    ['/etc/passwd', '/etc/hosts', '/etc/hosts', '/etc/hosts', '/etc/hosts'],
    ['4344:1bba:bfb9:5d94:cbdd:80bb:b523:e823', '89e1:53a6:7a2a:e1d0:05f3:dc78:4fb9:22de', '89e1:53a6:7a2a:e1d0:05f3:dc78:4fb9:22de', '89e1:53a6:7a2a:e1d0:05f3:dc78:4fb9:22de', '89e1:53a6:7a2a:e1d0:05f3:dc78:4fb9:22de'],
    ['997', '+48 555 666 777', '+48 555 666 777', '+48 555 666 777', '+48 555 666 777'],
    ['2022-10-22', '2022-10-30', '2022-10-30', '2022-10-30', '2022-10-30'],
    [getCurrentWeekFriday(), getCurrentWeekMonday(), getCurrentWeekMonday(), getCurrentWeekMonday(), getCurrentWeekMonday()],
    ['10:22AM', '12:34PM', '12:34PM', '12:34PM', '12:34PM'],
    ['01:44', '19:55', '19:55', '19:55', '19:55'],
    ['#e62b31', '#34efc3', '#34efc3', '#34efc3', '#34efc3'],
];


function fillData() {
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = data[i][randomInt()];
    }
}

function randomInt() {
    return Math.floor(Math.random() * (5));
}

function check() {
    let input = document.getElementById('directory-path2-input');
    if (input.value.match(/^[A-Za-z]:(\\(windows|winnt|win|dos|msdos))(\\(\w)+)*$/i)) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('invalid');
    }
}

function initInput() {
    let dateInput = document.getElementById('current-week-date-input');
    dateInput.setAttribute('min', getCurrentWeekMonday());
    dateInput.setAttribute('max', getCurrentWeekFriday());
    loadData();
}

function getCurrentWeekMonday() {
    let todayDate = new Date();
    let weekday = todayDate.getDay();
    if (weekday === 0) {
        weekday = 7;
    }

    let result = new Date();
    result.setDate(todayDate.getDate() - (weekday - 1));

    return getFormattedDate(result);
}

function getCurrentWeekFriday() {
    let todayDate = new Date();
    let weekday = todayDate.getDay();
    if (weekday === 0) {
        weekday = 7;
    }

    let result = new Date();
    result.setDate(todayDate.getDate() - (weekday - 5));

    return getFormattedDate(result);
}

function getFormattedDate(date) {
    return date.toISOString().split('T')[0];
}


// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("MyDatabase", 1);

open.onupgradeneeded = function () {

    let db = open.result;

    let store = db.createObjectStore("MyObjectStore", {keyPath: "id"});

};

// var db1 = open.result;

const fieldNames = [
    'email-input',
    'postal-code-input',
    'nip-input',
    'id-number-input',
    'ip-v4-input',
    'www-input',
    'directory-path-input',
    'directory-path2-input',
    'file-path-input',
    'ip-v6-input',
    'phone-input',
    'date-input',
    'current-week-date-input',
    'time-12-input',
    'time-24-input',
    'color-input',
];

function saveData() {

    let data = {};

    for (let fieldName of fieldNames) {
        data[fieldName] = document.getElementById(fieldName).value;
    }

    var db = open.result;

    var tx = db.transaction("MyObjectStore", "readwrite");

    var store = tx.objectStore("MyObjectStore");

    let id = document.getElementById('email-input').value;

    store.put({id: id, data: data});


    let getData = store.get(id);


    getData.onsuccess = function () {

        console.log(getData.result.data);
        loadData();

    };
}

function loadData() {
    var db = open.result;

    var tx = db.transaction("MyObjectStore", "readwrite");

    var store = tx.objectStore("MyObjectStore");

    let dataList = document.getElementById('data-list');

    const getAll = store.getAll();

    while (dataList.firstChild) {
        dataList.removeChild(dataList.firstChild);
    }

    getAll.onsuccess = () => {
        for (let id of getAll.result) {

            let tr = document.createElement('tr');
            let td = document.createElement('td');
            const newContent = document.createTextNode(id.id);

            let deleteButton = document.createElement('button');
            deleteButton.onclick = () => deleteElement(id.id);
            deleteButton.appendChild(document.createTextNode('x'));

            td.appendChild(newContent);
            tr.appendChild(td);
            tr.appendChild(deleteButton);
            tr.onclick = () => loadToEdit(id.id);
            dataList.appendChild(tr);
        }

    };

}

function deleteElement(id) {
    var db = open.result;

    var tx = db.transaction("MyObjectStore", "readwrite");

    var store = tx.objectStore("MyObjectStore");

    store.delete(id);

    tx.oncomplete = () => {
        loadData();
    };
}

function loadToEdit(id) {
    var db = open.result;

    var tx = db.transaction("MyObjectStore", "readwrite");

    var store = tx.objectStore("MyObjectStore");

    let element = store.get(id);

    element.onsuccess = () => {
        let el = element.result.data;

        let inputs = document.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = el[input.id];
        }
    };
}
