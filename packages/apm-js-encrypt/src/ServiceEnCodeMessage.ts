import writer from './writer';

function len(val) {
    if (val) {
        // 如果是字符串，返回字节数
        return val.length * 4;
    }

    return 0;
}

function batchMeta({ pageNo, firstIndex, timestamp }) {
    const w = new writer(31);
    w.uint(80);
    w.uint(pageNo);
    w.uint(firstIndex);
    w.int(timestamp);
    w.checkpoint();
    return w.flush();
}

function timestamp({ timestamp }) {
    const w = new writer(11);
    w.uint(0);
    w.uint(timestamp);
    w.checkpoint();
    return w.flush();
}

function SessionStart(msg) {
    const w = new writer(
        151 +
            len(msg.trackerVersion) +
            len(msg.revId) +
            len(msg.userUUID) +
            len(msg.userAgent) +
            len(msg.userOS) +
            len(msg.userOSVersion) +
            len(msg.userBrowser) +
            len(msg.userBrowserVersion) +
            len(msg.userDevice) +
            len(msg.userDeviceType) +
            len(msg.userCountry)
    );
    w.uint(1);

    w.uint(msg.timestamp);
    w.uint(msg.projectID);
    w.string(msg.trackerVersion);
    w.string(msg.revId);
    w.string(msg.userUUID);
    w.string(msg.userAgent);
    w.string(msg.userOS);
    w.string(msg.userOSVersion);
    w.string(msg.userBrowser);
    w.string(msg.userBrowserVersion);
    w.string(msg.userDevice);
    w.string(msg.userDeviceType);
    w.uint(msg.userDeviceMemorySize);
    w.uint(msg.userDeviceHeapSize);
    w.string(msg.userCountry);

    w.checkpoint();
    return w.flush();
}

function SessionDisconnect(msg) {
    const w = new writer(11);
    w.uint(2);

    w.uint(msg.timestamp);

    w.checkpoint();
    return w.flush();
}

function SessionEnd(msg) {
    const w = new writer(11);
    w.uint(3);

    w.uint(msg.timestamp);

    w.checkpoint();
    return w.flush();
}

function SetPageLocation(msg) {
    const w = new writer(31 + len(msg.url) + len(msg.referrer));
    w.uint(4);

    w.string(msg.url);
    w.string(msg.referrer);
    w.uint(msg.navigationStart);

    w.checkpoint();
    return w.flush();
}

function SetViewportSize(msg) {
    const w = new writer(21);
    w.uint(5);

    w.uint(msg.width);
    w.uint(msg.height);

    w.checkpoint();
    return w.flush();
}

function SetViewportScroll(msg) {
    const w = new writer(21);
    w.uint(6);

    w.int(msg.x);
    w.int(msg.y);

    w.checkpoint();
    return w.flush();
}

function CreateDocument(msg) {
    const w = new writer(1);
    w.uint(7);

    w.checkpoint();
    return w.flush();
}

function CreateElementNode(msg) {
    const w = new writer(51 + len(msg.tag));
    w.uint(8);

    w.uint(msg.id);
    w.uint(msg.parentId);
    w.uint(msg.index);
    w.string(msg.tag);
    w.boolean(msg.svg);

    w.checkpoint();
    return w.flush();
}

function CreateTextNode(msg) {
    const w = new writer(31);
    w.uint(9);

    w.uint(msg.id);
    w.uint(msg.parentId);
    w.uint(msg.index);

    w.checkpoint();
    return w.flush();
}

function MoveNode(msg) {
    const w = new writer(31);
    w.uint(10);

    w.uint(msg.id);
    w.uint(msg.parentId);
    w.uint(msg.index);

    w.checkpoint();
    return w.flush();
}

function RemoveNode(msg) {
    const w = new writer(11);
    w.uint(11);

    w.uint(msg.id);

    w.checkpoint();
    return w.flush();
}

function SetNodeAttribute(msg) {
    const w = new writer(31 + len(msg.name) + len(msg.value));
    w.uint(12);

    w.uint(msg.id);
    w.string(msg.name);
    w.string(msg.value);

    w.checkpoint();
    return w.flush();
}

