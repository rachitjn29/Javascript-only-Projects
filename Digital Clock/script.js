const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const period = document.getElementById("period");

setInterval(() => {

    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    period.innerHTML = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12;

    hrs.innerHTML = String(h).padStart(2, "0");
    min.innerHTML = String(m).padStart(2, "0");
    sec.innerHTML = String(s).padStart(2, "0");

}, 1000);