// Auto-generated, do not edit
/* eslint-disable */

import PrimitiveReader from './PrimitiveReader';
import type { RawMessage } from './raw';

export default class RawMessageReader extends PrimitiveReader {
    readMessage() {
        const p = this.p;
        const resetPointer = () => {
            this.p = p;
            return null;
        };

        const tp = this.readUint();
        if (tp === null) {
            return resetPointer();
        }

        if (!(tp === 81 || tp === 82 || tp === 80)) {
            this.skip(3);
        }

        switch (tp) {
            case 0: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                // console.log(timestamp);
                return {
                    tp: 'timestamp',
                    timestamp,
                };
            }

            case 1:
                return {
                    tp: 'session_start',
                    timestamp: this.readUint(),
                    projectId: this.readUint(),
                    trackerVersion: this.readString(),
                    revId: this.readString(),
                    userUUID: this.readString(),
                    userAgent: this.readString(),
                    userOS: this.readString(),
                    userOSVersion: this.readString(),
                    userBrowser: this.readString(),
                    userBrowserVersion: this.readString(),
                    userDevice: this.readString(),
                    userDeviceType: this.readString(),
                    userDeviceMemorySize: this.readUint(),
                    userDeviceHeapSize: this.readUint(),
                    userCountry: this.readString(),
                    UserID: this.readString(),
                };

            case 3:
                return {
                    tp: 'session_end',
                    timestamp: this.readUint(),
                };

            case 4: {
                const url = this.readString();
                if (url === null) {
                    return resetPointer();
                }
                const referrer = this.readString();
                if (referrer === null) {
                    return resetPointer();
                }
                const navigationStart = this.readUint();
                if (navigationStart === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_page_location',
                    url,
                    referrer,
                    navigationStart,
                };
            }

            case 5: {
                const width = this.readUint();
                if (width === null) {
                    return resetPointer();
                }
                const height = this.readUint();
                if (height === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_viewport_size',
                    width,
                    height,
                };
            }

            case 6: {
                const x = this.readInt();
                if (x === null) {
                    return resetPointer();
                }
                const y = this.readInt();
                if (y === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_viewport_scroll',
                    x,
                    y,
                };
            }

            case 7: {
                return {
                    tp: 'create_document',
                };
            }

            case 8: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const parentID = this.readUint();
                if (parentID === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                const tag = this.readString();
                if (tag === null) {
                    return resetPointer();
                }
                const svg = this.readBoolean();
                if (svg === null) {
                    return resetPointer();
                }
                return {
                    tp: 'create_element_node',
                    id,
                    parentID,
                    index,
                    tag,
                    svg,
                };
            }

            case 9: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const parentID = this.readUint();
                if (parentID === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                return {
                    tp: 'create_text_node',
                    id,
                    parentID,
                    index,
                };
            }

            case 10: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const parentID = this.readUint();
                if (parentID === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                return {
                    tp: 'move_node',
                    id,
                    parentID,
                    index,
                };
            }

            case 11: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                return {
                    tp: 'remove_node',
                    id,
                };
            }

