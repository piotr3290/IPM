const data = [
    ['Jan', 'Hanna', 'Witold', 'Piotr', 'Krystyna'],
    ['Górniak', 'Grzyb', 'Wróbel', 'Byk', 'Waga'],
    ['Google', 'Microsoft', 'Deloitte', 'Accenture', 'Sony'],
    ['test@gamil.com', 'test2@edu.p.lodz.pl', 'piwro@wp.pl', 'abd@onet.pl', 'paniKrysia@gmail.com'],
    ['00-000', '23-958', '65-987', '55-888', '66-456'],
    ['PL-123-456789-8', 'PL-155-430989-3', 'PL-090-400009-5', 'PL-995-987389-7', 'PL-545-455889-0'],
    ['ABC132456', 'EKG985587', 'OKL665587', 'SEW215067', 'KIK555555'],
    ['125.98.0.63', '255.8.60.77', '56.6.60.21', '123.4.77.77', '225.48.245.33'],
    ['https://www.google.com/', 'https://www.microsoft.com/pl-pl', 'https://www.wikamp.pl/', 'https://www.stackoverflow.com/', 'https://www.github.com/'],
    ['C:\\windows\\temp', 'd:\\msdos', 'f:\\dos', 'g:\\windows', 'H:\\win'],
    ['C:\\WinDows\\temp', 'd:\\msdOs', 'e:\\msdOs', 'c:\\DOS', 'H:\\WIN'],
    ['/etc/passwd', '/etc/hosts', '/etc/temp', '/etc/cat', '/etc/etc'],
    ['4344:1bba:bfb9:5d94:cbdd:80bb:b523:e823', '89e1:53a6:7a2a:e1d0:05f3:dc78:4fb9:22de', 'c0f4:c61d:c8fe:c180:f776:4da1:b11a:af0a', '27bd:ce83:95b0:f1b7:e583:a5ef:e3c1:695b', 'bf2f:0488:9fdf:68a4:5304:17fd:017d:7711'],
    ['997', '+48 555 666 777', '112', '42 555 65 56', '789 465 789'],
    ['2022-10-22', '2022-10-30', '2022-10-26', '2022-11-30', '2023-01-01'],
    [getCurrentWeekFriday(), getCurrentWeekMonday(), getCurrentWeekFriday(), getCurrentWeekMonday(), getCurrentWeekFriday()],
    ['10:22AM', '12:34PM', '11:54PM', '10:04AM', '02:00PM'],
    ['01:44', '19:55', '13:24', '11:44', '08:05'],
    ['#e62b31', '#34efc3', '#42F516', '#1808ef', '#efc600'],
];


function fillData() {
    let inputs = document.getElementsByClassName('form-input');
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

const fieldNames = [
    'first-name-input',
    'last-name-input',
    'company-input',
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

function saveData(event) {

    event.preventDefault();
    let data = {};

    for (let fieldName of fieldNames) {
        data[fieldName] = document.getElementById(fieldName).value;
    }

    let db = open.result;

    let tx = db.transaction("MyObjectStore", "readwrite");

    let store = tx.objectStore("MyObjectStore");

    let id = document.getElementById('email-input').value;

    store.put({id: id, data: data});


    let getData = store.get(id);


    getData.onsuccess = function () {

        console.log(getData.result.data);
        loadData();

    };
}

let search;

function searchChange() {
    search = document.getElementById('search-input').value;
    loadData();
}

function loadData() {
    let db = open.result;

    let tx = db.transaction("MyObjectStore", "readwrite");

    let store = tx.objectStore("MyObjectStore");

    let dataList = document.getElementById('data-list');

    const getAll = store.getAll();

    while (dataList.firstChild) {
        dataList.removeChild(dataList.firstChild);
    }

    getAll.onsuccess = () => {
        for (let id of getAll.result) {

            let isFound = false;

            for (let field of fieldNames) {
                if (search == null || search === '' || ((String)(id.data[field])).includes(search)) {
                    isFound = true;
                    break;
                }
            }

            if (!isFound) {
                continue;
            }

            let tr = document.createElement('tr');

            for (let field of fieldNames) {
                let td = document.createElement('td');

                let value = id.data[field] === undefined ? '' : id.data[field];

                td.setAttribute('title', value);
                let newContent = document.createTextNode(value);
                td.appendChild(newContent);
                tr.appendChild(td);
            }


            let editButton = document.createElement('button');
            editButton.onclick = () => loadToEdit(id.id);
            editButton.appendChild(document.createTextNode('Load'));

            let deleteButton = document.createElement('button');
            deleteButton.onclick = () => deleteElement(id.id);
            deleteButton.appendChild(document.createTextNode('x'));

            let buttonTd = document.createElement('td');
            buttonTd.appendChild(editButton);
            buttonTd.appendChild(deleteButton);


            tr.appendChild(buttonTd);

            tr.onclick = () => loadToEdit(id.id);
            dataList.appendChild(tr);
        }

    };

}

function deleteElement(id) {
    let db = open.result;

    let tx = db.transaction("MyObjectStore", "readwrite");

    let store = tx.objectStore("MyObjectStore");

    store.delete(id);

    tx.oncomplete = () => {
        loadData();
    };
}

function loadToEdit(id) {
    let db = open.result;

    let tx = db.transaction("MyObjectStore", "readwrite");

    let store = tx.objectStore("MyObjectStore");

    let element = store.get(id);

    element.onsuccess = () => {
        let el = element.result.data;

        let inputs = document.getElementsByClassName('form-input');
        for (let input of inputs) {
            input.value = el[input.id];
        }
    };
}
