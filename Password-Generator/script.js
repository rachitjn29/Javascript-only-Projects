const password = document.getElementById("password");
const length = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");
const toast = document.getElementById("toast");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "@#$&";

function generatePassword() {
    let chars = "";

    if (uppercase.checked) chars += upperChars;
    if (lowercase.checked) chars += lowerChars;
    if (numbers.checked) chars += numberChars;
    if (symbols.checked) chars += symbolChars;

    if (chars === "") {
        alert("Select at least one option!");
        return;
    }

    let pass = "";

    for (let i = 0; i < Number(length.value); i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        pass += chars[randomIndex];
    }

    password.value = pass;
    checkStrength();
}

function checkStrength() {
    let score = 0;

    if (
    !uppercase.checked &&
    !lowercase.checked &&
    !numbers.checked &&
    !symbols.checked
){
    strengthText.textContent = "Select Options";
    strengthText.style.color = "#94a3b8";
    strengthFill.style.width = "0%";
    strengthFill.style.background = "#334155";
    return;
}

    if (uppercase.checked) score++;
    if (lowercase.checked) score++;
    if (numbers.checked) score++;
    if (symbols.checked) score++;

    if (score === 1) {
    strengthText.textContent = "Weak";
    strengthText.style.color = "#ef4444";
    strengthFill.style.width = "25%";
    strengthFill.style.background = "#ef4444";
}
else if (score <= 3) {
    strengthText.textContent = "Medium";
    strengthText.style.color = "#f59e0b";
    strengthFill.style.width = "65%";
    strengthFill.style.background = "#f59e0b";
}
else {
    strengthText.textContent = "Strong";
    strengthText.style.color = "#22c55e";
    strengthFill.style.width = "100%";
    strengthFill.style.background = "#22c55e";
}
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
    if (password.value === "") return;

    navigator.clipboard.writeText(password.value);

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
});

length.addEventListener("input", checkStrength);

uppercase.addEventListener("change", checkStrength);
lowercase.addEventListener("change", checkStrength);
numbers.addEventListener("change", checkStrength);
symbols.addEventListener("change", checkStrength);

password.value = "";
checkStrength();