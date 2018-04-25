"use strict";


const { drawRadiatingCircles, drawFireWork } = require('./circle');
const explodeLetters = require('./explodeLetters');
const moveSpaceShip = require('./moveSpaceShip');
const { listenKeypress, konami } = require('char-code-sequence');

document.addEventListener("DOMContentLoaded", function() {

    // set up moving space ship.
    moveSpaceShip();

    // set up circle functions
    $('body').click(function (e) {
        Math.random() < 0.5 ? drawRadiatingCircles(e.pageX, e.pageY) : drawFireWork(e.pageX, e.pageY);;
    });

    // const nameArr = [ 114, 111, 110, 32, 119, 105, 108, 108, 105, 97, 109, 115];
    const nameArr = [ 114, 111]
    const nameClassArr = ['.name-r-1', '.name-o-1', '.name-n-1', null, '.name-w-1', '.name-i-1', '.name-l-1', '.name-l-2', '.name-i-2', '.name-a-1', '.name-m-1', '.name-s-1'];
    const nameMatch = listenKeypress(nameArr, explodeLetters); // my name

    nameMatch.onChange(({ currArr }) => {
        const len = currArr.length;
        nameClassArr.forEach((klass, idx) => {
            const ele = document.querySelector(klass);
            if (ele) {
                ele.setAttribute("fill", (idx + 1) <= len ? 'red' : '#333');
            }
        });
    });

    // // for testing : 
    // const oneMatch = charCodeSequence.listenKeypress([49, 50, 49, 50, 51], () => console.log('THE ONE TWO THREE THING HAPPENED!!!!!')); // 1, 2, 1, 2, 3
    // oneMatch.onChange(({ currArr }) => {
    //     console.log('let me try it : oneArr');
    //     document.querySelector('.nav').innerText = currArr.map(letter => String.fromCharCode(letter))
    // });

    // const matchArray = [49, 50, 49, 50, 51]; // 1, 2, 1, 2, 3
    const findMatch = listenKeypress([49, 50, 49, 50, 51], (currArr) => {
        document.querySelector('body').innerText = `You typed the following : ${currArr.map(String.fromCharCode)}`;
    });
    
    findMatch.onChange(({ currArr }) => {
        console.log('one step closer : ', currArr);
    });
    
    
});


