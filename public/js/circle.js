"use strict";


const _dot = (x, y) => $(`
        <svg class="dot" height="8" width="8" x="${x}" y="${y}">
            <circle cx="3" cy="3" r="2" />
        </svg>
    `);

function _plot(x, y) {
    const point = _dot(x, y);
    $('#DotCanvas').append(point);
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
function drawCircle (OffsetX, OffsetY, rad) {
    rad = rad || 200;

    for (let angle = 0; angle <=360; angle += 10) {
        const XY = _getCircleXY(angle, rad);
        _plot((OffsetX + XY.x), (OffsetY + XY.y));
    }
}

function drawCircleDotByDot (OffsetX, OffsetY) {
    let angle = 0;

    function _draw () {
        const rad = 200;

        if (angle < 360) {
            const XY = _getCircleXY(angle, rad);
            _plot((OffsetX + XY.x), (OffsetY + XY.y));
            angle += 10;
            setTimeout(() => {
                _draw(OffsetX, OffsetY);
            }, 15);

        } else {
            angle = 0;
        }
    }

    _draw();
}

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
    drawCircleDotByDot,
    drawCircle,
    drawCircleBasedOnX
};