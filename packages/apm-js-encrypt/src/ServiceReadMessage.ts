// Auto-generated, do not edit

import PrimitiveReader from './PrimitiveReader';

export const ID_TP_MAP = {
    0: 'timestamp',
    2: 'session_disconnect',
    4: 'set_page_location',
    5: 'set_viewport_size',
    6: 'set_viewport_scroll',
    7: 'create_document',
    8: 'create_element_node',
    9: 'create_text_node',
    10: 'move_node',
    11: 'remove_node',
    12: 'set_node_attribute',
    13: 'remove_node_attribute',
    14: 'set_node_data',
    15: 'set_css_data',
    16: 'set_node_scroll',
    18: 'set_input_value',
    19: 'set_input_checked',
    20: 'mouse_move',
    22: 'console_log',
    37: 'css_insert_rule',
    38: 'css_delete_rule',
    39: 'fetch',
    40: 'profiler',
    41: 'o_table',
    44: 'redux',
    45: 'vuex',
    46: 'mob_x',
    47: 'ng_rx',
    48: 'graph_ql',
    49: 'performance_track',
    54: 'connection_information',
    55: 'set_page_visibility',
    59: 'long_task',
    69: 'mouse_click',
    70: 'create_i_frame_document',
    90: 'ios_session_start',
    93: 'ios_custom_event',
    96: 'ios_screen_changes',
    100: 'ios_click_event',
    102: 'ios_performance_event',
    103: 'ios_log',
    105: 'ios_network_call',
} as const;

export interface timestamp {
    tp: 'timestamp';
    timestamp: number;
}

export interface SessionDisconnect {
    tp: 'session_disconnect';
    timestamp: number;
}

export interface SetPageLocation {
    tp: 'set_page_location';
    url: string;
    referrer: string;
    navigationStart: number;
}

export interface SetViewportSize {
    tp: 'set_viewport_size';
    width: number;
    height: number;
}

export interface SetViewportScroll {
    tp: 'set_viewport_scroll';
    x: number;
    y: number;
}

export interface CreateDocument {
    tp: 'create_document';
}

export interface CreateElementNode {
    tp: 'create_element_node';
    id: number;
    parentId: number;
    index: number;
    tag: string;
    svg: boolean;
}

export interface CreateTextNode {
    tp: 'create_text_node';
    id: number;
    parentId: number;
    index: number;
}

export interface MoveNode {
    tp: 'move_node';
    id: number;
    parentId: number;
    index: number;
}

export interface RemoveNode {
    tp: 'remove_node';
    id: number;
}

export interface SetNodeAttribute {
    tp: 'set_node_attribute';
    id: number;
    name: string;
    value: string;
}

export interface RemoveNodeAttribute {
    tp: 'remove_node_attribute';
    id: number;
    name: string;
}

export interface SetNodeData {
    tp: 'set_node_data';
    id: number;
    data: string;
}

export interface SetCssData {
    tp: 'set_css_data';
    id: number;
    data: string;
}

export interface SetNodeScroll {
    tp: 'set_node_scroll';
    id: number;
    x: number;
    y: number;
}

export interface SetInputValue {
    tp: 'set_input_value';
    id: number;
    value: string;
    mask: number;
}

export interface SetInputChecked {
    tp: 'set_input_checked';
    id: number;
    checked: boolean;
}

export interface MouseMove {
    tp: 'mouse_move';
    x: number;
    y: number;
}

export interface ConsoleLog {
    tp: 'console_log';
    level: string;
    value: string;
}

export interface CssInsertRule {
    tp: 'css_insert_rule';
    id: number;
    rule: string;
    index: number;
}

export interface CssDeleteRule {
    tp: 'css_delete_rule';
    id: number;
    index: number;
}

export interface Fetch {
    tp: 'fetch';
    method: string;
    url: string;
    request: string;
    response: string;
    status: number;
    timestamp: number;
    duration: number;
}

export interface Profiler {
    tp: 'profiler';
    name: string;
    duration: number;
    args: string;
    result: string;
}