function RemoveNodeAttribute(msg) {
    const w = new writer(31 + 21 + len(msg.name));
    w.uint(13);

    w.uint(msg.id);
    w.string(msg.name);

    w.checkpoint();
    return w.flush();
}
function SetNodeData(msg) {
    const w = new writer(21 + len(msg.data));
    w.uint(14);

    w.uint(msg.id);
    w.string(msg.data);

    w.checkpoint();
    return w.flush();
}
function SetCSSData(msg) {
    const w = new writer(21 + len(msg.data));
    w.uint(15);

    w.uint(msg.id);
    w.string(msg.data);

    w.checkpoint();
    return w.flush();
}
function SetNodeScroll(msg) {
    const w = new writer(31);
    w.uint(16);

    w.uint(msg.id);
    w.int(msg.x);
    w.int(msg.y);

    w.checkpoint();
    return w.flush();
}
function SetInputTarget(msg) {
    const w = new writer(21 + len(msg.label));
    w.uint(17);

    w.uint(msg.id);
    w.int(msg.label);

    w.checkpoint();
    return w.flush();
}

function SetInputValue(msg) {
    const w = new writer(31 + len(msg.value));
    w.uint(18);

    w.uint(msg.id);
    w.string(msg.value);
    w.int(msg.mask);

    w.checkpoint();
    return w.flush();
}

function SetInputChecked(msg) {
    const w = new writer(21);
    w.uint(19);

    w.uint(msg.id);
    w.boolean(msg.checked);

    w.checkpoint();
    return w.flush();
}

function MouseMove(msg) {
    const w = new writer(21);
    w.uint(20);

    w.uint(msg.x);
    w.uint(msg.y);

    w.checkpoint();
    return w.flush();
}

function MouseClickDepricated(msg) {
    const w = new writer(31 + len(msg.label));
    w.uint(21);

    w.uint(msg.id);
    w.uint(msg.hesitationTime);
    w.string(msg.label);

    w.checkpoint();
    return w.flush();
}

function ConsoleLog(msg) {
    const w = new writer(21 + len(msg.Level) + len(msg.value));
    w.uint(22);

    w.string(msg.level);
    w.string(msg.value);

    w.checkpoint();
    return w.flush();
}

function PageLoadTiming(msg) {
    const w = new writer(91);
    w.uint(23);

    w.uint(msg.requestStart);
    w.uint(msg.responseStart);
    w.uint(msg.responseEnd);
    w.uint(msg.domContentLoadedEventStart);
    w.uint(msg.domContentLoadedEventEnd);
    w.uint(msg.loadEventStart);
    w.uint(msg.loadEventEnd);
    w.uint(msg.firstPaint);
    w.uint(msg.firstContentfulPaint);

    w.checkpoint();
    return w.flush();
}

function PageRenderTiming(msg) {
    const w = new writer(31);
    w.uint(24);

    w.uint(msg.speedIndex);
    w.uint(msg.visuallyComplete);
    w.uint(msg.timeToInteractive);

    w.checkpoint();
    return w.flush();
}

