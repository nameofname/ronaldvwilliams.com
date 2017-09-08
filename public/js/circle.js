"use strict";

(function () {

    const _dot = (x, y) => $(`
        <svg height="8" width="8" x="${x}" y="${y}">
            <circle cx="3.5" cy="3.5" r="3.5" />
        </svg>
    `);

    function _plot(x, y) {
        const point = _dot(x, y);
        $('#DotCanvas').append(point);
    }


    /**
     * Helper function to get (X, Y) coordinates for 1 point in a circle - given an angle, and a radius.
     * @param angle
     * @param radius
     * @returns {{x: number, y: number}}
     * @private
     */
    function _getCircleXY (angle, radius) {
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
    function drawCircle_basedOnX (Ux, Uy) {
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
        rad = rad || 100;

        for (let angle = 0; angle <=360; angle += 10) {
            const XY = _getCircleXY(angle, rad);
            _plot((OffsetX + XY.x), (OffsetY + XY.y));
        }
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

        for (let angle = 0; angle <= 360; angle += 10) {
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
        // TODO ! plan the face in the middle of the page regardless of page width / height.
        const center = $('body').width() / 2;
        drawCircle(center - 165 , 100, 30);
        drawCircle(center - 165, 100, 5);
        drawCircle(center + 165, 100, 30);
        drawCircle(center + 165, 100, 5);
        drawHalfCircle(center, 200, 200, false);
    }


    // Set up event binding to draw a circle every time the user clicks the document.
    $(document).ready(function () {
        $('body').click(function (e) {
            drawCircle(e.pageX, e.pageY);
        });
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

})();
