const data = [
    ['test@gamil.com', 'test2@edu.p.lodz.pl'],
    ['00-000', '23-958'],
    ['PL-123-456789-8', 'PL-185-433389-3'],
    ['ABC132456', 'EKG985587'],
    ['125.98.0.63', '255.8.60.77'],
    ['https://www.google.com/', 'https://www.microsoft.com/pl-pl'],
    ['C:\\windows\\temp', 'd:\\msdos'],
    ['/etc/passwd', '/etc/hosts'],
    ['4344:1bba:bfb9:5d94:cbdd:80bb:b523:e823', '89e1:53a6:7a2a:e1d0:05f3:dc78:4fb9:22de'],
    ['997', '+48 555 666 777'],
];


function fillData() {
    let a = document.getElementsByTagName('input');
    for (let i = 0; i < a.length; i++) {
        a[i].value = data[i][randomInt()];
    }
}

function randomInt() {
    return Math.floor(Math.random() * (2));
}
