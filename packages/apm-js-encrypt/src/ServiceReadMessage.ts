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

export interface Timestamp {
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
    parentID: number;
    index: number;
    tag: string;
    svg: boolean;
}

export interface CreateTextNode {
    tp: 'create_text_node';
    id: number;
    parentID: number;
    index: number;
}

export interface MoveNode {
    tp: 'move_node';
    id: number;
    parentID: number;
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
    revID: string;
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
        case 80:
            return {
                byte: 80,
                pageNo: r.readUint(),
                firstIndex: r.readUint(),
                timestamp: r.readInt(),
            };

        case 0:
            return {
                timestamp: r.readUint(),
            };

        case 1:
            return {
                timestamp: r.readUint(),
                projectId: r.readUint(),
                trackerVersion: r.readString(),
                revID: r.readString(),
                UserUUID: r.readString(),
                UserAgent: r.readString(),
                UserOS: r.readString(),
                UserOSVersion: r.readString(),
                UserBrowser: r.readString(),
                UserBrowserVersion: r.readString(),
                UserDevice: r.readString(),
                UserDeviceType: r.readString(),
                UserDeviceMemorySize: r.readUint(),
                UserDeviceHeapSize: r.readUint(),
                UserCountry: r.readString(),
            };

        case 2:
            return {
                tp: ID_TP_MAP[2],
                timestamp: r.readUint(),
            };

        case 3:
            return {
                tp: ID_TP_MAP[2],
                timestamp: r.readUint(),
            };

        case 4:
            return {
                tp: ID_TP_MAP[4],
                url: r.readString(),
                referrer: r.readString(),
                navigationStart: r.readUint(),
            };

        case 5:
            return {
                tp: ID_TP_MAP[5],
                width: r.readUint(),
                height: r.readUint(),
            };

        case 6:
            return {
                tp: ID_TP_MAP[6],
                x: r.readInt(),
                y: r.readInt(),
            };

        case 7:
            return {
                tp: ID_TP_MAP[7],
            };

        case 8:
            return {
                tp: ID_TP_MAP[8],
                id: r.readUint(),
                parentID: r.readUint(),
                index: r.readUint(),
                tag: r.readString(),
                svg: r.readBoolean(),
            };

        case 9:
            return {
                tp: ID_TP_MAP[9],
                id: r.readUint(),
                parentID: r.readUint(),
                index: r.readUint(),
            };

        case 10:
            return {
                tp: ID_TP_MAP[10],
                id: r.readUint(),
                parentID: r.readUint(),
                index: r.readUint(),
            };

        case 11:
            return {
                tp: ID_TP_MAP[11],
                id: r.readUint(),
            };

        case 12:
            return {
                tp: ID_TP_MAP[12],
                id: r.readUint(),
                name: r.readString(),
                value: r.readString(),
            };

        case 13:
            return {
                tp: ID_TP_MAP[13],
                id: r.readUint(),
                name: r.readString(),
            };

        case 14:
            return {
                tp: ID_TP_MAP[14],
                id: r.readUint(),
                data: r.readString(),
            };

        case 15:
            return {
                tp: ID_TP_MAP[15],
                id: r.readUint(),
                data: r.readString(),
            };

        case 16:
            return {
                tp: ID_TP_MAP[16],
                id: r.readUint(),
                x: r.readInt(),
                y: r.readInt(),
            };

        case 18:
            return {
                tp: ID_TP_MAP[18],
                id: r.readUint(),
                value: r.readString(),
                mask: r.readInt(),
            };

        case 19:
            return {
                tp: ID_TP_MAP[19],
                id: r.readUint(),
                checked: r.readBoolean(),
            };

        case 20:
            return {
                tp: ID_TP_MAP[20],
                x: r.readUint(),
                y: r.readUint(),
            };

        case 21:
            return {
                ID: r.readUint(),
                HesitationTime: r.readUint(),
            };

        case 22:
            return {
                tp: ID_TP_MAP[22],
                level: r.readString(),
                value: r.readString(),
            };

        case 23:
            return {
                RequestStart: r.readUint(),
                ResponseStart: r.readUint(),
                ResponseEnd: r.readUint(),
                DomContentLoadedEventStart: r.readUint(),
                DomContentLoadedEventEnd: r.readUint(),
                LoadEventStart: r.readUint(),
                LoadEventEnd: r.readUint(),
                FirstPaint: r.readUint(),
                FirstContentfulPaint: r.readUint(),
            };

        case 24:
            return {
                SpeedIndex: r.readUint(),
                VisuallyComplete: r.readUint(),
                TimeToInteractive: r.readUint(),
            };

        case 25:
            return {
                Name: r.readString(),
                Message: r.readString(),
                Payload: r.readString(),
            };

