import lodash from 'lodash';
import { UserClick } from './UserClick';

function c(clicksManager: ClicksManager, click: UserClick) {
    lodash.remove(clicksManager.clicksQueue, function(a) {
        return a == click;
    });
}
function d(clicksManager: ClicksManager) {
    clicksManager.visualizationIsEnabled = false;
    angular.forEach(clicksManager.clicksQueue, function(a) {
        a.remove();
    });
    clicksManager.clicksQueue = [];
}

export class ClicksManager {
    public clicksQueue: any[];
    public playerSpeed: number;
    public visualizationIsEnabled: boolean;

    constructor() {
        this.clicksQueue = [];
        this.playerSpeed = 1;
        this.visualizationIsEnabled = false;
    }

    setPlayerSpeed(playerSpeed: number) {
        this.playerSpeed = playerSpeed;
    }
    startClicksAnimation() {
        if (this.visualizationIsEnabled) {
            angular.forEach(this.clicksQueue, click => {
                click.startAnimation(this.playerSpeed, () => {
                    c(this, click);
                });
            });
        }
    }
    stopClicksAnimation() {
        angular.forEach(this.clicksQueue, function(click) {
            click.stopAnimation();
        });
    }
    registerClick(a, d) {
        if (this.visualizationIsEnabled) {
            var userClick = new UserClick(a, d);

            userClick.startAnimation(this.playerSpeed, (a: UserClick) => {
                c(this, a);
            });

            this.clicksQueue.push(userClick);

            return userClick.element;
        }
    }
    setShouldVisualizeClicks(a) {
        if (a) {
            this.visualizationIsEnabled = true;
        } else {
            d(this);
        }
    }
}
