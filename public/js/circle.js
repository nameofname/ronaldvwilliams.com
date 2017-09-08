(function () {
    "use strict";

    function _plot(x, y) {
        var point = $('<div>').text('.').css({
            position : 'absolute',
            left : x,
            top : y
        }).css('font-size', 20).addClass('dot');
        $('body').append(point);
    }


    /**
     * Helper function to get (X, Y) coordinates for 1 point in a circle - given an angle, and a radius.
     * @param angle
     * @param radius
     * @returns {{x: number, y: number}}
     * @private
     */
    function _getXY (angle, radius) {
        var x = Math.cos(angle) * radius;
        var y = Math.sin(angle) * radius;
        return {
            x : x,
            y : y
        };
    }

    /**
     * Plots a circle around the user's mouse. --- works by calculating Y and steadily incrementing X. Because of this
     * the circle is denser at the top and bottom and lighter on the sides.
     * @param Ux
     * @param Uy
     */
    function drawCircle_basedOnX (Ux, Uy) {
        var y;
        Ux = Ux - 50;

        for (var x=-50; x<= 50; x++) {
            y = Math.sqrt((50*50) - (x*x));
            var currX = Ux + x;

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
        var rad = rad || 50;

        for (var angle = 0; angle <=360; angle++) {
            var XY = _getXY(angle, rad);
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
        var rad = rad || 50;
        top = top || false;

        for (var angle = 0; angle <= 360; angle++) {
            var XY = _getXY(angle, rad);

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
            var x = e.pageX;
            var y = e.pageY;
            drawCircle(x, y);
        });
    });


    // Set up event binding to draw a face every time the user types in 1, 2, 3
    var curArr = [];
    $(document).on('keypress', function (e) {

        var keyArr = [49, 50,51];
        var currKey = keyArr[curArr.length];

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
