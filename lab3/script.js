let draggingElement = null;

function initPage() {

    document.querySelectorAll('[draggable="true"]')
        .forEach(draggableElement => {
            addDraggableEvents(draggableElement);
        });
}

function addDraggableEvents(draggableElement) {
    draggableElement.addEventListener('dragstart', handleStartDrag);
    draggableElement.addEventListener('dragover', handleDragOver);
    draggableElement.addEventListener('dragenter', handleEnterDrag);
    draggableElement.addEventListener('dragleave', handleLeaveDrag);
    draggableElement.addEventListener('dragend', handleEndDrag);
    draggableElement.addEventListener('drop', handleDrop);
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
    if (dragBlock == null) {
        return;
    }

    event.preventDefault();

    let xChange = event.clientX - currentX;
    let yChange = event.clientY - currentY;

    let platform = document.getElementById('area');

    let blocks = document.querySelectorAll('.block');
    for (let block of blocks) {
        if ((block !== dragBlock && collision(dragBlock, block, yChange, xChange)) || !blockInBlock(dragBlock, platform, yChange, xChange)) {
            return;
        }
    }

    dragBlock.style.top = `${dragBlock.offsetTop + yChange}px`;
    dragBlock.style.left = `${dragBlock.offsetLeft + xChange}px`;
    currentX = event.clientX;
    currentY = event.clientY;
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

function blockInBlock(block1, block2, yChange, xChange) {
    const blockDims1 = block1.getBoundingClientRect();
    const blockDims2 = block2.getBoundingClientRect();

    let result = blockDims1.y + yChange > blockDims2.y && blockDims1.y + yChange + blockDims1.height < blockDims2.y + blockDims2.height
        && blockDims1.x + xChange > blockDims2.x && blockDims1.x + xChange + blockDims1.width < blockDims2.x + blockDims2.width;
    return result
}

function collision(block1, block2, yChange, xChange) {
    const blockDims1 = block1.getBoundingClientRect();
    const blockDims2 = block2.getBoundingClientRect();

    const isColliding = !(
        ((blockDims1.y + yChange + blockDims1.height) < (blockDims2.y)) ||
        ((blockDims1.y + yChange) > (blockDims2.y + blockDims2.height)) ||
        (((blockDims1.x + xChange) + blockDims1.width) < blockDims2.x) ||
        ((blockDims1.x + xChange) > (blockDims2.x + blockDims2.width))
    );

    return isColliding;
}

function addToList() {
    let inputList = document.getElementById('input-list');
    let inputValue = inputList.value;
    let newElement = document.createElement('li');
    const newContent = document.createTextNode(inputValue);

    let deleteButton = document.createElement('button');
    deleteButton.onclick = event => deleteElement(event);
    deleteButton.appendChild(document.createTextNode('x'));

    newElement.appendChild(newContent);
    newElement.appendChild(deleteButton);
    newElement.setAttribute('draggable', 'true');

    addDraggableEvents(newElement);

    document.getElementById('draggable-list').appendChild(newElement);
    inputList.value = null;
}

function deleteElement(event) {
    event.target.parentElement.remove();
}
