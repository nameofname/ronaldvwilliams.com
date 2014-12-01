(function () {
    "use strict";

    function _plot(x, y) {
        x = x + 100; y = y + 100;
        var point = $('<div>').text('.').css({
            position : 'absolute',
            left : x,
            top : y
        });
        $('body').append(point);
    }

    /**
     * Plots a circle around the user's mouse. 
     * @param Ux
     * @param Uy
     */
    function drawCircle (Ux, Uy) {
        var y;
        Ux = Ux - 50;

        for (var x=-50; x<= 50; x++) {
            y = Math.sqrt((50*50) - (x*x));
            var currX = Ux + x;

            _plot(currX, (Uy + y));
            _plot(currX, (Uy - y));
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
