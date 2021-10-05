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
    // Code here
})();
