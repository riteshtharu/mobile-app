document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll('.cell');
    const oWinElement = document.getElementById("o_win");
    const xWinElement = document.getElementById("x_win");
    const resetButton = document.getElementById("reset");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let xWins = 0;
    let oWins = 0;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                highlightWinner(combo);
                return gameBoard[a];
            }
        }
        return gameBoard.includes("") ? null : "Tie";
    }

    function highlightWinner(combo) {
        combo.forEach(index => {
            cells[index].classList.add("winner");
        });
    }

    function updateScores(winner) {
        if (winner === "X") {
            xWins++;
            xWinElement.textContent = xWins;
        } else if (winner === "O") {
            oWins++;
            oWinElement.textContent = oWins;
        }
    }

    function resetGame(resetScores = false) {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
            cell.classList.remove("disable");
        });

        if (resetScores) {
            xWinElement.textContent = "0";
            oWinElement.textContent = "0";
            xWins = 0; 
            oWins = 0; 
        }
    }

    function handleClick(event) {
        const index = Array.from(cells).indexOf(event.target);

        if (gameBoard[index] === "" && !event.target.classList.contains("disable")) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add("disable");

            const winner = checkWinner();
            if (winner) {
                if (winner !== "Tie") {
                    alert(`${winner} wins!`);
                    updateScores(winner);  
                } else {
                    alert("It's a tie!");
                }
                resetGame(); 
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    resetButton.addEventListener("click", function () {
        resetGame(true); 
    });
});
