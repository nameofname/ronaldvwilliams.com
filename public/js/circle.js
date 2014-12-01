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


    function drawCircle () {
        var y;
        for (var x=-50; x<= 50; x++) {
            y = Math.sqrt((50*50) - (x*x));
            _plot(x, y);
            _plot(x, (y*-1));
        }
    }

    window.drawCircle = drawCircle;
})();
