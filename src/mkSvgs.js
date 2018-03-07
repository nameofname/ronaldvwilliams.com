"use strict";

const path = require('path');
const toBoldSVG = require('text-to-svg').loadSync(path.join(__dirname, './fonts/helveticaneue.otf'));
const toThinSVG = require('text-to-svg').loadSync(path.join(__dirname, './fonts/helveticaneue-thin.otf'));
const toNormalSVG = require('text-to-svg').loadSync(path.join(__dirname, './fonts/helveticaneue-normal.otf'));


function titleSvg(string) {
    return toBoldSVG.getSVG(string, {
        x: 0, y: 0, fontSize: 35, anchor: 'top', 
        attributes: {
            fill: '#333',
            class: `name name-${string}`
        }
    });
}

function thinSvg(string, fontSize) {
    return toThinSVG.getSVG(string, {
        x: 0, y: 0, fontSize, anchor: 'top', 
        attributes: {
            fill: '#333',
            "stroke-width": 0.3,
            stroke: 'black'
        }
    });
}

function normalSvg(string, fontSize = 14) {
    return toNormalSVG.getSVG(string, {
        x: 0, y: 0, fontSize, anchor: 'top', 
        attributes: {
            fill: '#333'
        }
    });
}

function open() { console.log('<div class="svg-container">') };
function close() { console.log('</div>') };


const helloSvgs = ["Hi I'm ", ..."Ron Williams".split(''), ' !' ].map(titleSvg);
const leadSvg = thinSvg("I'm better at web development than you!", 21);
const tinySvg = normalSvg("(there is no real basis for this claim other than my own assertion but...)");
const trueSvg = normalSvg("IT'S TRUE", 21);
const proofSvg = normalSvg("Need proof? Well look at this javascript! Doing things!");
const pewSvg = normalSvg("Pew pew pew! Rocket.");
const moreSvg = normalSvg("More proof? Try typing my name, the konami code, or click anywhere.");

open();
console.log(helloSvgs.join(''));
close();open();
console.log(leadSvg);
close();open();
console.log(tinySvg);
close();open();
console.log(trueSvg);
close();open();
console.log(proofSvg);
close();open();
console.log(pewSvg);
close();open();
console.log(moreSvg);
close();
