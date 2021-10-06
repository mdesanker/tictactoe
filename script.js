// script.js //
'use strict';

// Player factory function
const Player = sign => {
    this.sign = sign;
    const getSign = () => {
        return sign;
    };
    return { getSign };
};

// Gameboard module controls modification of gameboard
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getSign = index => {
        return board[index];
    };

    const setSign = (index, sign) => {
        if (board[index] === '') {
            board[index] = sign;
        }
    };

    const reset = () => {
        board.forEach((_, key) => {
            board[key] = '';
        });
    };

    return { getSign, setSign, reset, board };
})();

// Display controller module controls screen and gameplay
const DisplayController = (() => {
    const boardUnits = document.querySelectorAll('.board-unit');
    const messageOutput = document.querySelector('.message');
    const resetBtn = document.querySelector('.reset');
    let round = 1;
    let gameIsOn = true;

    const playerX = Player('X');
    const playerO = Player('O');

    boardUnits.forEach(unit => {
        unit.addEventListener('click', e => {
            if (e.target.textContent === '' && gameIsOn) {
                let currentIndex = parseInt(unit.dataset.index);
                Gameboard.setSign(currentIndex, getCurrentPlayerSign(round));
                checkWinner(currentIndex);
                updateGameboard();
            }
            if (round !== 9 && gameIsOn) {
                round++;
                displayMessage(
                    `Player ${getCurrentPlayerSign(round)}\'s turn:`
                );
            }
        });
    });

    const checkWinner = index => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Draw
        if (round === 9) {
            gameIsOn = false;
            displayMessage('The game is a draw!');
        }

        // Filter down to relevant winning conditions
        let relevant = winningConditions.filter(condition =>
            condition.includes(index)
        );
        console.log(relevant);
        // Loop through each relevant condition
        relevant.forEach(condition => {
            console.log(condition);
            // Map signs to array
            let signs = condition.map(val => Gameboard.getSign(val));
            console.log(signs);
            // Check all signs are identical
            if (signs.every((val, _, arr) => val === arr[0])) {
                gameIsOn = false;
                displayMessage(
                    `Player ${getCurrentPlayerSign(round)} is the winner!`
                );
            }
        });
    };

    const reset = () => {
        Gameboard.reset();
        round = 1;
        gameIsOn = true;
        updateGameboard();
        displayMessage(`Player ${getCurrentPlayerSign(round)}\'s turn:`);
    };

    resetBtn.addEventListener('click', reset);

    const getCurrentPlayerSign = round =>
        round % 2 === 1 ? playerX.getSign() : playerO.getSign();

    const updateGameboard = () => {
        boardUnits.forEach((unit, index) => {
            unit.textContent = Gameboard.getSign(index);
        });
    };

    const displayMessage = message => {
        messageOutput.textContent = message;
    };

    return { checkWinner };
})();
