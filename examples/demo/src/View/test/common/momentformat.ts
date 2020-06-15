import { TimeComponents } from './TimeComponents';

export const momentformat = time => {
    const timeComponents = new TimeComponents(time);
    let dateStr = '';

    if (timeComponents.getHours() > 0) {
        dateStr += timeComponents.getHours();
    }

    if (timeComponents.getMinutes() > 0 || timeComponents.getHours() > 0) {
        if (timeComponents.getHours() > 0) {
            dateStr += ':';
        }

        if (timeComponents.getMinutes() <= 9) {
            dateStr += '0';
        }

        dateStr += timeComponents.getMinutes();
    }

    if (timeComponents.getSeconds() >= 0) {
        dateStr += timeComponents.getMinutes() > 0 || timeComponents.getHours() > 0 ? ':' : '0:';

        if (timeComponents.getSeconds() <= 9) {
            dateStr += '0';
        }

        dateStr += timeComponents.getSeconds();
    }

    if (dateStr.length === 0) {
        dateStr = '0:00';
    }

    return dateStr;
};