            case 12: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const name = this.readString();
                if (name === null) {
                    return resetPointer();
                }
                const value = this.readString();
                if (value === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_node_attribute',
                    id,
                    name,
                    value,
                };
            }

            case 13: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const name = this.readString();
                if (name === null) {
                    return resetPointer();
                }
                return {
                    tp: 'remove_node_attribute',
                    id,
                    name,
                };
            }

            case 14: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const data = this.readString();
                if (data === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_node_data',
                    id,
                    data,
                };
            }

            case 15: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const data = this.readString();
                if (data === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_css_data',
                    id,
                    data,
                };
            }

            case 16: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const x = this.readInt();
                if (x === null) {
                    return resetPointer();
                }
                const y = this.readInt();
                if (y === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_node_scroll',
                    id,
                    x,
                    y,
                };
            }

            case 18: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const value = this.readString();
                if (value === null) {
                    return resetPointer();
                }
                const mask = this.readInt();
                if (mask === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_input_value',
                    id,
                    value,
                    mask,
                };
            }

            case 19: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const checked = this.readBoolean();
                if (checked === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_input_checked',
                    id,
                    checked,
                };
            }

            case 20: {
                const x = this.readUint();
                if (x === null) {
                    return resetPointer();
                }
                const y = this.readUint();
                if (y === null) {
                    return resetPointer();
                }
                return {
                    tp: 'mouse_move',
                    x,
                    y,
                };
            }

            case 22: {
                const level = this.readString();
                if (level === null) {
                    return resetPointer();
                }
                const value = this.readString();
                if (value === null) {
                    return resetPointer();
                }
                return {
                    tp: 'console_log',
                    level,
                    value,
                };
            }

            case 23: {
                return {
                    tp: 'page_load_timing',
                    requestStart: this.readUint(),
                    responseStart: this.readUint(),
                    responseEnd: this.readUint(),
                    domContentLoadedEventStart: this.readUint(),
                    domContentLoadedEventEnd: this.readUint(),
                    loadEventStart: this.readUint(),
                    loadEventEnd: this.readUint(),
                    firstPaint: this.readUint(),
                    firstContentfulPaint: this.readUint(),
                };
            }

            case 24: {
                return {
                    tp: 'page_render_timing',
                    speedIndex: this.readUint(),
                    visuallyComplete: this.readUint(),
                    timeToInteractive: this.readUint(),
                };
            }

            case 25:
                return {
                    tp: 'JSException',
                    name: this.readString(),
                    message: this.readString(),
                    payload: this.readString(),
                };

            case 26:
                return {
                    tp: 'IntegrationEvent',
                    timestamp: this.readUint(),
                    source: this.readString(),
                    name: this.readString(),
                    message: this.readString(),
                    payload: this.readString(),
                };

            case 27:
                return { tp: 'RawCustomEvent', name: this.readString(), payload: this.readString() };

            case 28: {
                return {
                    tp: 'user_id',
                    id: this.readString(),
                };
            }

            case 29:
                return { tp: 'UserAnonymousID', id: this.readString() };

            case 30:
                return {
                    tp: 'Metadata',
                    Key: this.readString(),
                    value: this.readString(),
                };

            case 31:
                return {
                    tp: 'PageEvent',
                    messageId: this.readUint(),
                    timestamp: this.readUint(),
                    url: this.readString(),
                    referrer: this.readString(),
                    loaded: this.readString(),
                    requestStart: this.readUint(),
                    responseStart: this.readUint(),
                    responseEnd: this.readUint(),
                    domContentLoadedEventStart: this.readUint(),
                    domContentLoadedEventEnd: this.readUint(),
                    loadEventStart: this.readUint(),
                    loadEventEnd: this.readUint(),
                    firstPaint: this.readUint(),
                    firstContentfulPaint: this.readUint(),
                    speedIndex: this.readUint(),
                    visuallyComplete: this.readUint(),
                    timeToInteractive: this.readUint(),
                };

            case 32:
                return {
                    tp: 'InputEvent',
                    messageId: this.readUint(),
                    timestamp: this.readUint(),
                    value: this.readString(),
                    valueMasked: this.readBoolean(),
                    label: this.readString(),
                };

            case 33:
                return {
                    tp: 'ClickEvent',
                    messageId: this.readUint(),
                    timestamp: this.readUint(),
                    hesitationTime: this.readUint(),
                    label: this.readString(),
                    selector: this.readString(),
                };

            case 34:
                return {
                    tp: 'ErrorEvent',
                    messageId: this.readUint(),
                    timestamp: this.readUint(),
                    source: this.readString(),
                    name: this.readString(),
                    message: this.readString(),
                    payload: this.readString(),
                };

            case 35:
                return {
                    tp: 'ResourceEvent',
                    messageId: this.readUint(),
                    timestamp: this.readUint(),
                    duration: this.readUint(),
                    ttfb: this.readUint(),
                    headerSize: this.readUint(),
                    encodedBodySize: this.readUint(),
                    decodedBodySize: this.readUint(),
                    url: this.readString(),
                    type: this.readString(),
                    success: this.readBoolean(),
                    method: this.readString(),
                    status: this.readUint(),
                };

            case 36:
                return {
                    tp: 'CustomEvent',
                    messageId: this.readUint(),
                    timestamp: this.readUint(),
                    name: this.readString(),
                    payload: this.readString(),
                };

            case 37: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const rule = this.readString();
                if (rule === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                return {
                    tp: 'css_insert_rule',
                    id,
                    rule,
                    index,
                };
            }

            case 38: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                return {
                    tp: 'css_delete_rule',
                    id,
                    index,
                };
            }

            case 39: {
                const method = this.readString();
                if (method === null) {
                    return resetPointer();
                }
                const url = this.readString();
                if (url === null) {
                    return resetPointer();
                }
                const request = this.readString();
                if (request === null) {
                    return resetPointer();
                }
                const response = this.readString();
                if (response === null) {
                    return resetPointer();
                }
                const status = this.readUint();
                if (status === null) {
                    return resetPointer();
                }
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const duration = this.readUint();
                if (duration === null) {
                    return resetPointer();
                }
                return {
                    tp: 'fetch',
                    method,
                    url,
                    request,
                    response,
                    status,
                    timestamp,
                    duration,
                };
            }

            case 40: {
                const name = this.readString();
                if (name === null) {
                    return resetPointer();
                }
                const duration = this.readUint();
                if (duration === null) {
                    return resetPointer();
                }
                const args = this.readString();
                if (args === null) {
                    return resetPointer();
                }
                const result = this.readString();
                if (result === null) {
                    return resetPointer();
                }
                return {
                    tp: 'profiler',
                    name,
                    duration,
                    args,
                    result,
                };
            }

            case 41: {
                const key = this.readString();
                if (key === null) {
                    return resetPointer();
                }
                const value = this.readString();
                if (value === null) {
                    return resetPointer();
                }
                return {
                    tp: 'o_table',
                    key,
                    value,
                };
            }

            case 44: {
                const action = this.readString();
                if (action === null) {
                    return resetPointer();
                }
                const state = this.readString();
                if (state === null) {
                    return resetPointer();
                }
                const duration = this.readUint();
                if (duration === null) {
                    return resetPointer();
                }
                return {
                    tp: 'redux',
                    action,
                    state,
                    duration,
                };
            }

            case 45: {
                const mutation = this.readString();
                if (mutation === null) {
                    return resetPointer();
                }
                const state = this.readString();
                if (state === null) {
                    return resetPointer();
                }
                return {
                    tp: 'vuex',
                    mutation,
                    state,
                };
            }

            case 46: {
                const type = this.readString();
                if (type === null) {
                    return resetPointer();
                }
                const payload = this.readString();
                if (payload === null) {
                    return resetPointer();
                }
                return {
                    tp: 'mob_x',
                    type,
                    payload,
                };
            }

            case 47: {
                const action = this.readString();
                if (action === null) {
                    return resetPointer();
                }
                const state = this.readString();
                if (state === null) {
                    return resetPointer();
                }
                const duration = this.readUint();
                if (duration === null) {
                    return resetPointer();
                }
                return {
                    tp: 'ng_rx',
                    action,
                    state,
                    duration,
                };
            }

            case 48: {
                const operationKind = this.readString();
                if (operationKind === null) {
                    return resetPointer();
                }
                const operationName = this.readString();
                if (operationName === null) {
                    return resetPointer();
                }
                const variables = this.readString();
                if (variables === null) {
                    return resetPointer();
                }
                const response = this.readString();
                if (response === null) {
                    return resetPointer();
                }
                return {
                    tp: 'graph_ql',
                    operationKind,
                    operationName,
                    variables,
                    response,
                };
            }

            case 49: {
                const frames = this.readInt();
                if (frames === null) {
                    return resetPointer();
                }
                const ticks = this.readInt();
                if (ticks === null) {
                    return resetPointer();
                }
                const totalJSHeapSize = this.readUint();
                if (totalJSHeapSize === null) {
                    return resetPointer();
                }
                const usedJSHeapSize = this.readUint();
                if (usedJSHeapSize === null) {
                    return resetPointer();
                }
                return {
                    tp: 'performance_track',
                    frames,
                    ticks,
                    totalJSHeapSize,
                    usedJSHeapSize,
                };
            }

            case 53: {
                return {
                    tp: 'resource_timing',
                    timestamp: this.readUint(),
                    duration: this.readUint(),
                    ttfb: this.readUint(),
                    headerSize: this.readUint(),
                    encodedBodySize: this.readUint(),
                    decodedBodySize: this.readUint(),
                    url: this.readString(),
                    initiator: this.readString(),
                };
            }

            case 54: {
                const downlink = this.readUint();
                if (downlink === null) {
                    return resetPointer();
                }
                const type = this.readString();
                if (type === null) {
                    return resetPointer();
                }
                return {
                    tp: 'connection_information',
                    downlink,
                    type,
                };
            }

            case 55: {
                const hidden = this.readBoolean();
                if (hidden === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_page_visibility',
                    hidden,
                };
            }

            case 58: {
                return {
                    tp: 'set_node_focus',
                    id: this.readInt(),
                };
            }

            case 59: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const duration = this.readUint();
                if (duration === null) {
                    return resetPointer();
                }
                const context = this.readUint();
                if (context === null) {
                    return resetPointer();
                }
                const containerType = this.readUint();
                if (containerType === null) {
                    return resetPointer();
                }
                const containerSrc = this.readString();
                if (containerSrc === null) {
                    return resetPointer();
                }
                const containerId = this.readString();
                if (containerId === null) {
                    return resetPointer();
                }
                const containerName = this.readString();
                if (containerName === null) {
                    return resetPointer();
                }
                return {
                    tp: 'long_task',
                    timestamp,
                    duration,
                    context,
                    containerType,
                    containerSrc,
                    containerId,
                    containerName,
                };
            }

            case 60: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const name = this.readString();
                if (name === null) {
                    return resetPointer();
                }
                const value = this.readString();
                if (value === null) {
                    return resetPointer();
                }
                const baseURL = this.readString();
                if (baseURL === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_node_attribute_url_based',
                    id,
                    name,
                    value,
                    baseURL,
                };
            }

            case 61: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const data = this.readString();
                if (data === null) {
                    return resetPointer();
                }
                const baseURL = this.readString();
                if (baseURL === null) {
                    return resetPointer();
                }
                return {
                    tp: 'set_css_data_url_based',
                    id,
                    data,
                    baseURL,
                };
            }

            case 61:
                return {
                    tp: 61,
                    id: this.readUint(),
                    data: this.readString(),
                    baseURL: this.readString(),
                };

            case 62:
                return {
                    tp: 62,
                    messageId: this.readUint(),
                    timestamp: this.readUint(),
                    type: this.readString(),
                    contextString: this.readString(),
                    context: this.readString(),
                    payload: this.readString(),
                };

            case 63:
                return {
                    tp: 63,
                    type: this.readString(),
                    value: this.readString(),
                };

            case 64:
                return {
                    tp: 64,
                    name: this.readString(),
                    payload: this.readString(),
                };

            case 66:
                return {
                    tp: 66,
                    url: this.readString(),
                };

            case 67: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const rule = this.readString();
                if (rule === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                const baseURL = this.readString();
                if (baseURL === null) {
                    return resetPointer();
                }
                return {
                    tp: 'css_insert_rule_url_based',
                    id,
                    rule,
                    index,
                    baseURL,
                };
            }

            case 69: {
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                const hesitationTime = this.readUint();
                if (hesitationTime === null) {
                    return resetPointer();
                }
                const label = this.readString();
                if (label === null) {
                    return resetPointer();
                }
                const selector = this.readString();
                if (selector === null) {
                    return resetPointer();
                }
                return {
                    tp: 'mouse_click',
                    id,
                    hesitationTime,
                    label,
                    selector,
                };
            }

            case 70: {
                const frameID = this.readUint();
                if (frameID === null) {
                    return resetPointer();
                }
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                return {
                    tp: 'create_i_frame_document',
                    frameID,
                    id,
                };
            }

            case 71: {
                const sheetID = this.readUint();
                if (sheetID === null) {
                    return resetPointer();
                }
                const text = this.readString();
                if (text === null) {
                    return resetPointer();
                }
                const baseURL = this.readString();
                if (baseURL === null) {
                    return resetPointer();
                }
                return {
                    tp: 'adopted_ss_replace_url_based',
                    sheetID,
                    text,
                    baseURL,
                };
            }

            case 72: {
                const sheetID = this.readUint();
                if (sheetID === null) {
                    return resetPointer();
                }
                const text = this.readString();
                if (text === null) {
                    return resetPointer();
                }
                return {
                    tp: 'adopted_ss_replace',
                    sheetID,
                    text,
                };
            }

            case 73: {
                const sheetID = this.readUint();
                if (sheetID === null) {
                    return resetPointer();
                }
                const rule = this.readString();
                if (rule === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                const baseURL = this.readString();
                if (baseURL === null) {
                    return resetPointer();
                }
                return {
                    tp: 'adopted_ss_insert_rule_url_based',
                    sheetID,
                    rule,
                    index,
                    baseURL,
                };
            }

            case 74: {
                const sheetID = this.readUint();
                if (sheetID === null) {
                    return resetPointer();
                }
                const rule = this.readString();
                if (rule === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                return {
                    tp: 'adopted_ss_insert_rule',
                    sheetID,
                    rule,
                    index,
                };
            }

            case 75: {
                const sheetID = this.readUint();
                if (sheetID === null) {
                    return resetPointer();
                }
                const index = this.readUint();
                if (index === null) {
                    return resetPointer();
                }
                return {
                    tp: 'adopted_ss_delete_rule',
                    sheetID,
                    index,
                };
            }

            case 76: {
                const sheetID = this.readUint();
                if (sheetID === null) {
                    return resetPointer();
                }
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                return {
                    tp: 'adopted_ss_add_owner',
                    sheetID,
                    id,
                };
            }

            case 77: {
                const sheetID = this.readUint();
                if (sheetID === null) {
                    return resetPointer();
                }
                const id = this.readUint();
                if (id === null) {
                    return resetPointer();
                }
                return {
                    tp: 'adopted_ss_remove_owner',
                    sheetID,
                    id,
                };
            }

            case 79: {
                const mutation = this.readString();
                if (mutation === null) {
                    return resetPointer();
                }
                const state = this.readString();
                if (state === null) {
                    return resetPointer();
                }
                return {
                    tp: 'zustand',
                    mutation,
                    state,
                };
            }

            case 90: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const projectID = this.readUint();
                if (projectID === null) {
                    return resetPointer();
                }
                const trackerVersion = this.readString();
                if (trackerVersion === null) {
                    return resetPointer();
                }
                const revID = this.readString();
                if (revID === null) {
                    return resetPointer();
                }
                const userUUID = this.readString();
                if (userUUID === null) {
                    return resetPointer();
                }
                const userOS = this.readString();
                if (userOS === null) {
                    return resetPointer();
                }
                const userOSVersion = this.readString();
                if (userOSVersion === null) {
                    return resetPointer();
                }
                const userDevice = this.readString();
                if (userDevice === null) {
                    return resetPointer();
                }
                const userDeviceType = this.readString();
                if (userDeviceType === null) {
                    return resetPointer();
                }
                const userCountry = this.readString();
                if (userCountry === null) {
                    return resetPointer();
                }
                return {
                    tp: 'ios_session_start',
                    timestamp,
                    projectID,
                    trackerVersion,
                    revID,
                    userUUID,
                    userOS,
                    userOSVersion,
                    userDevice,
                    userDeviceType,
                    userCountry,
                };
            }

            case 93: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const length = this.readUint();
                if (length === null) {
                    return resetPointer();
                }
                const name = this.readString();
                if (name === null) {
                    return resetPointer();
                }
                const payload = this.readString();
                if (payload === null) {
                    return resetPointer();
                }
                return {
                    tp: 'ios_custom_event',
                    timestamp,
                    length,
                    name,
                    payload,
                };
            }

            case 96: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const length = this.readUint();
                if (length === null) {
                    return resetPointer();
                }
                const x = this.readUint();
                if (x === null) {
                    return resetPointer();
                }
                const y = this.readUint();
                if (y === null) {
                    return resetPointer();
                }
                const width = this.readUint();
                if (width === null) {
                    return resetPointer();
                }
                const height = this.readUint();
                if (height === null) {
                    return resetPointer();
                }
                return {
                    tp: 'ios_screen_changes',
                    timestamp,
                    length,
                    x,
                    y,
                    width,
                    height,
                };
            }

            case 100: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const length = this.readUint();
                if (length === null) {
                    return resetPointer();
                }
                const label = this.readString();
                if (label === null) {
                    return resetPointer();
                }
                const x = this.readUint();
                if (x === null) {
                    return resetPointer();
                }
                const y = this.readUint();
                if (y === null) {
                    return resetPointer();
                }
                return {
                    tp: 'ios_click_event',
                    timestamp,
                    length,
                    label,
                    x,
                    y,
                };
            }

            case 102: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const length = this.readUint();
                if (length === null) {
                    return resetPointer();
                }
                const name = this.readString();
                if (name === null) {
                    return resetPointer();
                }
                const value = this.readUint();
                if (value === null) {
                    return resetPointer();
                }
                return {
                    tp: 'ios_performance_event',
                    timestamp,
                    length,
                    name,
                    value,
                };
            }

            case 103: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const length = this.readUint();
                if (length === null) {
                    return resetPointer();
                }
                const severity = this.readString();
                if (severity === null) {
                    return resetPointer();
                }
                const content = this.readString();
                if (content === null) {
                    return resetPointer();
                }
                return {
                    tp: 'ios_log',
                    timestamp,
                    length,
                    severity,
                    content,
                };
            }

            case 105: {
                const timestamp = this.readUint();
                if (timestamp === null) {
                    return resetPointer();
                }
                const length = this.readUint();
                if (length === null) {
                    return resetPointer();
                }
                const duration = this.readUint();
                if (duration === null) {
                    return resetPointer();
                }
                const headers = this.readString();
                if (headers === null) {
                    return resetPointer();
                }
                const body = this.readString();
                if (body === null) {
                    return resetPointer();
                }
                const url = this.readString();
                if (url === null) {
                    return resetPointer();
                }
                const success = this.readBoolean();
                if (success === null) {
                    return resetPointer();
                }
                const method = this.readString();
                if (method === null) {
                    return resetPointer();
                }
                const status = this.readUint();
                if (status === null) {
                    return resetPointer();
                }
                return {
                    tp: 'ios_network_call',
                    timestamp,
                    length,
                    duration,
                    headers,
                    body,
                    url,
                    success,
                    method,
                    status,
                };
            }

            case 81: {
                const version = this.readUint();
                if (version === null) {
                    return resetPointer();
                }

                const page_no = this.readUint();
                if (page_no === null) {
                    return resetPointer();
                }

                const first_index = this.readUint();
                if (first_index === null) {
                    return resetPointer();
                }

                const timestamp = this.readInt();
                if (timestamp === null) {
                    return resetPointer();
                }

                const location = this.readString();
                if (location === null) {
                    return resetPointer();
                }

                return {
                    tp: 'batch_metadata',
                    version,
                    page_no,
                    first_index,
                    timestamp,
                    location,
                };
            }

            default:
                throw new Error(
                    `Unrecognizable message type: ${tp}; Pointer at the position ${this.p} of ${this.buf.length}`
                );
                return null;
        }
    }
}