function JSException(msg) {
    const w = new writer(31 + len(msg.name) + len(msg.message) + len(msg.payload));
    w.uint(25);

    w.string(msg.name);
    w.string(msg.message);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function RawErrorEvent(msg) {
    const w = new writer(51 + len(msg.source) + len(msg.name) + len(msg.message) + len(msg.payload));
    w.uint(26);

    w.uint(msg.timestamp);
    w.string(msg.source);
    w.string(msg.name);
    w.string(msg.message);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function RawCustomEvent(msg) {
    const w = new writer(21 + len(msg.name) + len(msg.payload));
    w.uint(27);

    w.string(msg.name);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function UserID(msg) {
    const w = new writer(11 + len(msg.id));
    w.uint(28);

    w.string(msg.id);

    w.checkpoint();
    return w.flush();
}

function UserAnonymousID(msg) {
    const w = new writer(11 + len(msg.id));
    w.uint(29);

    w.string(msg.id);

    w.checkpoint();
    return w.flush();
}

function Metadata(msg) {
    const w = new writer(21 + len(msg.key) + len(msg.value));
    w.uint(30);

    w.string(msg.key);
    w.string(msg.value);

    w.checkpoint();
    return w.flush();
}

function PageEvent(msg) {
    const w = new writer(171 + len(msg.url) + len(msg.referrer));
    w.uint(31);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.string(msg.url);
    w.string(msg.referrer);
    w.boolean(msg.loaded);
    w.uint(msg.requestStart);
    w.uint(msg.responseStart);
    w.uint(msg.responseEnd);
    w.uint(msg.domContentLoadedEventStart);
    w.uint(msg.domContentLoadedEventEnd);
    w.uint(msg.loadEventStart);
    w.uint(msg.loadEventEnd);
    w.uint(msg.firstPaint);
    w.uint(msg.firstContentfulPaint);
    w.uint(msg.speedIndex);
    w.uint(msg.visuallyComplete);
    w.uint(msg.timeToInteractive);

    w.checkpoint();
    return w.flush();
}

function InputEvent(msg) {
    const w = new writer(51 + len(msg.value) + len(msg.label));
    w.uint(32);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.string(msg.value);
    w.boolean(msg.valueMasked);
    w.string(msg.label);

    w.checkpoint();
    return w.flush();
}

function ClickEvent(msg) {
    const w = new writer(51 + len(msg.label) + len(msg.selector));
    w.uint(33);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.uint(msg.hesitationTime);
    w.string(msg.label);
    w.string(msg.selector);

    w.checkpoint();
    return w.flush();
}

function ErrorEvent(msg) {
    const w = new writer(61 + len(msg.source) + len(msg.name) + len(msg.message) + len(msg.payload));
    w.uint(34);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.string(msg.source);
    w.string(msg.name);
    w.string(msg.message);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function ResourceEvent(msg) {
    const w = new writer(121 + len(msg.url) + len(msg.type) + len(msg.method));
    w.uint(35);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.uint(msg.duration);
    w.uint(msg.ttfb);
    w.uint(msg.headerSize);
    w.uint(msg.encodedBodySize);
    w.uint(msg.decodedBodySize);
    w.string(msg.url);
    w.string(msg.type);
    w.boolean(msg.success);
    w.string(msg.method);
    w.uint(msg.status);

    w.checkpoint();
    return w.flush();
}

function CustomEvent(msg) {
    const w = new writer(41 + len(msg.name) + len(msg.payload));
    w.uint(36);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.string(msg.name);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function CSSInsertRule(msg) {
    const w = new writer(31 + len(msg.rule));
    w.uint(37);

    w.uint(msg.id);
    w.string(msg.rule);
    w.uint(msg.index);

    w.checkpoint();
    return w.flush();
}

function CSSDeleteRule(msg) {
    const w = new writer(21);
    w.uint(38);

    w.uint(msg.id);
    w.uint(msg.index);

    w.checkpoint();
    return w.flush();
}

function Fetch(msg) {
    const w = new writer(71 + len(msg.method) + len(msg.url) + len(msg.request) + len(msg.response));
    w.uint(39);

    w.string(msg.method);
    w.string(msg.url);
    w.string(msg.request);
    w.string(msg.response);
    w.uint(msg.status);
    w.uint(msg.timestamp);
    w.uint(msg.duration);

    w.checkpoint();
    return w.flush();
}

function Profiler(msg) {
    const w = new writer(41 + len(msg.name) + len(msg.args) + len(msg.result));
    w.uint(40);

    w.string(msg.name);
    w.uint(msg.duration);
    w.string(msg.args);
    w.string(msg.result);

    w.checkpoint();
    return w.flush();
}

function OTable(msg) {
    const w = new writer(21 + len(msg.key) + len(msg.value));
    w.uint(41);

    w.string(msg.key);
    w.string(msg.value);

    w.checkpoint();
    return w.flush();
}

function StateAction(msg) {
    const w = new writer(11 + len(msg.type));
    w.uint(42);

    w.string(msg.type);

    w.checkpoint();
    return w.flush();
}

function StateActionEvent(msg) {
    const w = new writer(31 + len(msg.type));
    w.uint(43);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.string(msg.Type);

    w.checkpoint();
    return w.flush();
}

function Redux(msg) {
    const w = new writer(31 + len(msg.action) + len(msg.state));
    w.uint(44);

    w.string(msg.action);
    w.string(msg.state);
    w.uint(msg.duration);

    w.checkpoint();
    return w.flush();
}

function Vuex(msg) {
    const w = new writer(21 + len(msg.mutation) + len(msg.state));
    w.uint(45);

    w.string(msg.mutation);
    w.string(msg.state);

    w.checkpoint();
    return w.flush();
}

function MobX(msg) {
    const w = new writer(21 + len(msg.type) + len(msg.payload));
    w.uint(46);

    w.string(msg.type);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function NgRx(msg) {
    const w = new writer(31 + len(msg.action) + len(msg.state));
    w.uint(47);

    w.string(msg.action);
    w.string(msg.state);
    w.uint(msg.duration);

    w.checkpoint();
    return w.flush();
}

function GraphQL(msg) {
    const w = new writer(41 + len(msg.operationKind) + len(msg.operationName) + len(msg.variables) + len(msg.response));
    w.uint(48);

    w.string(msg.operationKind);
    w.string(msg.operationName);
    w.string(msg.variables);
    w.string(msg.response);

    w.checkpoint();
    return w.flush();
}

function PerformanceTrack(msg) {
    const w = new writer(41);
    w.uint(49);

    w.int(msg.frames);
    w.int(msg.ticks);
    w.uint(msg.totalJSHeapSize);
    w.uint(msg.usedJSHeapSize);

    w.checkpoint();
    return w.flush();
}

function GraphQLEvent(msg) {
    const w = new writer(31 + len(msg.name));
    w.uint(50);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.string(msg.name);

    w.checkpoint();
    return w.flush();
}

function DOMDrop(msg) {
    const w = new writer(11);
    w.uint(52);

    w.uint(msg.timestamp);

    w.checkpoint();
    return w.flush();
}

function ResourceTiming(msg) {
    const w = new writer(81 + len(msg.url) + len(msg.initiator));
    w.uint(53);

    w.uint(msg.timestamp);
    w.uint(msg.duration);
    w.uint(msg.ttfb);
    w.uint(msg.headerSize);
    w.uint(msg.encodedBodySize);
    w.uint(msg.decodedBodySize);
    w.string(msg.url);
    w.string(msg.initiator);

    w.checkpoint();
    return w.flush();
}

function ConnectionInformation(msg) {
    const w = new writer(21 + len(msg.type));
    w.uint(54);

    w.uint(msg.downlink);
    w.string(msg.type);

    w.checkpoint();
    return w.flush();
}

function SetPageVisibility(msg) {
    const w = new writer(11);
    w.uint(55);

    w.boolean(msg.hidden);

    w.checkpoint();
    return w.flush();
}

function PerformanceTrackAggr(msg) {
    const w = new writer(141);
    w.uint(56);

    w.uint(msg.timestampStart);
    w.uint(msg.timestampEnd);
    w.uint(msg.minFPS);
    w.uint(msg.avgFPS);
    w.uint(msg.maxFPS);
    w.uint(msg.minCPU);
    w.uint(msg.avgCPU);
    w.uint(msg.maxCPU);
    w.uint(msg.minTotalJSHeapSize);
    w.uint(msg.avgTotalJSHeapSize);
    w.uint(msg.maxTotalJSHeapSize);
    w.uint(msg.minUsedJSHeapSize);
    w.uint(msg.avgUsedJSHeapSize);
    w.uint(msg.maxUsedJSHeapSize);

    w.checkpoint();
    return w.flush();
}

function LongTask(msg) {
    const w = new writer(71 + len(msg.containerSrc) + len(msg.containerId) + len(msg.containerName));
    w.uint(59);

    w.uint(msg.timestamp);
    w.uint(msg.duration);
    w.uint(msg.context);
    w.uint(msg.containerType);
    w.string(msg.containerSrc);
    w.string(msg.containerId);
    w.string(msg.containerName);

    w.checkpoint();
    return w.flush();
}

function SetNodeAttributeURLBased(msg) {
    const w = new writer(41 + len(msg.name) + len(msg.value) + len(msg.baseURL));
    w.uint(60);

    w.uint(msg.id);
    w.string(msg.name);
    w.string(msg.value);
    w.string(msg.baseURL);

    w.checkpoint();
    return w.flush();
}

function SetCSSDataURLBased(msg) {
    const w = new writer(31 + len(msg.data) + len(msg.baseURL));
    w.uint(61);

    w.uint(msg.id);
    w.string(msg.data);
    w.string(msg.baseURL);

    w.checkpoint();
    return w.flush();
}

function IssueEvent(msg) {
    const w = new writer(61 + len(msg.type) + len(msg.contextString) + len(msg.context) + len(msg.payload));
    w.uint(62);

    w.uint(msg.messageId);
    w.uint(msg.timestamp);
    w.string(msg.type);
    w.string(msg.contextString);
    w.string(msg.context);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function TechnicalInfo(msg) {
    const w = new writer(21 + len(msg.type) + len(msg.value));
    w.uint(63);

    w.string(msg.type);
    w.string(msg.value);

    w.checkpoint();
    return w.flush();
}

function CustomIssue(msg) {
    const w = new writer(21 + len(msg.name) + len(msg.payload));
    w.uint(64);

    w.string(msg.name);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function PageClose(msg) {
    const w = new writer(1);
    w.uint(65);

    w.checkpoint();
    return w.flush();
}

function AssetCache(msg) {
    const w = new writer(11 + len(msg.url));
    w.uint(66);

    w.string(msg.url);

    w.checkpoint();
    return w.flush();
}

function CSSInsertRuleURLBased(msg) {
    const w = new writer(41 + len(msg.rule) + len(msg.baseURL));
    w.uint(67);

    w.uint(msg.id);
    w.string(msg.rule);
    w.uint(msg.index);
    w.string(msg.baseURL);

    w.checkpoint();
    return w.flush();
}

function MouseClick(msg) {
    const w = new writer(41 + len(msg.label) + len(msg.selector));
    w.uint(69);

    w.uint(msg.id);
    w.uint(msg.hesitationTime);
    w.string(msg.label);
    w.string(msg.selector);

    w.checkpoint();
    return w.flush();
}

function CreateIFrameDocument(msg) {
    const w = new writer(21);
    w.uint(70);

    w.uint(msg.frameId);
    w.uint(msg.id);

    w.checkpoint();
    return w.flush();
}

function IOSBatchMeta(msg) {
    const w = new writer(31);
    w.uint(107);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.uint(msg.firstIndex);

    w.checkpoint();
    return w.flush();
}

function IOSSessionStart(msg) {
    const w = new writer(
        101 +
            len(msg.trackerVersion) +
            len(msg.revId) +
            len(msg.userUUID) +
            len(msg.userOS) +
            len(msg.userOSVersion) +
            len(msg.userDevice) +
            len(msg.userDeviceType) +
            len(msg.userCountry)
    );
    w.uint(90);

    w.uint(msg.timestamp);
    w.uint(msg.projectId);
    w.string(msg.trackerVersion);
    w.string(msg.revId);
    w.string(msg.userUUID);
    w.string(msg.userOS);
    w.string(msg.userOSVersion);
    w.string(msg.userDevice);
    w.string(msg.userDeviceType);
    w.string(msg.userCountry);

    w.checkpoint();
    return w.flush();
}

function IOSSessionEnd(msg) {
    const w = new writer(11);
    w.uint(91);

    w.uint(msg.timestamp);

    w.checkpoint();
    return w.flush();
}

function IOSMetadata(msg) {
    const w = new writer(41 + len(msg.key) + len(msg.value));
    w.uint(92);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.key);
    w.string(msg.value);

    w.checkpoint();
    return w.flush();
}

function IOSCustomEvent(msg) {
    const w = new writer(41 + len(msg.name) + len(msg.payload));
    w.uint(93);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.name);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

function IOSUserID(msg) {
    const w = new writer(31 + len(msg.value));
    w.uint(94);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.value);

    w.checkpoint();
    return w.flush();
}

function IOSUserAnonymousID(msg) {
    const w = new writer(31 + len(msg.value));
    w.uint(95);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.value);

    w.checkpoint();
    return w.flush();
}

function IOSScreenChanges(msg) {
    const w = new writer(61);
    w.uint(96);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.uint(msg.x);
    w.uint(msg.y);
    w.uint(msg.width);
    w.uint(msg.height);

    w.checkpoint();
    return w.flush();
}

function IOSCrash(msg) {
    const w = new writer(51 + len(msg.name) + len(msg.reason) + len(msg.stacktrace));
    w.uint(97);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.name);
    w.string(msg.reason);
    w.string(msg.stacktrace);

    w.checkpoint();
    return w.flush();
}

function IOSScreenEnter(msg) {
    const w = new writer(41 + len(msg.title) + len(msg.viewName));
    w.uint(98);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.title);
    w.string(msg.viewName);

    w.checkpoint();
    return w.flush();
}

function IOSScreenLeave(msg) {
    const w = new writer(41 + len(msg.title) + len(msg.viewName));
    w.uint(99);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.title);
    w.string(msg.viewName);

    w.checkpoint();
    return w.flush();
}

function IOSClickEvent(msg) {
    const w = new writer(51 + len(msg.label));
    w.uint(100);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.label);
    w.uint(msg.x);
    w.uint(msg.y);

    w.checkpoint();
    return w.flush();
}

function IOSInputEvent(msg) {
    const w = new writer(51 + len(msg.value) + len(msg.label));
    w.uint(101);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.value);
    w.boolean(msg.valueMasked);
    w.string(msg.label);

    w.checkpoint();
    return w.flush();
}

