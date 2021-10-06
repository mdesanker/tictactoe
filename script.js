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

const playerX = Player('X');
console.log(playerX.getSign());

// Gameboard module controls modification of gameboard
const Gameboard = (() => {
    let board = ['', 'X', '', '', '', 'O', '', '', ''];

    const getSign = index => {
        return board[index];
    };

    const addSign = (index, sign) => {
        if (board[index] === '') {
            board[index] = sign;
        }
    };

    const reset = () => {
        board.forEach((_, key) => {
            board[key] = '';
        });
    };

    return { getSign, addSign, reset, board };
})();

// Display controller module controls screen and gameplay
const DisplayController = (() => {
    const boardUnits = document.querySelectorAll('.board-unit');
    const message = document.querySelector('.message');
    const resetBtn = document.querySelector('.reset');
    let round = 1;
    let gameIsOn = true;

    const playerX = Player('X');
    const playerO = Player('O');

    boardUnits.forEach(unit => {
        unit.addEventListener('click', e => {
            if (e.target.textContent === '' && gameIsOn) {
                console.log(unit.dataset.index);
                Gameboard.addSign(
                    unit.dataset.index,
                    getCurrentPlayerSign(round)
                );
                updateGameboard();
            }
            round++;
        });
    });

    const getCurrentPlayerSign = round =>
        round % 2 === 1 ? playerX.getSign() : playerO.getSign();

    const updateGameboard = () => {
        boardUnits.forEach((unit, index) => {
            unit.textContent = Gameboard.getSign(index);
        });
    };
})();
