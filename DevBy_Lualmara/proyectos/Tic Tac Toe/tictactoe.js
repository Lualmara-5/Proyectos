// Selecionamos todas las celdas
const cells = document.querySelectorAll(".cell");

// Tablero
let board = ["", "", "", "", "", "", "", "", ""];

// Jugador Actual
let currentPlayer = "X";

// Termino la ronda?
let gameOver = false;

// Modo de Juego, Empieza en Bot
let gameMode = "bot";

let botThinking = false;

// Combinaciones Ganadoras (Basadas en posiciones del array board[0...8])
const winningCombinations = [
  [0, 1, 2], // Fila 1
  [3, 4, 5], // Fila 2
  [6, 7, 8], // Fila 3
  [0, 3, 6], // Columna 1
  [1, 4, 7], // Columna 2
  [2, 5, 8], // Columna 3
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

//
// 1. Función ¿Alguien Ganó?
//
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true; // Bloquea tablero si hay ganador

      // Clase .winner a las casillas ganadoras
      [a, b, c].forEach((index) => {
        cells[index].classList.add("winner");
      });

      return board[a]; // Devuelve "X" o "O"
    }
  }
  // Verificar empate (si no hay casillas vacías y nadie ganó)
  if (!board.includes("")) {
    gameOver = true;
    return "Empate";
  }
  return null; // Nadie Ganó Todavia
}

//
// 2. Hover y Click
//
cells.forEach((cell, movement) => {
  cell.addEventListener("mouseenter", () => {
    if (board[movement] === "" && !gameOver && !botThinking) {
      cell.classList.add(currentPlayer === "X" ? "previewX" : "previewO");
    }
  });

  cell.addEventListener("mouseleave", () => {
    cell.classList.remove("previewX", "previewO");
  });

  cell.addEventListener("click", () => {
    if (gameOver) return;
    if (board[movement] !== "") return;

    // Guardamos la jugada
    board[movement] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.remove("previewX", "previewO");

    // Revisamos si hay ganador
    const winner = checkWinner();
    if (winner) {
      endGame(winner);
      return;
    }

    // Cambiamos turno
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnBox();

    // Si es turno del bot y el modo es "bot"
    if (gameMode === "bot" && currentPlayer === "O") {
      botThinking = true; // Hover Player Chao
      setTimeout(() => {
        botMove();
        botThinking = false;
      }, 500);
    }
  });
});

//
// 3. Mensaje Ganador
//
const winnerMessage = document.getElementById("winnerMessage");
const restartBtn = document.getElementById("restartBtn");

function endGame(result) {
  if (result === "Empate") {
    winnerMessage.textContent = "Empate";
  } else {
    winnerMessage.textContent = `Ganó ${result}`;
  }
  winnerMessage.classList.remove("hidden");
}

// Reiniciar partida
function resetGame() {
  // Reiniciamos Tablero y Variables
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });

  if (gameMode === "player") {
    currentPlayer = Math.random() < 0.5 ? "X" : "O"; // aleatorio
  } else {
    currentPlayer = "X";
  }

  gameOver = false;
  updateTurnBox();

  // ocultar mensaje ganador
  winnerMessage.textContent = "";
  winnerMessage.classList.add("hidden");
}

restartBtn.addEventListener("click", resetGame);

//
// 4. Visor Turno
//
const turnX = document.getElementById("turnX");
const turnO = document.getElementById("turnO");

function updateTurnBox() {
  if (currentPlayer === "X") {
    turnX.classList.add("activeX");
    turnO.classList.remove("activeO");
  } else {
    turnO.classList.add("activeO");
    turnX.classList.remove("activeX");
  }
}

updateTurnBox();

//
// 5. Modos de Juego
//
const playerIcon = document.getElementById("playerIcon");
const botIcon = document.getElementById("botIcon");

function updateMode(selected) {
  if (selected === "player") {
    playerIcon.classList.add("active");
    botIcon.classList.remove("active");
    gameMode = "player";
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
  } else {
    botIcon.classList.add("active");
    playerIcon.classList.remove("active");
    gameMode = "bot";
    currentPlayer = "X";
  }
  updateTurnBox();
  resetGame();
}

// Inicializar en "bot"
updateMode("bot");

// Clicks en iconos
playerIcon.addEventListener("click", () => updateMode("player"));
botIcon.addEventListener("click", () => updateMode("bot"));

//
// 6. Bot
//
function botMove() {
  if (gameOver) return;

  // 1. ¿Puede el bot ganar ya?
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] === "" && board[b] === "O" && board[c] === "O") {
      return makeMove(a);
    }
    if (board[b] === "" && board[a] === "O" && board[c] === "O") {
      return makeMove(b);
    }
    if (board[c] === "" && board[a] === "O" && board[b] === "O") {
      return makeMove(c);
    }
  }

  // 2. ¿Puede ganar el jugador humano? (bloquear)
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] === "" && board[b] === "X" && board[c] === "X") {
      return makeMove(a);
    }
    if (board[b] === "" && board[a] === "X" && board[c] === "X") {
      return makeMove(b);
    }
    if (board[c] === "" && board[a] === "X" && board[b] === "X") {
      return makeMove(c);
    }
  }

  // 3. Si no, jugar en el centro si está libre
  if (board[4] === "") return makeMove(4);

  // 4. Si no, jugar al azar en cualquier celda vacía
  let emptyCells = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter((val) => val !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex);
}

// Función auxiliar para que el bot haga su jugada
function makeMove(index) {
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    endGame(winner);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnBox();
}
