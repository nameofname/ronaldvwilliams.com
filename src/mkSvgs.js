"use strict";

const path = require('path');
const fs = require('fs');
const rocketSvg = fs.readFileSync(path.join(__dirname, '../views/partials/svg-rocket.ejs'), { encoding: 'utf8'});
const toBoldSVG = require('text-to-svg').loadSync(path.join(__dirname, './fonts/helveticaneue.otf'));
const toThinSVG = require('text-to-svg').loadSync(path.join(__dirname, './fonts/helveticaneue-thin.otf'));
const toNormalSVG = require('text-to-svg').loadSync(path.join(__dirname, './fonts/helveticaneue-normal.otf'));

const used = {};
function titleSvg(string) {
    const lower = string.toLowerCase();
    const idx = used[lower] ? ++used[lower] : 1;
    used[lower] = idx;
    const className = ` name name-${lower}-${idx}`;
    return toBoldSVG.getSVG(string, {
        x: 0, y: 0, fontSize: 35, anchor: 'top', 
        attributes: {
            fill: '#333',
            class: className
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

function open(klass = '') { console.log(`<div class="svg-container ${klass}">`) };
function close() { console.log('</div>') };

const nameSvgs = "Ron Williams".split('').map((s, idx) => titleSvg(s, () => ` name name-${s.toLowerCase()}-${idx}`))
const helloSvgs = [..."Hi I'm ".split('').map(s => titleSvg(s)), ...nameSvgs, ...' !'.split('').map(s => titleSvg(s))];
const leadSvg = thinSvg("I'm better at web development than you!", 21);
const tinySvg = normalSvg("(there is no real basis for this claim other than my own assertion but...)");
const trueSvg = normalSvg("IT'S TRUE", 21);
const proofSvg = normalSvg("Need proof? Well look at this javascript! Doing things!");
const pewSvg = normalSvg("Pew pew pew! Rocket.");
const moreSvg = normalSvg("More proof? Try typing my name, or click anywhere.");

open('header');
console.log(helloSvgs.join(''));
close();open();
console.log(leadSvg);
close();open();
console.log(tinySvg);
close();open();
console.log(trueSvg);
close();open();
console.log(proofSvg);
close();console.log("<div class='move'>")
console.log(rocketSvg);
close();open();
console.log(pewSvg);
close();open();
console.log(moreSvg);
close();
