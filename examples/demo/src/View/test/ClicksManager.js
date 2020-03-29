angular.module('playerApp').factory('ClicksManager', [
    'lodash',
    'UserClick',
    function(a, b) {
        function c(b, c) {
            a.remove(b.clicksQueue, function(a) {
                return a == c;
            });
        }
        function d(a) {
            (a.visualizationIsEnabled = !1),
                angular.forEach(a.clicksQueue, function(a) {
                    a.remove();
                }),
                (a.clicksQueue = []);
        }
        var e = function() {
            (this.clicksQueue = []), (this.playerSpeed = 1), (this.visualizationIsEnabled = !1);
        };
        return (
            (e.prototype.setPlayerSpeed = function(a) {
                this.playerSpeed = a;
            }),
            (e.prototype.startClicksAnimation = function() {
                var a = this;
                a.visualizationIsEnabled &&
                    angular.forEach(a.clicksQueue, function(b) {
                        b.startAnimation(a.playerSpeed, function() {
                            c(a, b);
                        });
                    });
            }),
            (e.prototype.stopClicksAnimation = function() {
                var a = this;
                angular.forEach(a.clicksQueue, function(a) {
                    a.stopAnimation();
                });
            }),
            (e.prototype.registerClick = function(a, d) {
                var e = this;
                if (e.visualizationIsEnabled) {
                    var f = new b(a, d);
                    return (
                        f.startAnimation(e.playerSpeed, function(a) {
                            c(e, a);
                        }),
                        e.clicksQueue.push(f),
                        f.element
                    );
                }
            }),
            (e.prototype.setShouldVisualizeClicks = function(a) {
                var b = this;
                a ? (b.visualizationIsEnabled = !0) : d(b);
            }),
            e
        );
    },
]);
