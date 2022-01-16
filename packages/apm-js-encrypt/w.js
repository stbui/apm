'use strict';
function t(t) {
    function s(...s) {
        return new t(...s);
    }
    return (s.prototype = t.prototype), s;
}
const s = new Map();
const i = t(
    class {
        constructor(t, s, i) {
            (this.pageNo = t), (this.firstIndex = s), (this.timestamp = i), (this._id = 80);
        }
        encode(t) {
            return t.uint(80) && t.uint(this.pageNo) && t.uint(this.firstIndex) && t.int(this.timestamp);
        }
    }
);
s.set(80, i);
const n = t(
    class {
        constructor(t) {
            (this.timestamp = t), (this._id = 0);
        }
        encode(t) {
            return t.uint(0) && t.uint(this.timestamp);
        }
    }
);
s.set(0, n);
const e = t(
    class {
        constructor(t, s, i) {
            (this.url = t), (this.referrer = s), (this.navigationStart = i), (this._id = 4);
        }
        encode(t) {
            return t.uint(4) && t.string(this.url) && t.string(this.referrer) && t.uint(this.navigationStart);
        }
    }
);
s.set(4, e);
const r = t(
    class {
        constructor(t, s) {
            (this.width = t), (this.height = s), (this._id = 5);
        }
        encode(t) {
            return t.uint(5) && t.uint(this.width) && t.uint(this.height);
        }
    }
);
s.set(5, r);
const o = t(
    class {
        constructor(t, s) {
            (this.x = t), (this.y = s), (this._id = 6);
        }
        encode(t) {
            return t.uint(6) && t.int(this.x) && t.int(this.y);
        }
    }
);
s.set(6, o);
const h = t(
    class {
        constructor() {
            this._id = 7;
        }
        encode(t) {
            return t.uint(7);
        }
    }
);
s.set(7, h);
const c = t(
    class {
        constructor(t, s, i, n, e) {
            (this.id = t), (this.parentID = s), (this.index = i), (this.tag = n), (this.svg = e), (this._id = 8);
        }
        encode(t) {
            return (
                t.uint(8) &&
                t.uint(this.id) &&
                t.uint(this.parentID) &&
                t.uint(this.index) &&
                t.string(this.tag) &&
                t.boolean(this.svg)
            );
        }
    }
);
s.set(8, c);
const u = t(
    class {
        constructor(t, s, i) {
            (this.id = t), (this.parentID = s), (this.index = i), (this._id = 9);
        }
        encode(t) {
            return t.uint(9) && t.uint(this.id) && t.uint(this.parentID) && t.uint(this.index);
        }
    }
);
s.set(9, u);
const a = t(
    class {
        constructor(t, s, i) {
            (this.id = t), (this.parentID = s), (this.index = i), (this._id = 10);
        }
        encode(t) {
            return t.uint(10) && t.uint(this.id) && t.uint(this.parentID) && t.uint(this.index);
        }
    }
);
s.set(10, a);
const d = t(
    class {
        constructor(t) {
            (this.id = t), (this._id = 11);
        }
        encode(t) {
            return t.uint(11) && t.uint(this.id);
        }
    }
);
s.set(11, d);
const l = t(
    class {
        constructor(t, s, i) {
            (this.id = t), (this.name = s), (this.value = i), (this._id = 12);
        }
        encode(t) {
            return t.uint(12) && t.uint(this.id) && t.string(this.name) && t.string(this.value);
        }
    }
);
s.set(12, l);
const g = t(
    class {
        constructor(t, s) {
            (this.id = t), (this.name = s), (this._id = 13);
        }
        encode(t) {
            return t.uint(13) && t.uint(this.id) && t.string(this.name);
        }
    }
);
s.set(13, g);
const f = t(
    class {
        constructor(t, s) {
            (this.id = t), (this.data = s), (this._id = 14);
        }
        encode(t) {
            return t.uint(14) && t.uint(this.id) && t.string(this.data);
        }
    }
);
s.set(14, f);
const p = t(
    class {
        constructor(t, s, i) {
            (this.id = t), (this.x = s), (this.y = i), (this._id = 16);
        }
        encode(t) {
            return t.uint(16) && t.uint(this.id) && t.int(this.x) && t.int(this.y);
        }
    }
);
s.set(16, p);
const m = t(
    class {
        constructor(t, s) {
            (this.id = t), (this.label = s), (this._id = 17);
        }
        encode(t) {
            return t.uint(17) && t.uint(this.id) && t.string(this.label);
        }
    }
);
s.set(17, m);
const _ = t(
    class {
        constructor(t, s, i) {
            (this.id = t), (this.value = s), (this.mask = i), (this._id = 18);
        }
        encode(t) {
            return t.uint(18) && t.uint(this.id) && t.string(this.value) && t.int(this.mask);
        }
    }
);
s.set(18, _);
const y = t(
    class {
        constructor(t, s) {
            (this.id = t), (this.checked = s), (this._id = 19);
        }
        encode(t) {
            return t.uint(19) && t.uint(this.id) && t.boolean(this.checked);
        }
    }
);
s.set(19, y);
const v = t(
    class {
        constructor(t, s) {
            (this.x = t), (this.y = s), (this._id = 20);
        }
        encode(t) {
            return t.uint(20) && t.uint(this.x) && t.uint(this.y);
        }
    }
);
s.set(20, v);
const S = t(
    class {
        constructor(t, s) {
            (this.level = t), (this.value = s), (this._id = 22);
        }
        encode(t) {
            return t.uint(22) && t.string(this.level) && t.string(this.value);
        }
    }
);
s.set(22, S);
const b = t(
    class {
        constructor(t, s, i, n, e, r, o, h, c) {
            (this.requestStart = t),
                (this.responseStart = s),
                (this.responseEnd = i),
                (this.domContentLoadedEventStart = n),
                (this.domContentLoadedEventEnd = e),
                (this.loadEventStart = r),
                (this.loadEventEnd = o),
                (this.firstPaint = h),
                (this.firstContentfulPaint = c),
                (this._id = 23);
        }
        encode(t) {
            return (
                t.uint(23) &&
                t.uint(this.requestStart) &&
                t.uint(this.responseStart) &&
                t.uint(this.responseEnd) &&
                t.uint(this.domContentLoadedEventStart) &&
                t.uint(this.domContentLoadedEventEnd) &&
                t.uint(this.loadEventStart) &&
                t.uint(this.loadEventEnd) &&
                t.uint(this.firstPaint) &&
                t.uint(this.firstContentfulPaint)
            );
        }
    }
);
s.set(23, b);
const x = t(
    class {
        constructor(t, s, i) {
            (this.speedIndex = t), (this.visuallyComplete = s), (this.timeToInteractive = i), (this._id = 24);
        }
        encode(t) {
            return (
                t.uint(24) && t.uint(this.speedIndex) && t.uint(this.visuallyComplete) && t.uint(this.timeToInteractive)
            );
        }
    }
);
s.set(24, x);
const E = t(
    class {
        constructor(t, s, i) {
            (this.name = t), (this.message = s), (this.payload = i), (this._id = 25);
        }
        encode(t) {
            return t.uint(25) && t.string(this.name) && t.string(this.message) && t.string(this.payload);
        }
    }
);
s.set(25, E);
const k = t(
    class {
        constructor(t, s) {
            (this.name = t), (this.payload = s), (this._id = 27);
        }
        encode(t) {
            return t.uint(27) && t.string(this.name) && t.string(this.payload);
        }
    }
);
s.set(27, k);
const I = t(
    class {
        constructor(t) {
            (this.id = t), (this._id = 28);
        }
        encode(t) {
            return t.uint(28) && t.string(this.id);
        }
    }
);
s.set(28, I);
const z = t(
    class {
        constructor(t) {
            (this.id = t), (this._id = 29);
        }
        encode(t) {
            return t.uint(29) && t.string(this.id);
        }
    }
);
s.set(29, z);
const w = t(
    class {
        constructor(t, s) {
            (this.key = t), (this.value = s), (this._id = 30);
        }
        encode(t) {
            return t.uint(30) && t.string(this.key) && t.string(this.value);
        }
    }
);
s.set(30, w);
const T = t(
    class {
        constructor(t, s, i) {
            (this.id = t), (this.rule = s), (this.index = i), (this._id = 37);
        }
        encode(t) {
            return t.uint(37) && t.uint(this.id) && t.string(this.rule) && t.uint(this.index);
        }
    }
);
s.set(37, T);
const L = t(
    class {
        constructor(t, s) {
            (this.id = t), (this.index = s), (this._id = 38);
        }
        encode(t) {
            return t.uint(38) && t.uint(this.id) && t.uint(this.index);
        }
    }
);
s.set(38, L);
const A = t(
    class {
        constructor(t, s, i, n, e, r, o) {
            (this.method = t),
                (this.url = s),
                (this.request = i),
                (this.response = n),
                (this.status = e),
                (this.timestamp = r),
                (this.duration = o),
                (this._id = 39);
        }
        encode(t) {
            return (
                t.uint(39) &&
                t.string(this.method) &&
                t.string(this.url) &&
                t.string(this.request) &&
                t.string(this.response) &&
                t.uint(this.status) &&
                t.uint(this.timestamp) &&
                t.uint(this.duration)
            );
        }
    }
);
s.set(39, A);
const C = t(
    class {
        constructor(t, s, i, n) {
            (this.name = t), (this.duration = s), (this.args = i), (this.result = n), (this._id = 40);
        }
        encode(t) {
            return (
                t.uint(40) &&
                t.string(this.name) &&
                t.uint(this.duration) &&
                t.string(this.args) &&
                t.string(this.result)
            );
        }
    }
);
s.set(40, C);
const M = t(
    class {
        constructor(t, s) {
            (this.key = t), (this.value = s), (this._id = 41);
        }
        encode(t) {
            return t.uint(41) && t.string(this.key) && t.string(this.value);
        }
    }
);
s.set(41, M);
const R = t(
    class {
        constructor(t) {
            (this.type = t), (this._id = 42);
        }
        encode(t) {
            return t.uint(42) && t.string(this.type);
        }
    }
);
s.set(42, R);
const N = t(
    class {
        constructor(t, s, i) {
            (this.action = t), (this.state = s), (this.duration = i), (this._id = 44);
        }
        encode(t) {
            return t.uint(44) && t.string(this.action) && t.string(this.state) && t.uint(this.duration);
        }
    }
);
s.set(44, N);
const D = t(
    class {
        constructor(t, s) {
            (this.mutation = t), (this.state = s), (this._id = 45);
        }
        encode(t) {
            return t.uint(45) && t.string(this.mutation) && t.string(this.state);
        }
    }
);
s.set(45, D);
const U = t(
    class {
        constructor(t, s) {
            (this.type = t), (this.payload = s), (this._id = 46);
        }
        encode(t) {
            return t.uint(46) && t.string(this.type) && t.string(this.payload);
        }
    }
);
s.set(46, U);
const O = t(
    class {
        constructor(t, s, i) {
            (this.action = t), (this.state = s), (this.duration = i), (this._id = 47);
        }
        encode(t) {
            return t.uint(47) && t.string(this.action) && t.string(this.state) && t.uint(this.duration);
        }
    }
);
s.set(47, O);
const q = t(
    class {
        constructor(t, s, i, n) {
            (this.operationKind = t),
                (this.operationName = s),
                (this.variables = i),
                (this.response = n),
                (this._id = 48);
        }
        encode(t) {
            return (
                t.uint(48) &&
                t.string(this.operationKind) &&
                t.string(this.operationName) &&
                t.string(this.variables) &&
                t.string(this.response)
            );
        }
    }
);
s.set(48, q);
const H = t(
    class {
        constructor(t, s, i, n) {
            (this.frames = t), (this.ticks = s), (this.totalJSHeapSize = i), (this.usedJSHeapSize = n), (this._id = 49);
        }
        encode(t) {
            return (
                t.uint(49) &&
                t.int(this.frames) &&
                t.int(this.ticks) &&
                t.uint(this.totalJSHeapSize) &&
                t.uint(this.usedJSHeapSize)
            );
        }
    }
);
s.set(49, H);
const P = t(
    class {
        constructor(t, s, i, n, e, r, o, h) {
            (this.timestamp = t),
                (this.duration = s),
                (this.ttfb = i),
                (this.headerSize = n),
                (this.encodedBodySize = e),
                (this.decodedBodySize = r),
                (this.url = o),
                (this.initiator = h),
                (this._id = 53);
        }
        encode(t) {
            return (
                t.uint(53) &&
                t.uint(this.timestamp) &&
                t.uint(this.duration) &&
                t.uint(this.ttfb) &&
                t.uint(this.headerSize) &&
                t.uint(this.encodedBodySize) &&
                t.uint(this.decodedBodySize) &&
                t.string(this.url) &&
                t.string(this.initiator)
            );
        }
    }
);
s.set(53, P);
const B = t(
    class {
        constructor(t, s) {
            (this.downlink = t), (this.type = s), (this._id = 54);
        }
        encode(t) {
            return t.uint(54) && t.uint(this.downlink) && t.string(this.type);
        }
    }
);
s.set(54, B);
const J = t(
    class {
        constructor(t) {
            (this.hidden = t), (this._id = 55);
        }
        encode(t) {
            return t.uint(55) && t.boolean(this.hidden);
        }
    }
);
s.set(55, J);
const j = t(
    class {
        constructor(t, s, i, n, e, r, o) {
            (this.timestamp = t),
                (this.duration = s),
                (this.context = i),
                (this.containerType = n),
                (this.containerSrc = e),
                (this.containerId = r),
                (this.containerName = o),
                (this._id = 59);
        }
        encode(t) {
            return (
                t.uint(59) &&
                t.uint(this.timestamp) &&
                t.uint(this.duration) &&
                t.uint(this.context) &&
                t.uint(this.containerType) &&
                t.string(this.containerSrc) &&
                t.string(this.containerId) &&
                t.string(this.containerName)
            );
        }
    }
);
s.set(59, j);
const G = t(
    class {
        constructor(t, s, i, n) {
            (this.id = t), (this.name = s), (this.value = i), (this.baseURL = n), (this._id = 60);
        }
        encode(t) {
            return (
                t.uint(60) && t.uint(this.id) && t.string(this.name) && t.string(this.value) && t.string(this.baseURL)
            );
        }
    }
);
s.set(60, G);
const K = t(
    class {
        constructor(t, s, i) {
            (this.id = t), (this.data = s), (this.baseURL = i), (this._id = 61);
        }
        encode(t) {
            return t.uint(61) && t.uint(this.id) && t.string(this.data) && t.string(this.baseURL);
        }
    }
);
s.set(61, K);
const X = t(
    class {
        constructor(t, s) {
            (this.type = t), (this.value = s), (this._id = 63);
        }
        encode(t) {
            return t.uint(63) && t.string(this.type) && t.string(this.value);
        }
    }
);
s.set(63, X);
const F = t(
    class {
        constructor(t, s) {
            (this.name = t), (this.payload = s), (this._id = 64);
        }
        encode(t) {
            return t.uint(64) && t.string(this.name) && t.string(this.payload);
        }
    }
);
s.set(64, F);
const Q = t(
    class {
        constructor() {
            this._id = 65;
        }
        encode(t) {
            return t.uint(65);
        }
    }
);
s.set(65, Q);
const V = t(
    class {
        constructor(t, s, i, n) {
            (this.id = t), (this.rule = s), (this.index = i), (this.baseURL = n), (this._id = 67);
        }
        encode(t) {
            return t.uint(67) && t.uint(this.id) && t.string(this.rule) && t.uint(this.index) && t.string(this.baseURL);
        }
    }
);
s.set(67, V);
const W = t(
    class {
        constructor(t, s, i, n) {
            (this.id = t), (this.hesitationTime = s), (this.label = i), (this.selector = n), (this._id = 69);
        }
        encode(t) {
            return (
                t.uint(69) &&
                t.uint(this.id) &&
                t.uint(this.hesitationTime) &&
                t.string(this.label) &&
                t.string(this.selector)
            );
        }
    }
);
s.set(69, W);
const Y = t(
    class {
        constructor(t, s) {
            (this.frameID = t), (this.id = s), (this._id = 70);
        }
        encode(t) {
            return t.uint(70) && t.uint(this.frameID) && t.uint(this.id);
        }
    }
);
s.set(70, Y);
const Z =
    'function' == typeof TextEncoder
        ? new TextEncoder()
        : {
              encode(t) {
                  const s = t.length,
                      i = new Uint8Array(3 * s);
                  let n = -1;
                  for (var e = 0, r = 0, o = 0; o !== s; ) {
                      if (((e = t.charCodeAt(o)), (o += 1), e >= 55296 && e <= 56319)) {
                          if (o === s) {
                              (i[(n += 1)] = 239), (i[(n += 1)] = 191), (i[(n += 1)] = 189);
                              break;
                          }
                          if (!((r = t.charCodeAt(o)) >= 56320 && r <= 57343)) {
                              (i[(n += 1)] = 239), (i[(n += 1)] = 191), (i[(n += 1)] = 189);
                              continue;
                          }
                          if (((o += 1), (e = 1024 * (e - 55296) + r - 56320 + 65536) > 65535)) {
                              (i[(n += 1)] = 240 | (e >>> 18)),
                                  (i[(n += 1)] = 128 | ((e >>> 12) & 63)),
                                  (i[(n += 1)] = 128 | ((e >>> 6) & 63)),
                                  (i[(n += 1)] = 128 | (63 & e));
                              continue;
                          }
                      }
                      e <= 127
                          ? (i[(n += 1)] = 0 | e)
                          : e <= 2047
                          ? ((i[(n += 1)] = 192 | (e >>> 6)), (i[(n += 1)] = 128 | (63 & e)))
                          : ((i[(n += 1)] = 224 | (e >>> 12)),
                            (i[(n += 1)] = 128 | ((e >>> 6) & 63)),
                            (i[(n += 1)] = 128 | (63 & e)));
                  }
                  return i.subarray(0, n + 1);
              },
          };
