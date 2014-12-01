$(document).ready(function () {
    var done = false;

    function _animate() {
        done = !done;
        var pos = done ? '+=300':  '0';

        $( ".move" ).animate({
            left: pos
        }, 5000, function () {
            _animate();
        });
    }

    _animate();
});

