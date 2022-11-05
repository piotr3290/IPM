let draggingElement = null;

function initPage() {

    document.querySelectorAll('[draggable="true"]')
        .forEach(draggableElement => {
            draggableElement.addEventListener('dragstart', handleStartDrag);
            draggableElement.addEventListener('dragover', handleDragOver);
            draggableElement.addEventListener('dragenter', handleEnterDrag);
            draggableElement.addEventListener('dragleave', handleLeaveDrag);
            draggableElement.addEventListener('dragend', handleEndDrag);
            draggableElement.addEventListener('drop', handleDrop);
        });
}

function handleStartDrag(event) {
    event.target.classList.add('dragging');
    draggingElement = this;
}

function handleEndDrag(event) {
    event.target.classList.remove('dragging');
}

function handleEnterDrag(event) {
    event.target.classList.add('dragging-over');
}

function handleLeaveDrag(event) {
    event.target.classList.remove('dragging-over');
}

function handleDragOver(event) {
    event.preventDefault();
    return false;
}

function handleDrop(event) {
    event.stopPropagation();
    if (draggingElement !== event.target) {
        let inputsElement = document.getElementById('draggable-list');
        inputsElement.insertBefore(draggingElement, event.target);
    }
    event.target.classList.remove('dragging-over');

    draggingElement = null;
}

function generateBlock() {
    let resp = document.getElementById('resp');
    let newBlock = document.createElement('div');
    newBlock.style.backgroundColor = randomColor();
    newBlock.classList.add('block');

    resp.appendChild(newBlock);
}

function randomColor() {
    return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

let dragBlock = null;
let currentX = null;
let currentY = null;

function startDragging(event) {
    if (!event.target.classList.contains('block')) {
        return;
    }
    dragBlock = event.target;
    dragBlock.classList.add('dragging');
    currentX = event.clientX;
    currentY = event.clientY;
}

function drag(event) {

}

function stopDragging(event) {
    if (dragBlock == null) {
        return;
    }
    dragBlock.classList.remove('dragging');
    dragBlock = null;
    currentX = null;
    currentY = null;

}
