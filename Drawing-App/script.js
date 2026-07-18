const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const tools = document.querySelectorAll(".tool");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");

const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const clearBtn = document.getElementById("clear");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("uploadBtn");
const imageUpload = document.getElementById("imageUpload");


let tool = "pencil";
let drawing = false;
let startX = 0;
let startY = 0;
let snapshot;

let history = [];
let redoHistory = [];

saveState();

function saveState() {
    history.push(canvas.toDataURL());
    if (history.length > 30) history.shift();
    redoHistory = [];
}

canvas.width = 1100;
canvas.height = 600;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = brushSize.value;

colorPicker.addEventListener("input", () => {
    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = colorPicker.value;
});

brushSize.addEventListener("input", () => {
    ctx.lineWidth = brushSize.value;
});

tools.forEach(btn => {
    btn.addEventListener("click", () => {
        tools.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        tool = btn.dataset.tool;
    });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawingShape);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function startDraw(e) {
    drawing = true;

    const pos = getMousePos(e);

    startX = pos.x;
    startY = pos.y;

    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (tool === "pencil" || tool === "eraser") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
    }
}

function drawingShape(e) {

    if (!drawing) return;

    const pos = getMousePos(e);

    if (tool !== "pencil" && tool !== "eraser") {
        ctx.putImageData(snapshot, 0, 0);
    }

    switch (tool) {

        case "pencil":
            ctx.globalCompositeOperation = "source-over";
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            break;

        case "eraser":
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            ctx.globalCompositeOperation = "source-over";
            break;

        case "line":
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            break;

        case "rectangle":
            ctx.beginPath();
            ctx.strokeRect(
                startX,
                startY,
                pos.x - startX,
                pos.y - startY
            );
            break;

        case "circle":

            let radius = Math.sqrt(
                Math.pow(pos.x - startX, 2) +
                Math.pow(pos.y - startY, 2)
            );

            ctx.beginPath();
            ctx.arc(
                startX,
                startY,
                radius,
                0,
                Math.PI * 2
            );
            ctx.stroke();

            break;

        case "triangle":

            ctx.beginPath();

            ctx.moveTo(startX, pos.y);

            ctx.lineTo(
                (startX + pos.x) / 2,
                startY
            );

            ctx.lineTo(pos.x, pos.y);

            ctx.closePath();

            ctx.stroke();

            break;

    }

}

function stopDraw() {

    if (!drawing) return;

    drawing = false;

    ctx.beginPath();

    saveState();

}

undoBtn.addEventListener("click", () => {

    if (history.length <= 1) return;

    redoHistory.push(history.pop());

    const img = new Image();

    img.src = history[history.length - 1];

    img.onload = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);

    };

});

redoBtn.addEventListener("click", () => {

    if (!redoHistory.length) return;

    const data = redoHistory.pop();

    history.push(data);

    const img = new Image();

    img.src = data;

    img.onload = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);

    };

});

clearBtn.addEventListener("click", () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    saveState();

});

downloadBtn.addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = "drawing.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

});

uploadBtn.addEventListener("click", () => {

    imageUpload.click();

});

imageUpload.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = event => {

        const img = new Image();

        img.src = event.target.result;

        img.onload = () => {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const ratio = Math.min(
                canvas.width / img.width,
                canvas.height / img.height
            );

            const w = img.width * ratio;

            const h = img.height * ratio;

            ctx.drawImage(
                img,
                (canvas.width - w) / 2,
                (canvas.height - h) / 2,
                w,
                h
            );

            saveState();

        };

    };

    reader.readAsDataURL(file);

});