class tt {
    constructor(t) {
        (this.size = t), (this.offset = 0), (this.checkpointOffset = 0), (this.data = new Uint8Array(t));
    }
    checkpoint() {
        this.checkpointOffset = this.offset;
    }
    isEmpty() {
        return 0 === this.offset;
    }
    boolean(t) {
        return (this.data[this.offset++] = +t), this.offset <= this.size;
    }
    uint(t) {
        for ((t < 0 || t > Number.MAX_SAFE_INTEGER) && (t = 0); t >= 128; )
            (this.data[this.offset++] = t % 256 | 128), (t = Math.floor(t / 128));
        return (this.data[this.offset++] = t), this.offset <= this.size;
    }
    int(t) {
        return (t = Math.round(t)), this.uint(t >= 0 ? 2 * t : -2 * t - 1);
    }
    string(t) {
        const s = Z.encode(t),
            i = s.byteLength;
        return (
            !(!this.uint(i) || this.offset + i > this.size) && (this.data.set(s, this.offset), (this.offset += i), !0)
        );
    }
    reset() {
        (this.offset = 0), (this.checkpointOffset = 0);
    }
    flush() {
        const t = this.data.slice(0, this.checkpointOffset);
        return this.reset(), t;
    }
}
let st = 1e6,
    it = 2e5,
    nt = new tt(it),
    et = '',
    rt = '',
    ot = 0,
    ht = 0,
    ct = 0,
    ut = 0,
    at = !0;
