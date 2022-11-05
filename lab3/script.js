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

    event.target.classList.remove('dragging-over');

    draggingElement = null;
}

