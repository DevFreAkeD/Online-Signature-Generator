const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const lineWidthSlider = document.getElementById("lineWidthSlider");
const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext('2d');

let isDrawing = false;

// Text Color Picker
colorPicker.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
});

// Canvas Backgroud Color Selection
canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

// Line Width Size Slider
lineWidthSlider.addEventListener('input', (event) => {
    const lineWidth = event.target.value;
    ctx.lineWidth = lineWidth; // Update the line width of the canvas context
    document.getElementById('lineWidthValue').textContent = lineWidth; // Update the line width value displayed in the span
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// On Mouse Up
canvas.addEventListener('mouseup', () => {
    if (isDrawing) {
        isDrawing = false;
    }
});

// On Mouse Move
canvas.addEventListener('mousemove', (event) => {

});

