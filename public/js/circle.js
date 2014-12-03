(function () {
    "use strict";

    function _plot(x, y) {
        var point = $('<div>').text('.').css({
            position : 'absolute',
            left : x,
            top : y
        });
        $('body').append(point);
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


    function drawCircle (Ux, Uy, rad) {
        var rad = rad || 50;

        for (var angle = 0; angle <=360; angle+=10) {
            var x = Math.cos(angle) * rad;
            var y = Math.sin(angle) * rad;

            _plot((Ux + x), (Uy + y));
            _plot((Ux + x), (Uy - y));
        }
    }


    $(document).ready(function () {
        $('body').click(function (e) {
            var x = e.pageX;
            var y = e.pageY;
            drawCircle(x, y);
        });
    });

})();
