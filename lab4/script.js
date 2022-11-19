const data = [
    ['test@gamil.com', 'test2@edu.p.lodz.pl'],
    ['00-000', '23-958'],
    ['PL-123-456789-8', 'PL-185-433389-3'],
    ['ABC132456', 'EKG985587'],
    ['125.98.0.63', '255.8.60.77'],
    ['https://www.google.com/', 'https://www.microsoft.com/pl-pl'],
    ['C:\\windows\\temp', 'd:\\msdos'],
    ['C:\\WinDows\\temp', 'd:\\msdOs'],
    ['/etc/passwd', '/etc/hosts'],
    ['4344:1bba:bfb9:5d94:cbdd:80bb:b523:e823', '89e1:53a6:7a2a:e1d0:05f3:dc78:4fb9:22de'],
    ['997', '+48 555 666 777'],
    ['2022-10-22', '2022-10-30'],
    [getCurrentWeekFriday(), getCurrentWeekMonday()],
    ['10:22AM', '12:34PM'],
    ['01:44', '19:55'],
    ['#e62b31', '#34efc3'],
];


function fillData() {
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = data[i][randomInt()];
    }
}

function randomInt() {
    return Math.floor(Math.random() * (2));
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

function getFormattedDate(date){
    return date.toISOString().split('T')[0];
}