export interface OTable {
    tp: 'o_table';
    key: string;
    value: string;
}

export interface Redux {
    tp: 'redux';
    action: string;
    state: string;
    duration: number;
}

export interface Vuex {
    tp: 'vuex';
    mutation: string;
    state: string;
}

export interface MobX {
    tp: 'mob_x';
    type: string;
    payload: string;
}

export interface NgRx {
    tp: 'ng_rx';
    action: string;
    state: string;
    duration: number;
}

export interface GraphQl {
    tp: 'graph_ql';
    operationKind: string;
    operationName: string;
    variables: string;
    response: string;
}

export interface PerformanceTrack {
    tp: 'performance_track';
    frames: number;
    ticks: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
}

export interface ConnectionInformation {
    tp: 'connection_information';
    downlink: number;
    type: string;
}

export interface SetPageVisibility {
    tp: 'set_page_visibility';
    hidden: boolean;
}

export interface LongTask {
    tp: 'long_task';
    timestamp: number;
    duration: number;
    context: number;
    containerType: number;
    containerSrc: string;
    containerId: string;
    containerName: string;
}

export interface MouseClick {
    tp: 'mouse_click';
    id: number;
    hesitationTime: number;
    label: string;
    selector: string;
}

export interface CreateIFrameDocument {
    tp: 'create_i_frame_document';
    frameID: number;
    id: number;
}

export interface IosSessionStart {
    tp: 'ios_session_start';
    timestamp: number;
    projectID: number;
    trackerVersion: string;
    revId: string;
    userUUID: string;
    userOS: string;
    userOSVersion: string;
    userDevice: string;
    userDeviceType: string;
    userCountry: string;
}

export interface IosCustomEvent {
    tp: 'ios_custom_event';
    timestamp: number;
    length: number;
    name: string;
    payload: string;
}