        case 26:
            return {
                Timestamp: r.readUint(),
                Source: r.readString(),
                Name: r.readString(),
                Message: r.readString(),
                Payload: r.readString(),
            };

        case 27:
            return {
                Name: r.readString(),
                Payload: r.readString(),
            };

        case 28:
            return {
                ID: r.readString(),
            };

        case 29:
            return {
                ID: r.readString(),
            };

        case 30:
            return {
                Key: r.readString(),
                Value: r.readString(),
            };

        case 31:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                URL: r.readString(),
                Referrer: r.readString(),
                Loaded: r.readString(),
                RequestStart: r.readUint(),
                ResponseStart: r.readUint(),
                ResponseEnd: r.readUint(),
                DomContentLoadedEventStart: r.readUint(),
                DomContentLoadedEventEnd: r.readUint(),
                LoadEventStart: r.readUint(),
                LoadEventEnd: r.readUint(),
                FirstPaint: r.readUint(),
                FirstContentfulPaint: r.readUint(),
                SpeedIndex: r.readUint(),
                VisuallyComplete: r.readUint(),
                TimeToInteractive: r.readUint(),
            };

        case 32:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                Value: r.readString(),
                ValueMasked: r.readBoolean(),
                Label: r.readString(),
            };

        case 33:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                HesitationTime: r.readUint(),
                Label: r.readString(),
                Selector: r.readString(),
            };

        case 34:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                Source: r.readString(),
                Name: r.readString(),
                Message: r.readString(),
                Payload: r.readString(),
            };

        case 35:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                Duration: r.readUint(),
                TTFB: r.readUint(),
                HeaderSize: r.readUint(),
                EncodedBodySize: r.readUint(),
                DecodedBodySize: r.readUint(),
                URL: r.readString(),
                Type: r.readString(),
                Success: r.readBoolean(),
                Method: r.readString(),
                Status: r.readUint(),
            };

        case 36:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                Name: r.readString(),
                Payload: r.readString(),
            };

        case 37:
            return {
                tp: ID_TP_MAP[37],
                id: r.readUint(),
                rule: r.readString(),
                index: r.readUint(),
            };

        case 38:
            return {
                tp: ID_TP_MAP[38],
                id: r.readUint(),
                index: r.readUint(),
            };

        case 39:
            return {
                tp: ID_TP_MAP[39],
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
                tp: ID_TP_MAP[40],
                name: r.readString(),
                duration: r.readUint(),
                args: r.readString(),
                result: r.readString(),
            };

        case 41:
            return {
                tp: ID_TP_MAP[41],
                key: r.readString(),
                value: r.readString(),
            };

        case 42:
            return {
                Type: r.readString(),
            };

        case 43:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                Type: r.readString(),
            };

        case 44:
            return {
                tp: ID_TP_MAP[44],
                action: r.readString(),
                state: r.readString(),
                duration: r.readUint(),
            };

        case 45:
            return {
                tp: ID_TP_MAP[45],
                mutation: r.readString(),
                state: r.readString(),
            };

        case 46:
            return {
                tp: ID_TP_MAP[46],
                type: r.readString(),
                payload: r.readString(),
            };

        case 47:
            return {
                tp: ID_TP_MAP[47],
                action: r.readString(),
                state: r.readString(),
                duration: r.readUint(),
            };

        case 48:
            return {
                tp: ID_TP_MAP[48],
                operationKind: r.readString(),
                operationName: r.readString(),
                variables: r.readString(),
                response: r.readString(),
            };

        case 49:
            return {
                tp: ID_TP_MAP[49],
                frames: r.readInt(),
                ticks: r.readInt(),
                totalJSHeapSize: r.readUint(),
                usedJSHeapSize: r.readUint(),
            };

        case 50:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                Name: r.readString(),
            };

        // 51 no

        case 52:
            return {
                Timestamp: r.readUint(),
            };

        case 53:
            return {
                Timestamp: r.readUint(),
                Duration: r.readUint(),
                TTFB: r.readUint(),
                HeaderSize: r.readUint(),
                EncodedBodySize: r.readUint(),
                DecodedBodySize: r.readUint(),
                URL: r.readString(),
                Initiator: r.readString(),
            };

        case 54:
            return {
                tp: ID_TP_MAP[54],
                downlink: r.readUint(),
                type: r.readString(),
            };

        case 55:
            return {
                tp: ID_TP_MAP[55],
                hidden: r.readBoolean(),
            };

        case 56:
            return {
                TimestampStart: r.readUint(),
                TimestampEnd: r.readUint(),
                MinFPS: r.readUint(),
                AvgFPS: r.readUint(),
                MaxFPS: r.readUint(),
                MinCPU: r.readUint(),
                AvgCPU: r.readUint(),
                MaxCPU: r.readUint(),
                MinTotalJSHeapSize: r.readUint(),
                AvgTotalJSHeapSize: r.readUint(),
                MaxTotalJSHeapSize: r.readUint(),
                MinUsedJSHeapSize: r.readUint(),
                AvgUsedJSHeapSize: r.readUint(),
                MaxUsedJSHeapSize: r.readUint(),
            };

        // 57,58 no

        case 59:
            return {
                tp: ID_TP_MAP[59],
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
                id: r.readUint(),
                Name: r.readString(),
                Value: r.readString(),
                BaseURL: r.readString(),
            };

        case 61:
            return {
                id: r.readUint(),
                Data: r.readString(),
                BaseURL: r.readString(),
            };

        case 62:
            return {
                MessageID: r.readUint(),
                Timestamp: r.readUint(),
                Type: r.readString(),
                ContextString: r.readString(),
                Context: r.readString(),
                Payload: r.readString(),
            };

        case 63:
            return {
                Type: r.readString(),
                Value: r.readString(),
            };

        case 64:
            return {
                Name: r.readString(),
                Payload: r.readString(),
            };

        // case 65:
        //     return {};

        case 66:
            return {
                URL: r.readString(),
            };

        case 67:
            return {
                id: r.readUint(),
                Rule: r.readString(),
                Index: r.readUint(),
                BaseURL: r.readString(),
            };

        // 68  no

        case 69:
            return {
                tp: ID_TP_MAP[69],
                id: r.readUint(),
                hesitationTime: r.readUint(),
                label: r.readString(),
                selector: r.readString(),
            };

        case 70:
            return {
                tp: ID_TP_MAP[70],
                frameID: r.readUint(),
                id: r.readUint(),
            };

        // case 90:
        //     return {
        //         tp: ID_TP_MAP[90],
        //         timestamp: r.readUint(),
        //         projectID: r.readUint(),
        //         trackerVersion: r.readString(),
        //         revID: r.readString(),
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
                timestamp: r.readUint(),
                length: r.readUint(),
                FirstIndex: r.readUint(),
            };

        case 90:
            return {
                timestamp: r.readUint(),
                projectID: r.readUint(),
                trackerVersion: r.readString(),
                revID: r.readString(),
                userUUID: r.readString(),
                userOS: r.readString(),
                userOSVersion: r.readString(),
                userDevice: r.readString(),
                userDeviceType: r.readString(),
                userCountry: r.readString(),
            };

        case 91:
            return {
                timestamp: r.readUint(),
            };

        case 91:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                Key: r.readString(),
                Value: r.readString(),
            };

        case 93:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                Name: r.readString(),
                Payload: r.readString(),
            };

        case 94:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                Value: r.readString(),
            };

        case 95:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                Value: r.readString(),
            };
        case 96:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                x: r.readUint(),
                y: r.readUint(),
                width: r.readUint(),
                height: r.readUint(),
            };
        case 97:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                Name: r.readString(),
                Reason: r.readString(),
                Stacktrace: r.readString(),
            };
        case 98:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                Title: r.readString(),
                ViewName: r.readString(),
            };
        case 99:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                Title: r.readString(),
                ViewName: r.readString(),
            };
        case 100:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                label: r.readString(),
                x: r.readUint(),
                y: r.readUint(),
            };
        case 101:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                Value: r.readString(),
                ValueMasked: r.readBoolean(),
                Label: r.readString(),
            };

        case 102:
            return {
                tp: ID_TP_MAP[102],
                timestamp: r.readUint(),
                length: r.readUint(),
                name: r.readString(),
                value: r.readUint(),
            };

        case 103:
            return {
                tp: ID_TP_MAP[103],
                timestamp: r.readUint(),
                length: r.readUint(),
                severity: r.readString(),
                content: r.readString(),
            };

        case 104:
            return {
                timestamp: r.readUint(),
                length: r.readUint(),
                content: r.readString(),
            };

        case 105:
            return {
                tp: ID_TP_MAP[105],
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
                TimestampStart: r.readUint(),
                TimestampEnd: r.readUint(),
                MinFPS: r.readUint(),
                AvgFPS: r.readUint(),
                MaxFPS: r.readUint(),
                MinCPU: r.readUint(),
                AvgCPU: r.readUint(),
                MaxCPU: r.readUint(),
                MinMemory: r.readUint(),
                AvgMemory: r.readUint(),
                MaxMemory: r.readUint(),
                MinBattery: r.readUint(),
                AvgBattery: r.readUint(),
                MaxBattery: r.readUint(),
            };
        case 111:
            return {
                Timestamp: r.readUint(),
                Type: r.readString(),
                ContextString: r.readString(),
                Context: r.readString(),
                Payload: r.readString(),
            };
        default:
            throw new Error(`Unrecognizable message type: ${tp}`);
            return null;
    }
}
