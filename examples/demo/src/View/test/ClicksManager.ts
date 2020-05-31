import { UserClick } from './UserClick';

function c(b, c) {
    lodash.remove(b.clicksQueue, function (a) {
        return a == c;
    });
}
function d(a) {
    a.visualizationIsEnabled = !1;
    angular.forEach(a.clicksQueue, function (a) {
        a.remove();
    });
    a.clicksQueue = [];
}

export class ClicksManager {
    public clicksQueue;
    public playerSpeed: number;
    public visualizationIsEnabled;

    constructor() {
        this.clicksQueue = [];
        this.playerSpeed = 1;
        this.visualizationIsEnabled = !1;
    }

    setPlayerSpeed(playerSpeed: number) {
        this.playerSpeed = playerSpeed;
    }
    startClicksAnimation() {
        var a = this;
        a.visualizationIsEnabled &&
            angular.forEach(a.clicksQueue, function (b) {
                b.startAnimation(a.playerSpeed, function () {
                    c(a, b);
                });
            });
    }
    stopClicksAnimation() {
        var a = this;
        angular.forEach(a.clicksQueue, function (a) {
            a.stopAnimation();
        });
    }
    registerClick(a, d) {
        var e = this;
        if (e.visualizationIsEnabled) {
            var f = new UserClick(a, d);

            f.startAnimation(e.playerSpeed, function (a) {
                c(e, a);
            });
            e.clicksQueue.push(f);
            return f.element;
        }
    }
    setShouldVisualizeClicks(a) {
        a ? (this.visualizationIsEnabled = !0) : d(this);
    }
}
