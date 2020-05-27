angular
    .module('playerApp')
    .constant('MAX_WAITING_TIME', 1e3)
    .constant('MAX_FADEOUT_TIME', 2e3)
    .constant('CLICK_ELEMENT_SIZE', 10)
    .factory('UserClick', [
        'CLICK_ELEMENT_SIZE',
        'MAX_WAITING_TIME',
        'MAX_FADEOUT_TIME',
        function(a, b, c) {
            function d(b, c) {
                var d = document.createElement('div');
                return $(d).css({ top: b - a / 2 + 'px', left: c - a / 2 + 'px' }), $(d).css(g), d;
            }
            function e(a) {
                var c = a.totalPlayingTime;
                return c < b ? b - c : 0;
            }
            function f(a) {
                var d = a.totalPlayingTime - b;
                return d < c ? c - d : 0;
            }
            var g = {
                    background: 'red',
                    borderRadius: '50%',
                    width: a + 'px',
                    height: a + 'px',
                    position: 'absolute',
                    'z-index': 20,
                    '-moz-border-radius': '10px',
                    '-webkit-border-radius': '10px',
                },
                h = function(a, b) {
                    (this.element = d(a, b)), (this.lastActive = new Date().getTime()), (this.totalPlayingTime = 0);
                };
            return (
                (h.prototype.startAnimation = function(a, b) {
                    var c = this,
                        d = e(c);
                    d > 0 && $(c.element).animate({ opacity: 1 }, d / a);
                    var g = f(c);
                    $(c.element).fadeOut(g / a, function(a) {
                        b(c), $(this).remove();
                    }),
                        (c.lastActive = new Date().getTime());
                }),
                (h.prototype.stopAnimation = function() {
                    var a = this;
                    $(a.element)
                        .stop()
                        .stop();
                    var b = new Date().getTime();
                    a.totalPlayingTime = b - a.lastActive;
                }),
                (h.prototype.remove = function() {
                    var a = this;
                    $(a.element).remove();
                }),
                h
            );
        },
    ]);
