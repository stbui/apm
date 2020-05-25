import { Plugin } from './plugin';

export class WindowPerformance extends Plugin {
    static pluginName: string = 'WindowPerformance';

    constructor(kernel) {
        super(kernel);
    }

    apply() {
        let time = window.performance.timing;

        // 统计页面性能
        var payload = {
            url: window.location.href,
            connect: time.connectEnd - time.connectStart,
            pageloadtime: time.loadEventStart - time.navigationStart,
            // 白屏时间
            ttfb: time.responseStart - time.navigationStart,
            // request请求耗时
            request: time.responseStart - time.requestStart,
            response: time.responseEnd - time.responseStart,
            // dom渲染完成时间
            dom: time.domContentLoadedEventStart - time.navigationStart,
            domReady: '',
            load: time.loadEventStart - time.domLoading,
            //TCP建立时间
            tcp: time.connectEnd - time.connectStart,
            // DNS解析时间
            dns: time.domainLookupEnd - time.domainLookupStart,
            black_waiting_time: time.responseStart - time.navigationStart,
            fist_page_time: time.responseStart - time.navigationStart,
            operation_time: 0,
            // 页面onload时间
            total_time: time.loadEventEnd - time.navigationStart,
            // 页面准备时间
            ready_time: time.fetchStart - time.navigationStart,
            // unload时间
            last_unload: time.unloadEventEnd - time.unloadEventStart,
            //页面解析dom耗时
            andt: time.domComplete - time.domInteractive || 0,
            // 页面重定向时间
            redirect: time.redirectEnd - time.redirectStart,
        };

        const event = {
            performance: payload,
            resources: this.getResource(),
            type: 'performance',
        };

        this.dispatcher.dispatch('notify', event);
    }

    getResource() {
        let resource: PerformanceEntryList = performance.getEntriesByType('resource');

        return resource.map((item: any) => {
            let json = {
                name: item.name,
                method: 'GET',
                type: item.initiatorType,
                duration: item.duration.toFixed(2) || 0,
                decodedBodySize: item.decodedBodySize || 0,
                nextHopProtocol: item.nextHopProtocol,
            };

            return json;
        });
    }
}
