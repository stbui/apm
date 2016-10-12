'use strict';

export default class extends think.controller.base {

    formatDate(u) {
        let unix = parseInt(u);
        let now = new Date(unix);
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var H = now.getHours();
        var M = now.getMinutes();
        var S = now.getSeconds();

        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        H = H < 10 ? '0' + H : H;
        M = M < 10 ? '0' + M : M;
        S = S < 10 ? '0' + S : S;

        return y + '-' + m + '-' + d + ' ' + H + ':' + M + ':' + S;
    }
}