function dt() {
    return new i(ot, ut, ht).encode(nt);
}
let lt = null;
const gt = [];
let ft,
    pt = !1,
    mt = 0,
    _t = 8e3,
    yt = 10;
function vt() {
    if (at || '' === rt || '' === et) return;
    const t = nt.flush();
    pt
        ? gt.push(t)
        : ((pt = !0),
          (function t(s) {
              const i = new XMLHttpRequest();
              i.open('POST', et + '/v1/web/i', !1),
                  i.setRequestHeader('Authorization', 'Bearer ' + rt),
                  (i.onreadystatechange = function () {
                      if (4 === this.readyState) {
                          if (0 == this.status) return;
                          if (this.status >= 400)
                              return (
                                  St(),
                                  (gt.length = 0),
                                  401 === this.status ? void self.postMessage('restart') : void self.postMessage(null)
                              );
                          const s = gt.shift();
                          s ? t(s) : (pt = !1);
                      }
                  }),
                  (i.onerror = function (i) {
                      if (mt >= yt) return St(), void self.postMessage(null);
                      mt++, setTimeout(() => t(s), _t);
                  }),
                  i.send(s.buffer);
          })(t)),
        (at = !0),
        dt();
}
function St() {
    (et = ''), (rt = ''), null !== lt && (clearInterval(lt), (lt = null)), nt.reset();
}
self.onmessage = ({ data: t }) => {
    if (null !== t)
        return 'stop' === t
            ? (vt(), void St())
            : Array.isArray(t)
            ? void t.forEach(t => {
                  const i = new (s.get(t._id))();
                  if (
                      (Object.assign(i, t),
                      i instanceof n
                          ? (ht = i.timestamp)
                          : i instanceof J &&
                            (i.hidden ? (ft = setTimeout(() => self.postMessage('restart'), 18e5)) : clearTimeout(ft)),
                      nt.checkpoint(),
                      !i.encode(nt) && (vt(), !i.encode(nt)))
                  )
                      for (; !i.encode(nt); ) {
                          if (it === st)
                              return console.warn('OpenReplay: beacon size overflow.'), nt.reset(), void dt();
                          (it = Math.min(2 * it, st)), (nt = new tt(it)), dt();
                      }
                  ut++, (at = !1);
              })
            : ((et = t.ingestPoint || et),
              (rt = t.token || rt),
              (ot = t.pageNo || ot),
              (ht = t.startTimestamp || ht),
              (ct = t.timeAdjustment || ct),
              (yt = t.connAttemptCount || yt),
              (_t = t.connAttemptGap || _t),
              (st = t.beaconSizeLimit || st),
              (it = Math.min(st, t.beaconSize || it)),
              nt.isEmpty() && dt(),
              void (null === lt && (lt = setInterval(vt, 1e4))));
    vt();
};
