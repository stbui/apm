const MAX_WAITING_TIME = 1e3;
const MAX_FADEOUT_TIME = 2e3;
const CLICK_ELEMENT_SIZE = 10;

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

function createElement(b, c) {
    const div = document.createElement('div');

    div.style.top = b - CLICK_ELEMENT_SIZE / 2 + 'px';
    div.style.left = c - CLICK_ELEMENT_SIZE / 2 + 'px';

    // $(div).css({ top: b - CLICK_ELEMENT_SIZE / 2 + 'px', left: c - CLICK_ELEMENT_SIZE / 2 + 'px' });
    // $(div).css(g);

    return div;
}
function e(userClick: UserClick) {
    var totalPlayingTime = userClick.totalPlayingTime;
    return totalPlayingTime < MAX_WAITING_TIME ? MAX_WAITING_TIME - totalPlayingTime : 0;
}
function f(userClick: UserClick) {
    var d = userClick.totalPlayingTime - MAX_WAITING_TIME;
    return d < MAX_FADEOUT_TIME ? MAX_FADEOUT_TIME - d : 0;
}

export class UserClick {
    public element: HTMLElement;
    public lastActive: number;
    public totalPlayingTime: number;

    constructor(a, b) {
        this.element = createElement(a, b);
        this.lastActive = new Date().getTime();
        this.totalPlayingTime = 0;
    }

    startAnimation(playerSpeed, callback) {
        var c = this,
            d = e(this);

        d > 0 && $(this.element).animate({ opacity: 1 }, d / playerSpeed);
        var g = f(this);

        $(this.element).fadeOut(g / playerSpeed, function (a) {
            callback(c);
            $(this).remove();
        });

        c.lastActive = new Date().getTime();
    }
    stopAnimation() {
        $(this.element).stop().stop();
        var getTime = new Date().getTime();
        this.totalPlayingTime = getTime - this.lastActive;
    }
    remove() {
        this.element.remove();
        // $(this.element).remove();
    }
}