export interface IosScreenChanges {
    tp: 'ios_screen_changes';
    timestamp: number;
    length: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IosClickEvent {
    tp: 'ios_click_event';
    timestamp: number;
    length: number;
    label: string;
    x: number;
    y: number;
}

export interface IosPerformanceEvent {
    tp: 'ios_performance_event';
    timestamp: number;
    length: number;
    name: string;
    value: number;
}

export interface IosLog {
    tp: 'ios_log';
    timestamp: number;
    length: number;
    severity: string;
    content: string;
}

export interface IosNetworkCall {
    tp: 'ios_network_call';
    timestamp: number;
    length: number;
    duration: number;
    headers: string;
    body: string;
    url: string;
    success: boolean;
    method: string;
    status: number;
}

export default function (r) {
    const tp = r.readUint();
    switch (tp) {
        case 0:
            return {
                tp: 'timestamp',
                timestamp: r.readUint(),
            };

        case 1:
            return {
                tp: 1,
                timestamp: r.readUint(),
                projectId: r.readUint(),
                trackerVersion: r.readString(),
                revId: r.readString(),
                userUUID: r.readString(),
                userAgent: r.readString(),
                userOS: r.readString(),
                userOSVersion: r.readString(),
                userBrowser: r.readString(),
                userBrowserVersion: r.readString(),
                userDevice: r.readString(),
                userDeviceType: r.readString(),
                userDeviceMemorySize: r.readUint(),
                userDeviceHeapSize: r.readUint(),
                userCountry: r.readString(),
                UserID: r.readString(),
            };

        // case 2:
        //     return {
        //         tp: 2,
        //         timestamp: r.readUint(),
        //     };

        case 3:
            return {
                tp: 'SessionEnd',
                timestamp: r.readUint(),
            };

        case 4:
            return {
                tp: 'set_page_location',
                url: r.readString(),
                referrer: r.readString(),
                navigationStart: r.readUint(),
            };

        case 5:
            return {
                tp: 'set_viewport_size',
                width: r.readUint(),
                height: r.readUint(),
            };

        case 6:
            return {
                tp: 'set_viewport_scroll',
                x: r.readInt(),
                y: r.readInt(),
            };

        case 7:
            return {
                tp: 'create_document',
            };

        case 8:
            return {
                tp: 'create_element_node',
                id: r.readUint(),
                parentId: r.readUint(),
                index: r.readUint(),
                tag: r.readString(),
                svg: r.readBoolean(),
            };

        case 9:
            return {
                tp: 'create_text_node',
                id: r.readUint(),
                parentId: r.readUint(),
                index: r.readUint(),
            };

        case 10:
            return {
                tp: 10,
                id: r.readUint(),
                parentId: r.readUint(),
                index: r.readUint(),
            };

        case 11:
            return {
                tp: 11,
                id: r.readUint(),
            };

        case 12:
            return {
                tp: 12,
                id: r.readUint(),
                name: r.readString(),
                value: r.readString(),
            };

        case 13:
            return {
                tp: 13,
                id: r.readUint(),
                name: r.readString(),
            };

        case 14:
            const msg = {
                tp: 14,
                id: r.readUint(),
                data: r.readString(),
            };

            return msg;

        case 15:
            return {
                tp: 15,
                id: r.readUint(),
                data: r.readString(),
            };

        case 16:
            return {
                tp: 16,
                id: r.readUint(),
                x: r.readInt(),
                y: r.readInt(),
            };

        case 18:
            return {
                tp: 18,
                id: r.readUint(),
                value: r.readString(),
                mask: r.readInt(),
            };

        case 19:
            return {
                tp: 19,
                id: r.readUint(),
                checked: r.readBoolean(),
            };

        case 20:
            return {
                tp: 20,
                x: r.readUint(),
                y: r.readUint(),
            };

        case 21:
            return { tp: 21, id: r.readUint(), hesitationTime: r.readUint() };

        case 22:
            return {
                tp: 22,
                level: r.readString(),
                value: r.readString(),
            };

        case 23:
            return {
                tp: 23,
                requestStart: r.readUint(),
                responseStart: r.readUint(),
                responseEnd: r.readUint(),
                domContentLoadedEventStart: r.readUint(),
                domContentLoadedEventEnd: r.readUint(),
                loadEventStart: r.readUint(),
                loadEventEnd: r.readUint(),
                firstPaint: r.readUint(),
                firstContentfulPaint: r.readUint(),
            };

        case 24:
            return {
                tp: 24,
                speedIndex: r.readUint(),
                visuallyComplete: r.readUint(),
                timeToInteractive: r.readUint(),
            };

        case 25:
            return { tp: 25, name: r.readString(), message: r.readString(), payload: r.readString() };

        case 26:
            return {
                tp: 26,
                timestamp: r.readUint(),
                source: r.readString(),
                name: r.readString(),
                message: r.readString(),
                payload: r.readString(),
            };

        case 27:
            return { tp: 27, name: r.readString(), payload: r.readString() };

        case 28:
            return { tp: 28, id: r.readString() };

        case 29:
            return { tp: 29, id: r.readString() };

        case 30:
            return {
                tp: 30,
                Key: r.readString(),
                value: r.readString(),
            };

        case 31:
            return {
                tp: 31,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                url: r.readString(),
                referrer: r.readString(),
                loaded: r.readString(),
                requestStart: r.readUint(),
                responseStart: r.readUint(),
                responseEnd: r.readUint(),
                domContentLoadedEventStart: r.readUint(),
                domContentLoadedEventEnd: r.readUint(),
                loadEventStart: r.readUint(),
                loadEventEnd: r.readUint(),
                firstPaint: r.readUint(),
                firstContentfulPaint: r.readUint(),
                speedIndex: r.readUint(),
                visuallyComplete: r.readUint(),
                timeToInteractive: r.readUint(),
            };

        case 32:
            return {
                tp: 32,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                value: r.readString(),
                valueMasked: r.readBoolean(),
                label: r.readString(),
            };

        case 33:
            return {
                tp: 33,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                hesitationTime: r.readUint(),
                label: r.readString(),
                selector: r.readString(),
            };

        case 34:
            return {
                tp: 34,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                source: r.readString(),
                name: r.readString(),
                message: r.readString(),
                payload: r.readString(),
            };

        case 35:
            return {
                tp: 35,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                duration: r.readUint(),
                ttfb: r.readUint(),
                headerSize: r.readUint(),
                encodedBodySize: r.readUint(),
                decodedBodySize: r.readUint(),
                url: r.readString(),
                type: r.readString(),
                success: r.readBoolean(),
                method: r.readString(),
                status: r.readUint(),
            };

        case 36:
            return {
                tp: 36,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                name: r.readString(),
                payload: r.readString(),
            };

        case 37:
            return {
                tp: 37,
                id: r.readUint(),
                rule: r.readString(),
                index: r.readUint(),
            };

        case 38:
            return {
                tp: 38,
                id: r.readUint(),
                index: r.readUint(),
            };

        case 39:
            return {
                tp: 39,
                method: r.readString(),
                url: r.readString(),
                request: r.readString(),
                response: r.readString(),
                status: r.readUint(),
                timestamp: r.readUint(),
                duration: r.readUint(),
            };

        case 40:
            return {
                tp: 40,
                name: r.readString(),
                duration: r.readUint(),
                args: r.readString(),
                result: r.readString(),
            };

        case 41:
            return {
                tp: 41,
                key: r.readString(),
                value: r.readString(),
            };

        case 42:
            return {
                tp: 42,
                type: r.readString(),
            };

        case 43:
            return {
                tp: 43,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                type: r.readString(),
            };

        case 44:
            return {
                tp: 44,
                action: r.readString(),
                state: r.readString(),
                duration: r.readUint(),
            };

        case 45:
            return {
                tp: 45,
                mutation: r.readString(),
                state: r.readString(),
            };

        case 46:
            return {
                tp: 46,
                type: r.readString(),
                payload: r.readString(),
            };

        case 47:
            return {
                tp: 47,
                action: r.readString(),
                state: r.readString(),
                duration: r.readUint(),
            };

        case 48:
            return {
                tp: 48,
                operationKind: r.readString(),
                operationName: r.readString(),
                variables: r.readString(),
                response: r.readString(),
            };

        case 49:
            return {
                tp: 49,
                frames: r.readInt(),
                ticks: r.readInt(),
                totalJSHeapSize: r.readUint(),
                usedJSHeapSize: r.readUint(),
            };

        case 50:
            return {
                tp: 50,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                name: r.readString(),
            };

        // 51 no

        case 52:
            return { tp: 52, timestamp: r.readUint() };

        case 53:
            return {
                tp: 53,
                timestamp: r.readUint(),
                duration: r.readUint(),
                ttfb: r.readUint(),
                headerSize: r.readUint(),
                encodedBodySize: r.readUint(),
                decodedBodySize: r.readUint(),
                url: r.readString(),
                initiator: r.readString(),
            };

        case 54:
            return {
                tp: 54,
                downlink: r.readUint(),
                type: r.readString(),
            };

        case 55:
            return {
                tp: 55,
                hidden: r.readBoolean(),
            };

        case 56:
            return {
                tp: 56,
                timestampStart: r.readUint(),
                timestampEnd: r.readUint(),
                minFPS: r.readUint(),
                avgFPS: r.readUint(),
                maxFPS: r.readUint(),
                minCPU: r.readUint(),
                avgCPU: r.readUint(),
                maxCPU: r.readUint(),
                minTotalJSHeapSize: r.readUint(),
                avgTotalJSHeapSize: r.readUint(),
                maxTotalJSHeapSize: r.readUint(),
                minUsedJSHeapSize: r.readUint(),
                avgUsedJSHeapSize: r.readUint(),
                maxUsedJSHeapSize: r.readUint(),
            };

        // 57,58 no

        case 59:
            return {
                tp: 59,
                timestamp: r.readUint(),
                duration: r.readUint(),
                context: r.readUint(),
                containerType: r.readUint(),
                containerSrc: r.readString(),
                containerId: r.readString(),
                containerName: r.readString(),
            };

        case 60:
            return {
                tp: 60,
                id: r.readUint(),
                name: r.readString(),
                value: r.readString(),
                baseURL: r.readString(),
            };

        case 61:
            return {
                tp: 61,
                id: r.readUint(),
                data: r.readString(),
                baseURL: r.readString(),
            };

        case 62:
            return {
                tp: 62,
                messageId: r.readUint(),
                timestamp: r.readUint(),
                type: r.readString(),
                contextString: r.readString(),
                context: r.readString(),
                payload: r.readString(),
            };

        case 63:
            return {
                tp: 63,
                type: r.readString(),
                value: r.readString(),
            };

        case 64:
            return {
                tp: 64,
                name: r.readString(),
                payload: r.readString(),
            };

        // case 65:
        //     return {};

        case 66:
            return {
                tp: 66,
                url: r.readString(),
            };

        case 67:
            return {
                tp: 67,
                id: r.readUint(),
                rule: r.readString(),
                index: r.readUint(),
                baseURL: r.readString(),
            };

        // 68  no

        case 69:
            return {
                tp: 69,
                id: r.readUint(),
                hesitationTime: r.readUint(),
                label: r.readString(),
                selector: r.readString(),
            };

        case 70:
            return {
                tp: 70,
                frameID: r.readUint(),
                id: r.readUint(),
            };

        // case 90:
        //     return {
        //         tp: 90,
        //         timestamp: r.readUint(),
        //         projectID: r.readUint(),
        //         trackerVersion: r.readString(),
        //         revId: r.readString(),
        //         userUUID: r.readString(),
        //         userOS: r.readString(),
        //         userOSVersion: r.readString(),
        //         userDevice: r.readString(),
        //         userDeviceType: r.readString(),
        //         userCountry: r.readString(),
        //     };

        // case 93:
        //     return {
        //         tp: ID_TP_MAP[93],
        //         timestamp: r.readUint(),
        //         length: r.readUint(),
        //         name: r.readString(),
        //         payload: r.readString(),
        //     };

        // case 96:
        //     return {
        //         tp: ID_TP_MAP[96],
        //         timestamp: r.readUint(),
        //         length: r.readUint(),
        //         x: r.readUint(),
        //         y: r.readUint(),
        //         width: r.readUint(),
        //         height: r.readUint(),
        //     };

        // case 100:
        //     return {
        //         tp: ID_TP_MAP[100],
        //         timestamp: r.readUint(),
        //         length: r.readUint(),
        //         label: r.readString(),
        //         x: r.readUint(),
        //         y: r.readUint(),
        //     };

        // case 102:
        //     return {
        //         tp: ID_TP_MAP[102],
        //         timestamp: r.readUint(),
        //         length: r.readUint(),
        //         name: r.readString(),
        //         value: r.readUint(),
        //     };

        // case 103:
        //     return {
        //         tp: ID_TP_MAP[103],
        //         timestamp: r.readUint(),
        //         length: r.readUint(),
        //         severity: r.readString(),
        //         content: r.readString(),
        //     };

        // case 105:
        //     return {
        //         tp: ID_TP_MAP[105],
        //         timestamp: r.readUint(),
        //         length: r.readUint(),
        //         duration: r.readUint(),
        //         headers: r.readString(),
        //         body: r.readString(),
        //         url: r.readString(),
        //         success: r.readBoolean(),
        //         method: r.readString(),
        //         status: r.readUint(),
        //     };

        case 107:
            return {
                tp: 107,
                timestamp: r.readUint(),
                length: r.readUint(),
                firstIndex: r.readUint(),
            };

        case 90:
            return {
                tp: 90,
                timestamp: r.readUint(),
                projectID: r.readUint(),
                trackerVersion: r.readString(),
                revId: r.readString(),
                userUUID: r.readString(),
                userOS: r.readString(),
                userOSVersion: r.readString(),
                userDevice: r.readString(),
                userDeviceType: r.readString(),
                userCountry: r.readString(),
            };

        case 91:
            return {
                tp: 91,
                timestamp: r.readUint(),
            };

        case 92:
            return {
                tp: 92,
                timestamp: r.readUint(),
                length: r.readUint(),
                key: r.readString(),
                value: r.readString(),
            };

        case 93:
            return {
                tp: 93,
                timestamp: r.readUint(),
                length: r.readUint(),
                name: r.readString(),
                payload: r.readString(),
            };

        case 94:
            return {
                tp: 94,
                timestamp: r.readUint(),
                length: r.readUint(),
                value: r.readString(),
            };

        case 95:
            return {
                tp: 95,
                timestamp: r.readUint(),
                length: r.readUint(),
                value: r.readString(),
            };
        case 96:
            return {
                tp: 96,
                timestamp: r.readUint(),
                length: r.readUint(),
                x: r.readUint(),
                y: r.readUint(),
                width: r.readUint(),
                height: r.readUint(),
            };
        case 97:
            return {
                tp: 97,
                timestamp: r.readUint(),
                length: r.readUint(),
                name: r.readString(),
                reason: r.readString(),
                stacktrace: r.readString(),
            };
        case 98:
            return {
                tp: 98,
                timestamp: r.readUint(),
                length: r.readUint(),
                title: r.readString(),
                viewName: r.readString(),
            };
        case 99:
            return {
                tp: 99,
                timestamp: r.readUint(),
                length: r.readUint(),
                title: r.readString(),
                viewName: r.readString(),
            };
        case 100:
            return {
                tp: 100,
                timestamp: r.readUint(),
                length: r.readUint(),
                label: r.readString(),
                x: r.readUint(),
                y: r.readUint(),
            };
        case 101:
            return {
                tp: 101,
                timestamp: r.readUint(),
                length: r.readUint(),
                value: r.readString(),
                valueMasked: r.readBoolean(),
                label: r.readString(),
            };

        case 102:
            return {
                tp: 102,
                timestamp: r.readUint(),
                length: r.readUint(),
                name: r.readString(),
                value: r.readUint(),
            };

        case 103:
            return {
                tp: 103,
                timestamp: r.readUint(),
                length: r.readUint(),
                severity: r.readString(),
                content: r.readString(),
            };

        case 104:
            return {
                tp: 104,
                timestamp: r.readUint(),
                length: r.readUint(),
                content: r.readString(),
            };

        case 105:
            return {
                tp: 105,
                timestamp: r.readUint(),
                length: r.readUint(),
                duration: r.readUint(),
                headers: r.readString(),
                body: r.readString(),
                url: r.readString(),
                success: r.readBoolean(),
                method: r.readString(),
                status: r.readUint(),
            };

        case 110:
            return {
                tp: 110,
                timestampStart: r.readUint(),
                timestampEnd: r.readUint(),
                minFPS: r.readUint(),
                avgFPS: r.readUint(),
                maxFPS: r.readUint(),
                minCPU: r.readUint(),
                avgCPU: r.readUint(),
                maxCPU: r.readUint(),
                minMemory: r.readUint(),
                avgMemory: r.readUint(),
                maxMemory: r.readUint(),
                minBattery: r.readUint(),
                avgBattery: r.readUint(),
                maxBattery: r.readUint(),
            };
        case 111:
            return {
                tp: 111,
                timestamp: r.readUint(),
                type: r.readString(),
                contextString: r.readString(),
                context: r.readString(),
                payload: r.readString(),
            };

        case 80:
            return {
                tp: 80,
                pageNo: r.readUint(),
                firstIndex: r.readUint(),
                timestamp: r.readInt(),
            };

        case 81:
            return {
                tp: 81,
                version: r.readUint(),
                page_no: r.readUint(),
                first_index: r.readUint(),
                timestamp: r.readInt(),
                location: r.readString(),
            };

        case 82:
            return {
                tp: 82,
                PartNo: r.readUint(),
                PartTotal: r.readUint(),
            };

        default:
            throw new Error(`Unrecognizable message type: ${tp}`);
            return null;
    }
}
