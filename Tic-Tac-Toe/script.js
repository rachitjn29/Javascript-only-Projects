const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const result = document.getElementById("result");
const gameBtn = document.getElementById("gameBtn");
const line = document.getElementById("line");

let currentPlayer = "X";
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

gameBtn.onclick = () => {
    if (!gameActive) {
        gameActive = true;
        currentPlayer = "X";
        gameState.fill("");

        turnText.innerHTML = "X";
        result.innerHTML = "";
        line.style.display = "none";
        line.style.width = "0";
        line.style.transition = "none";

        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.className = "cell";
            cell.disabled = false;
        });

        gameBtn.innerHTML = "Reset";
    } else {
        gameActive = false;
        currentPlayer = "X";
        gameState.fill("");
        turnText.innerHTML = "-";
        result.innerHTML = "";
        line.style.display = "none";
        line.style.width = "0";
        line.style.transition = "none";

        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.className = "cell";
            cell.disabled = true;
        });
        gameBtn.innerHTML = "Start Game";
    }
};

cells.forEach(cell => {
    cell.onclick = () => {
        if (!gameActive) return;
        const index = cell.dataset.index;
        if (gameState[index] != "") return;
        gameState[index] = currentPlayer;
        cell.innerHTML = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        checkWinner();
    };
});

function checkWinner() {

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[b] === gameState[c]
        ) {
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            result.innerHTML = `🎉 ${currentPlayer} Wins`;
            turnText.innerHTML = "-";
            gameActive = false;
            gameBtn.innerHTML = "Start Game";
            cells.forEach(cell => cell.disabled = true);
            return;
        }
    }

    if (!gameState.includes("")) {
        result.innerHTML = "🤝 Draw";
        turnText.innerHTML = "-";
        gameActive = false;
        gameBtn.innerHTML = "Start Game";
        cells.forEach(cell => cell.disabled = true);
        return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnText.innerHTML = currentPlayer;
}

