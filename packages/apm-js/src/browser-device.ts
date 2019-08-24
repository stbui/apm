export const BrowserDevice = {
    init: apm => {
        const navigator: Navigator = window.navigator;

        const device = {
            local: navigator.language,
            userAgent: navigator.userAgent,
        };

        apm.device = { ...device, ...apm.device };
    },
};
