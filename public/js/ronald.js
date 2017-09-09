"use strict";

const {drawFace, drawCircleDotByDot} = require('./circle');

document.addEventListener("DOMContentLoaded", function(event) {

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

    // Set up event binding to draw a face every time the user types in 1, 2, 3
    let curArr = [];
    $(document).on('keypress', function (e) {

        const keyArr = [49, 50,51];
        const currKey = keyArr[curArr.length];

        if (e.which = currKey) {
            curArr.push(currKey);
        } else {
            curArr = [];
        }

        if (curArr.length === 3) {
            drawFace();
            curArr = [];
        }
    });

});

