"use strict";


const _dot = (x, y, fill = '') => $(`
        <svg class="dot" height="8" width="8" x="${x}" y="${y}" fill="${fill}">
            <circle cx="3" cy="3" r="2" />
        </svg>
    `);

function _plot(x, y, fill, remove = true) {
    const point = _dot(x, y, fill);
    $('#DotCanvas').append(point);
    if (remove) {
        setTimeout(() => {
            point.remove();
        }, 2000);
    }
}

const _toRadians = angle => (angle * (Math.PI / 180));

/**
 * Helper function to get (X, Y) coordinates for 1 point in a circle - given an angle, and a radius.
 * @param angle
 * @param radius
 * @returns {{x: number, y: number}}
 * @private
 */
function _getCircleXY (angle, radius) {
    angle = _toRadians(angle);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {x, y};
}

/**
 * Plots a circle by calculating Y and steadily incrementing X. Because of this
 * the circle is denser at the top and bottom and lighter on the sides.
 * @param Ux
 * @param Uy
 */
function drawCircleBasedOnX (Ux, Uy) {
    Ux = Ux - 50;

    for (let x=-50; x<= 50; x++) {
        const y = Math.sqrt((50*50) - (x*x));
        const currX = Ux + x;

        _plot(currX, (Uy + y));
        _plot(currX, (Uy - y));
    }
}

/**
 * Draws a full circle of radius 'rad' around the top and left offsets you specify.
 * @param OffsetX - offset from side
 * @param OffsetY - offset from top
 * @param rad - the radius of the circle
 */
function drawCircle (OffsetX, OffsetY, rad, fill) {
    console.log('do circle', rad)
    rad = rad || 200;

    for (let angle = 0; angle <=360; angle += 10) {
        const XY = _getCircleXY(angle, rad);
        _plot((OffsetX + XY.x), (OffsetY + XY.y), fill);
    }
}

function _drawCircleDotByDot (OffsetX, OffsetY, radius, fill, callback) {
    let angle = 0;
    const rad = radius || 200;

    function _draw () {

        if (angle < 360) {
            const XY = _getCircleXY(angle, rad);
            _plot((OffsetX + XY.x), (OffsetY + XY.y), fill);
            angle += 10;
            setTimeout(() => {
                _draw(OffsetX, OffsetY);
            }, 5);

        } else {
            angle = 0;
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    _draw();
}

function _arrToColor(arr) {
    return '#' + arr
        .map(int => Number(int).toString(16))
        .join('');
};

function initialRandomColor() {
    const colorArr = [0, 0, 0].map(z => 100 + Math.floor(Math.random() * 80));
    const idx = Math.floor(Math.random() * 3);
    colorArr[idx] += 80; // make the starting color brighter
    colorArr[idx] = colorArr[idx] >= 255 ? 255 : colorArr[idx];
    return colorArr;
}

function lightenColor(colorArr, increment = 30) {
    // colors increasingly get lighter
    return colorArr.map(int => (int >= (255 - increment)) ? int : int + increment);
}

function drawFireWork(x, y, rad = 0, colorArr = initialRandomColor()) {
    console.log('firework')
    rad = rad + 5;
    drawCircle(x, y, rad, _arrToColor(colorArr));
    if (rad <= 80) {
        setTimeout(() => {
            drawFireWork(x, y, rad, lightenColor(colorArr, 10));
        }, 5);
    }
}

function drawRadiatingCircles (x, y, rad = 50, colorArr = initialRandomColor()) {
    rad = rad + 5;
    _drawCircleDotByDot(x, y, rad, _arrToColor(colorArr), () => {
        if (rad <= 80) {
            drawRadiatingCircles(x, y, rad, lightenColor(colorArr));
        }
    });
};

/**
 *
 * @param OffsetX - offset from side
 * @param OffsetY - offset from top
 * @param rad - radius
 * @param top - boolean - true for top, false for bottom. Defaults to false.
 */
function drawHalfCircle (OffsetX, OffsetY, rad, top) {
    rad = rad || 50;
    top = top || false;

    for (let angle = 0; angle <= 180; angle += 10) {
        const XY = _getCircleXY(angle, rad);

        if (top) {
            XY.y = XY.y >= 0 ? (XY.y * -1) : XY.y;
        } else {
            XY.y = Math.abs(XY.y);
        }

        _plot((OffsetX + XY.x), (OffsetY + XY.y));
    }
}

/**
 * Draws a face on the document using half circle and full circle draw functions.
 */
function drawFace () {
    const center = $('body').width() / 2;
    drawCircle(center - 165 , 100, 30);
    drawCircle(center - 165, 100, 5);
    drawCircle(center + 165, 100, 30);
    drawCircle(center + 165, 100, 5);
    drawHalfCircle(center, 200, 200, false);
}

module.exports = {
    drawFace,
    drawHalfCircle,
    drawCircle,
    drawCircleBasedOnX,
    drawRadiatingCircles,
    drawFireWork
};