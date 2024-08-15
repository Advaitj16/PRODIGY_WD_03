document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const undoButton = document.getElementById('undo');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let history = [];

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
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusText.textContent = `${board[a]} Wins!`;
                cells.forEach(cell => cell.removeEventListener('click', handleClick));
                return;
            }
        }
        if (!board.includes(null)) {
            statusText.textContent = "It's a Draw!";
        }
    }

    function handleClick(e) {
        const index = e.target.getAttribute('data-index');
        if (!board[index]) {
            board[index] = currentPlayer;
            history.push([...board]);
            e.target.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function restartGame() {
        board = Array(9).fill(null);
        history = [];
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleClick);
        });
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function undoMove() {
        if (history.length > 1) {
            history.pop();
            board = history[history.length - 1];
            updateBoard();
        }
    }

    function updateBoard() {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
    undoButton.addEventListener('click', undoMove);

    restartGame();
});