function IOSPerformanceEvent(msg) {
    const w = new writer(41 + len(msg.name));
    w.uint(102);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.name);
    w.uint(msg.value);

    w.checkpoint();
    return w.flush();
}

function IOSLog(msg) {
    const w = new writer(41 + len(msg.severity) + len(msg.content));
    w.uint(103);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.severity);
    w.string(msg.content);

    w.checkpoint();
    return w.flush();
}

function IOSInternalError(msg) {
    const w = new writer(31 + len(msg.content));
    w.uint(104);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.string(msg.content);

    w.checkpoint();
    return w.flush();
}

function IOSNetworkCall(msg) {
    const w = new writer(91 + len(msg.headers) + len(msg.body) + len(msg.url) + len(msg.method));
    w.uint(105);

    w.uint(msg.timestamp);
    w.uint(msg.length);
    w.uint(msg.duration);
    w.string(msg.headers);
    w.string(msg.body);
    w.string(msg.url);
    w.boolean(msg.success);
    w.string(msg.method);
    w.uint(msg.Status);

    w.checkpoint();
    return w.flush();
}

function IOSPerformanceAggregated(msg) {
    const w = new writer(141);
    w.uint(110);

    w.uint(msg.timestampStart);
    w.uint(msg.timestampEnd);
    w.uint(msg.minFPS);
    w.uint(msg.avgFPS);
    w.uint(msg.maxFPS);
    w.uint(msg.minCPU);
    w.uint(msg.avgCPU);
    w.uint(msg.maxCPU);
    w.uint(msg.minMemory);
    w.uint(msg.avgMemory);
    w.uint(msg.maxMemory);
    w.uint(msg.minBattery);
    w.uint(msg.avgBattery);
    w.uint(msg.maxBattery);

    w.checkpoint();
    return w.flush();
}

