"use strict";


const { drawFace, drawRadiatingCircles } = require('./circle');
const charCodeSequence = require('char-code-sequence');

function getTextNodes() {
    let node;
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    while(node = walker.nextNode()) nodes.push(node);
    return nodes;
}
  
let animateRight = false;
function _animate() {
    animateRight = !animateRight;
    $( ".move" ).animate({ left: (animateRight ? '+=300':  '0') }, 5000, _animate);
}

document.addEventListener("DOMContentLoaded", function() {

    // set up moving space ship.
    _animate();

    // set up circle functions
    $('body').click(function (e) {
        drawRadiatingCircles(e.pageX, e.pageY);
    });

    const nameArr = [ 114, 111, 110, 32, 119, 105, 108, 108, 105, 97, 109, 115];
    const nameClassArr = ['.name-r', '.name-o', '.name-n', null, '.name-w', '.name-i', '.name-l', '.name-l1', '.name-i1', '.name-a', '.name-m', '.name-s'];
    const nameMatch = charCodeSequence.listen(nameArr, drawFace); // my name

    nameMatch.onChange(({ currArr }) => {
        console.log('RONALD : nameArr');
        const len = currArr.length;
        nameClassArr.forEach((klass, idx) => {
            const ele = document.querySelector(klass);
            if (ele) {
                ele.style.color = (idx + 1) <= len ? 'red' : 'black';
            }
        });
    });

    // // for testing : 
    // const oneMatch = charCodeSequence.listen([49, 50, 49, 50, 51], () => console.log('THE ONE TWO THREE THING HAPPENED!!!!!')); // 1, 2, 1, 2, 3
    // oneMatch.onChange(({ currArr }) => {
    //     console.log('let me try it : oneArr');
    //     document.querySelector('.nav').innerText = currArr.map(letter => String.fromCharCode(letter))
    // });

    window.der = getTextNodes()
});

