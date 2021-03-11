export function TimeComponents(time: number) {
    const ms = Math.floor(time / 1000);
    this.hours = Math.floor(ms / 3600);
    this.minutes = Math.floor((ms - 3600 * this.hours) / 60);
    this.seconds = Math.round(ms - 3600 * this.hours - 60 * this.minutes);
}

TimeComponents.prototype = {
    getHours: function () {
        return this.hours;
    },
    getMinutes: function () {
        return this.minutes;
    },
    getSeconds: function () {
        return this.seconds;
    },
};
