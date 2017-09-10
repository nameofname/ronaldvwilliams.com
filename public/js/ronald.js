"use strict";

const {drawFace, drawCircleDotByDot} = require('./circle');
const konami = require('konamiLetters');
const keyTracker = require('konamiLetters/dist/keyTracker');

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

    keyTracker([49, 50,51], drawFace); // 1, 2, 3

    konami(null, null, '.dot');

});

