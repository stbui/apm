import { Plugin } from './plugin';

export class NavigationBreadcrumbs extends Plugin {

    static pluginName: string = 'NavigationBreadcrumbs';

    constructor(kernel) {
        super(kernel);
    }


    relativeLocation(url) {
        const a = window.document.createElement('a');
        a.href = url;
        return `${a.pathname}${a.search}${a.hash}`;
    }

    apply() {
        if (!('addEventListener' in window)) {
            return;
        }

        const drop = name => () => {
            // instance.hook.publish('onBreadcumb', breadcumb => {
            //     const b = new breadcumb('navigation', name);
            //     return b;
            // });
        };

        window.addEventListener('pagehide', drop('Page hidden'), true);
        window.addEventListener('pageshow', drop('Page shown'), true);
        window.addEventListener('load', drop('Page loaded'), true);
        window.document.addEventListener('DOMContentLoaded', drop('DOMContentLoaded'), true);
        window.addEventListener('load', () => window.addEventListener('popstate', drop('Navigated back'), true));
        window.addEventListener(
            'hashchange',
            event => {
                // const metadata = event.oldURL
            },
            true
        );
    }
}