function IOSIssueEvent(msg) {
    const w = new writer(51 + len(msg.type) + len(msg.contextString) + len(msg.context) + len(msg.payload));
    w.uint(111);

    w.uint(msg.timestamp);
    w.string(msg.type);
    w.string(msg.contextString);
    w.string(msg.context);
    w.string(msg.payload);

    w.checkpoint();
    return w.flush();
}

const metadataMessage = new Map();
metadataMessage.set(80, batchMeta);
metadataMessage.set(0, timestamp);
metadataMessage.set(1, SessionStart);
metadataMessage.set(2, SessionDisconnect);
metadataMessage.set(3, SessionEnd);
metadataMessage.set(4, SetPageLocation);
metadataMessage.set(5, SetViewportSize);
metadataMessage.set(6, SetViewportScroll);
metadataMessage.set(7, CreateDocument);
metadataMessage.set(8, CreateElementNode);
metadataMessage.set(9, CreateTextNode);
metadataMessage.set(10, MoveNode);
metadataMessage.set(11, RemoveNode);
metadataMessage.set(12, SetNodeAttribute);
metadataMessage.set(13, RemoveNodeAttribute);
metadataMessage.set(14, SetNodeData);
metadataMessage.set(15, SetCSSData);
metadataMessage.set(16, SetNodeScroll);
metadataMessage.set(17, SetInputTarget);
metadataMessage.set(18, SetInputValue);
metadataMessage.set(19, SetInputChecked);
metadataMessage.set(20, MouseMove);
metadataMessage.set(21, MouseClickDepricated);
metadataMessage.set(22, ConsoleLog);
metadataMessage.set(23, PageLoadTiming);
metadataMessage.set(24, PageRenderTiming);
metadataMessage.set(25, JSException);
metadataMessage.set(26, RawErrorEvent);
metadataMessage.set(27, RawCustomEvent);
metadataMessage.set(28, UserID);
metadataMessage.set(29, UserAnonymousID);
metadataMessage.set(30, Metadata);
metadataMessage.set(31, PageEvent);
metadataMessage.set(32, InputEvent);
metadataMessage.set(33, ClickEvent);
metadataMessage.set(34, ErrorEvent);
metadataMessage.set(35, ResourceEvent);
metadataMessage.set(36, CustomEvent);
metadataMessage.set(37, CSSInsertRule);
metadataMessage.set(38, CSSDeleteRule);
metadataMessage.set(39, Fetch);
metadataMessage.set(40, Profiler);
metadataMessage.set(41, OTable);
metadataMessage.set(42, StateAction);
metadataMessage.set(43, StateActionEvent);
metadataMessage.set(44, Redux);
metadataMessage.set(45, Vuex);
metadataMessage.set(46, MobX);
metadataMessage.set(47, NgRx);
metadataMessage.set(48, GraphQL);
metadataMessage.set(49, PerformanceTrack);
metadataMessage.set(50, GraphQLEvent);
metadataMessage.set(52, DOMDrop);
metadataMessage.set(53, ResourceTiming);
metadataMessage.set(54, ConnectionInformation);
metadataMessage.set(55, SetPageVisibility);
metadataMessage.set(56, PerformanceTrackAggr);
metadataMessage.set(59, LongTask);
metadataMessage.set(60, SetNodeAttributeURLBased);
metadataMessage.set(61, SetCSSDataURLBased);
metadataMessage.set(62, IssueEvent);
metadataMessage.set(63, TechnicalInfo);
metadataMessage.set(64, CustomIssue);
metadataMessage.set(65, PageClose);
metadataMessage.set(66, AssetCache);
metadataMessage.set(67, CSSInsertRuleURLBased);
metadataMessage.set(69, MouseClick);
metadataMessage.set(70, CreateIFrameDocument);
metadataMessage.set(107, IOSBatchMeta);
metadataMessage.set(90, IOSSessionStart);
metadataMessage.set(91, IOSSessionEnd);
metadataMessage.set(92, IOSMetadata);
metadataMessage.set(93, IOSCustomEvent);
metadataMessage.set(94, IOSUserID);
metadataMessage.set(95, IOSUserAnonymousID);
metadataMessage.set(96, IOSScreenChanges);
metadataMessage.set(97, IOSCrash);
metadataMessage.set(98, IOSScreenEnter);
metadataMessage.set(99, IOSScreenLeave);
metadataMessage.set(100, IOSClickEvent);
metadataMessage.set(101, IOSInputEvent);
metadataMessage.set(102, IOSPerformanceEvent);
metadataMessage.set(103, IOSLog);
metadataMessage.set(104, IOSInternalError);
metadataMessage.set(105, IOSNetworkCall);
metadataMessage.set(110, IOSPerformanceAggregated);
metadataMessage.set(111, IOSIssueEvent);

export default function ServiceEnCodeMessage(msg) {
    // console.log(msg.tp);
    const mt = {
        set_page_location: 4,
    };

    const fun = metadataMessage.get(mt[msg.tp]);
    return fun(msg);
}
