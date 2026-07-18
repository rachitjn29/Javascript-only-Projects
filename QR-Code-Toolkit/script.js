const generatorBtn = document.getElementById("generatorBtn");
const scannerBtn = document.getElementById("scannerBtn");

const generatorSection = document.getElementById("generatorSection");
const scannerSection = document.getElementById("scannerSection");

const qrInput = document.getElementById("qrInput");
const qrBox = document.getElementById("qrBox");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const size = document.getElementById("size");
const color = document.getElementById("color");

let qr = null;

generatorBtn.addEventListener("click", () => {

    generatorBtn.classList.add("active");
    scannerBtn.classList.remove("active");

    generatorSection.classList.remove("hide");
    scannerSection.classList.add("hide");

});

scannerBtn.addEventListener("click", () => {

    scannerBtn.classList.add("active");
    generatorBtn.classList.remove("active");

    scannerSection.classList.remove("hide");
    generatorSection.classList.add("hide");

});

generateBtn.addEventListener("click", () => {
    generateQR();
});

function generateQR() {

    const text = qrInput.value.trim();

    if (text === "") {
        alert("Enter text or URL");
        return;
    }

    qrBox.innerHTML = "";

    qr = new QRCode(qrBox, {
        text: text,
        width: Number(size.value),
        height: Number(size.value),
        colorDark: color.value,
        colorLight: "#ffffff"
    });

}

clearBtn.addEventListener("click", () => {

    qrInput.value = "";
    qrBox.innerHTML = "";

});

downloadBtn.addEventListener("click", () => {

    const img = qrBox.querySelector("img");
    const canvas = qrBox.querySelector("canvas");

    let url = "";

    if (img) {
        url = img.src;
    } else if (canvas) {
        url = canvas.toDataURL();
    } else {
        alert("Generate QR First");
        return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
});




const startScanner = document.getElementById("startScanner");
const stopScanner = document.getElementById("stopScanner");

const imageInput = document.getElementById("imageInput");

const result = document.getElementById("result");

const copyBtn = document.getElementById("copyBtn");
const openBtn = document.getElementById("openBtn");

let scanner = null;

startScanner.addEventListener("click", startCamera);
async function startCamera() {

    if (scanner) return;
    scanner = new Html5Qrcode("reader");
    try {
        await scanner.start(
            {
                facingMode: "environment"
            },

            {
                fps: 10,
                qrbox: 250
            },
            success,

            error => { }
        );

    } catch (err) {
        alert("Camera Not Available");
    }
}

stopScanner.addEventListener("click", async () => {
    if (!scanner) return;
    await scanner.stop();
    await scanner.clear();
    scanner = null;
});


function success(decodedText) {
    result.value = decodedText;
}

imageInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const htmlScanner = new Html5Qrcode("readerFile");
    try {
        const text = await htmlScanner.scanFile(file, true);
        result.value = text;
    } catch {
        result.value = "";
        imageInput.value = "";
        document.getElementById("readerFile").innerHTML = "";
        alert("QR Not Found");
    }
});



copyBtn.addEventListener("click", () => {
    if (result.value === "") {
        alert("Nothing To Copy");
        return;
    }
    navigator.clipboard.writeText(result.value);
    alert("Copied");
});


openBtn.addEventListener("click", () => {
    const text = result.value.trim();
    if (text === "") return;
    window.open(text, "_blank");
});