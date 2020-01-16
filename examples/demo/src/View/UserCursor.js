export class UserCursor {
    lastActive = new Date().getTime();
    totalPlayingTime = 0;

    container;
    node;

    // 当前时间
    start = 0;
    // 初始值
    begin = 0;
    // 结束位置
    end = 500;
    // 持续时间
    during = 100;

    constructor(container) {
        this.container = container;
        this.render();
    }

    linear(t, b, c, d) {
        return (c * t) / d + b;
    }

    // start() {
    //     // window.requestAnimationFrame(function(time) {
    //     //     console.log(new Date(time).getTime());
    //     // });
    //     // this.step();
    // }

    step() {
        const left = this.linear(this.start, this.begin, this.end, this.during);
        this.setPositon(left);

        // 时间递增
        this.start++;

        if (this.start <= this.during) {
            requestAnimationFrame(() => this.step());
        } else {
            // callback()...
        }
    }

    stop() {
        let now = new Date().getTime();
        totalPlayingTime = now - lastActive;
    }

    remove() {
        this.container.removeChild(this.node);
    }

    setPositon(left, top) {
        this.node.style.transform = 'translateX(' + left + 'px)';
    }

    render() {
        this.node = document.createElement('div');
        this.node.setAttribute('class', 'cursor');
        this.container.appendChild(this.node);
    }
}
