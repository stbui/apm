const MAX_WAITING_TIME = 1e3;
const MAX_FADEOUT_TIME = 2e3;
const CLICK_ELEMENT_SIZE = 10;

function d(b, c) {
    var d = document.createElement('div');

    $(d).css({ top: b - CLICK_ELEMENT_SIZE / 2 + 'px', left: c - CLICK_ELEMENT_SIZE / 2 + 'px' });
    $(d).css(g);

    return d;
}
function e(a) {
    var c = a.totalPlayingTime;
    return c < MAX_WAITING_TIME ? MAX_WAITING_TIME - c : 0;
}
function f(a) {
    var d = a.totalPlayingTime - MAX_WAITING_TIME;
    return d < MAX_FADEOUT_TIME ? MAX_FADEOUT_TIME - d : 0;
}
var g = {
    background: 'red',
    borderRadius: '50%',
    width: CLICK_ELEMENT_SIZE + 'px',
    height: CLICK_ELEMENT_SIZE + 'px',
    position: 'absolute',
    'z-index': 20,
    '-moz-border-radius': '10px',
    '-webkit-border-radius': '10px',
};

export class UserClick {
    public element;
    public lastActive;
    public totalPlayingTime;

    constructor(a, b) {
        this.element = d(a, b);
        this.lastActive = new Date().getTime();
        this.totalPlayingTime = 0;
    }

    startAnimation(a, b) {
        var c = this,
            d = e(c);
        d > 0 && $(c.element).animate({ opacity: 1 }, d / a);
        var g = f(c);
        $(c.element).fadeOut(g / a, function (a) {
            b(c);
            $(this).remove();
        });
        c.lastActive = new Date().getTime();
    }
    stopAnimation() {
        var a = this;
        $(a.element).stop().stop();
        var b = new Date().getTime();
        a.totalPlayingTime = b - a.lastActive;
    }
    remove() {
        var a = this;
        $(a.element).remove();
    }
}
