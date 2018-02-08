"use strict";

const {drawFace, drawRadiatingCircles} = require('./circle');
const charCodeSequence = require('char-code-sequence');
// const konami = require('konami-letters');
const xPattern = require('konami-letters/src/patterns/letter_x');

document.addEventListener("DOMContentLoaded", function() {

    // set up moving space ship.
    let done = false;

    function _animate() {
        done = !done;
        const pos = done ? '+=300':  '0';

        $( ".move" ).animate({
            left: pos
        }, 5000, function () {
            _animate();
        });
    }

    _animate();

    // set up circle functions
    $('body').click(function (e) {
        drawRadiatingCircles(e.pageX, e.pageY);
    });

    const nameArr = [ 114, 111, 110, 32, 119, 105, 108, 108, 105, 97, 109, 115];

    const findMatch = charCodeSequence(nameArr, drawFace); // my name
    // const findMatch = charCodeSequence([49, 50, 49, 50, 51], drawFace); // 1, 2, 1, 2, 3

    findMatch.onChange(({ currArr }) => console.log(currArr.map(code => String.fromCharCode(code))));

    // konami(null, xPattern);
});

