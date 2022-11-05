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
}

function handleEndDrag(event) {
}

function handleEnterDrag(event) {
}

function handleLeaveDrag(event) {
}

function handleDragOver(event) {

}

function handleDrop(event) {

}

