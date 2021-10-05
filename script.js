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
