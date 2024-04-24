const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const downloadButton = document.getElementById("downloadButton");
const lineWidthSlider = document.getElementById("lineWidthSlider");

let isDrawing = false;
let startX, startY; // Variables to store initial cursor position
let lastX, lastY; // Variables to store last drawn position

const undoKey = 'z'; // Key for undo
const redoKey = 'y'; // Key for redo
const undoStack = []; // Stack to store drawn paths for undo
const redoStack = []; // Stack to store undone paths for redo

const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

lineWidthSlider.addEventListener('input', (event) => {
    const lineWidth = event.target.value;
    ctx.lineWidth = lineWidth; // Update the line width of the canvas context
    document.getElementById('lineWidthValue').textContent = lineWidth; // Update the line width value displayed in the span
});


canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // Check if left mouse button is pressed
        isDrawing = true; // Start drawing
        startX = event.offsetX;
        startY = event.offsetY;
        lastX = event.offsetX;
        lastY = event.offsetY;
        currentPath = [{ x: lastX, y: lastY }];
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;
        currentPath.push({ x: lastX, y: lastY });
    }
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing) {
        isDrawing = false;
        undoStack.push(currentPath); // Push the drawn path onto the undo stack
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

canvas.addEventListener('click', (event) => {
    isDrawing = !isDrawing; // Toggle drawing state

    if (isDrawing) {
        // If drawing is enabled, start drawing from the click position
        lastX = event.offsetX;
        lastY = event.offsetY;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        isDrawing = false; // Stop drawing if Escape key is pressed
    }
    else if (event.key === undoKey && event.ctrlKey && undoStack.length > 0) {
        // Undo: Pop the last drawn path from the stack
        const lastPath = undoStack.pop();
        redoStack.push(lastPath); // Push the undone path to the redo stack
        redrawCanvas();
    } else if (event.key === redoKey && event.ctrlKey && redoStack.length > 0) {
        // Redo: Pop the last undone path from the stack
        const lastRedoPath = redoStack.pop();
        undoStack.push(lastRedoPath); // Push the redone path back to the undo stack
        redrawCanvas();
    }
});

function redrawCanvas() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw all paths in the undo stack
    undoStack.forEach(path => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
    });
}


//Clear Button
clearButton.addEventListener('click', () => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
});

//Download Button
downloadButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    // Create a new <a> element
    let link = document.createElement('a');

    // Set the download attribute and the href attribute of the <a> element
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();

    // Dispatch a click event on the <a> element
    link.click();
});
