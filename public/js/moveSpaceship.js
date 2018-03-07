"use strict";

let animateRight = false;
function moveSpaceship() {
    animateRight = !animateRight;
    $( ".move" ).animate({ left: (animateRight ? '+=300':  '0') }, 5000, moveSpaceship);
}

module.exports = moveSpaceship;