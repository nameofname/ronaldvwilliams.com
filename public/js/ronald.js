"use strict";

const {drawFace, drawCircleDotByDot} = require('./circle');
const charCodeSequence = require('char-code-sequence');
const konami = require('konami-letters');
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
        drawCircleDotByDot(e.pageX, e.pageY);
    });

    charCodeSequence([82, 79, 78, 32, 87, 73, 76, 76, 73, 65, 77, 83], drawFace); // my name
    // charCodeSequence([49, 50, 49, 50, 51], drawFace); // 1, 2, 1, 2, 3

    konami(null, xPattern);
});

