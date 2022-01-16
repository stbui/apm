!(function () {
    'use strict';
    function l(e) {
        return (l =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                      return typeof e;
                  }
                : function (e) {
                      return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                          ? 'symbol'
                          : typeof e;
                  })(e);
    }
    function H(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
    }
    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
        }
    }
    function s(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e;
    }
    function n(e, t) {
        if ('function' != typeof t && null !== t)
            throw new TypeError('Super expression must either be null or a function');
        (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
            t && i(e, t);
    }
    function o(e) {
        return (o = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
              })(e);
    }
    function i(e, t) {
        return (i =
            Object.setPrototypeOf ||
            function (e, t) {
                return (e.__proto__ = t), e;
            })(e, t);
    }
    function a() {
        if ('undefined' != typeof Reflect && Reflect.construct && !Reflect.construct.sham) {
            if ('function' == typeof Proxy) return 1;
            try {
                return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), 1;
            } catch (e) {
                return;
            }
        }
    }
    function c(e, t, n) {
        return (c = a()
            ? Reflect.construct
            : function (e, t, n) {
                  var r = [null];
                  r.push.apply(r, t);
                  r = new (Function.bind.apply(e, r))();
                  return n && i(r, n.prototype), r;
              }).apply(null, arguments);
    }
    function u(e, t) {
        return !t || ('object' != typeof t && 'function' != typeof t)
            ? (function (e) {
                  if (void 0 === e)
                      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                  return e;
              })(e)
            : t;
    }
    function d(n) {
        return function () {
            var e,
                t = o(n);
            return u(
                this,
                a() ? ((e = o(this).constructor), Reflect.construct(t, arguments, e)) : t.apply(this, arguments)
            );
        };
    }
    function p(e, t, n) {
        return (p =
            'undefined' != typeof Reflect && Reflect.get
                ? Reflect.get
                : function (e, t, n) {
                      e = (function (e, t) {
                          for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = o(e)); );
                          return e;
                      })(e, t);
                      if (e) {
                          t = Object.getOwnPropertyDescriptor(e, t);
                          return t.get ? t.get.call(n) : t.value;
                      }
                  })(e, t, n || e);
    }
    function h(e, t) {
        return (
            (function (e) {
                if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
                if ('undefined' != typeof Symbol && Symbol.iterator in Object(e)) {
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (
                            var s, a = e[Symbol.iterator]();
                            !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t);
                            r = !0
                        );
                    } catch (e) {
                        (i = !0), (o = e);
                    } finally {
                        try {
                            r || null == a.return || a.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                    return n;
                }
            })(e, t) ||
            f(e, t) ||
            (function () {
                throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                );
            })()
        );
    }
    function f(e, t) {
        if (e) {
            if ('string' == typeof e) return m(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return 'Map' === (n = 'Object' === n && e.constructor ? e.constructor.name : n) || 'Set' === n
                ? Array.from(n)
                : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? m(e, t)
                : void 0;
        }
    }
    function m(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
    }
    function V(e) {
        if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
            if (Array.isArray(e) || (e = f(e))) {
                var t = 0,
                    n = function () {};
                return {
                    s: n,
                    n: function () {
                        return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };
                    },
                    e: function (e) {
                        throw e;
                    },
                    f: n,
                };
            }
            throw new TypeError(
                'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
        }
        var r,
            i,
            o = !0,
            s = !1;
        return {
            s: function () {
                r = e[Symbol.iterator]();
            },
            n: function () {
                var e = r.next();
                return (o = e.done), e;
            },
            e: function (e) {
                (s = !0), (i = e);
            },
            f: function () {
                try {
                    o || null == r.return || r.return();
                } finally {
                    if (s) throw i;
                }
            },
        };
    }
    'undefined' != typeof window && (window.parcelRequire = window.parcelRequire || void 0);
    function v() {
        throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }
    function e(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    }
    var t,
        y = e(function (u, e) {
            parcelRequire = (function (i, o, e) {
                var t,
                    s = 'function' == typeof parcelRequire && parcelRequire,
                    a = v;
                function c(t, e) {
                    if (!o[t]) {
                        if (!i[t]) {
                            var n = 'function' == typeof parcelRequire && parcelRequire;
                            if (!e && n) return n(t, !0);
                            if (s) return s(t, !0);
                            if (a && 'string' == typeof t) return a(t);
                            n = new Error("Cannot find module '" + t + "'");
                            throw ((n.code = 'MODULE_NOT_FOUND'), n);
                        }
                        (r.resolve = function (e) {
                            return i[t][1][e] || e;
                        }),
                            (r.cache = {});
                        n = o[t] = new c.Module(t);
                        i[t][0].call(n.exports, r, n, n.exports, this);
                    }
                    return o[t].exports;
                    function r(e) {
                        return c(r.resolve(e));
                    }
                }
                (c.isParcelRequire = !0),
                    (c.Module = function (e) {
                        (this.id = e), (this.bundle = c), (this.exports = {});
                    }),
                    (c.modules = i),
                    (c.cache = o),
                    (c.parent = s),
                    (c.register = function (e, n) {
                        i[e] = [
                            function (e, t) {
                                t.exports = n;
                            },
                            {},
                        ];
                    });
                for (var n, r = 0; r < e.length; r++)
                    try {
                        c(e[r]);
                    } catch (i) {
                        t = t || i;
                    }
                if ((e.length && ((n = c(e[e.length - 1])), (u.exports = n)), (parcelRequire = c), t)) throw t;
                return c;
            })(
                {
                    EgBh: [
                        function (e, t, n) {
                            var r = {};
                            (r.useBlobBuilder = (function () {
                                try {
                                    return new Blob([]), !1;
                                } catch (e) {
                                    return !0;
                                }
                            })()),
                                (r.useArrayBufferView =
                                    !r.useBlobBuilder &&
                                    (function () {
                                        try {
                                            return 0 === new Blob([new Uint8Array([])]).size;
                                        } catch (e) {
                                            return !0;
                                        }
                                    })()),
                                (t.exports.binaryFeatures = r);
                            var i = t.exports.BlobBuilder;
                            function o() {
                                (this._pieces = []), (this._parts = []);
                            }
                            'undefined' != typeof window &&
                                (i = t.exports.BlobBuilder =
                                    window.WebKitBlobBuilder ||
                                    window.MozBlobBuilder ||
                                    window.MSBlobBuilder ||
                                    window.BlobBuilder),
                                (o.prototype.append = function (e) {
                                    'number' == typeof e ? this._pieces.push(e) : (this.flush(), this._parts.push(e));
                                }),
                                (o.prototype.flush = function () {
                                    var e;
                                    0 < this._pieces.length &&
                                        ((e = new Uint8Array(this._pieces)),
                                        r.useArrayBufferView || (e = e.buffer),
                                        this._parts.push(e),
                                        (this._pieces = []));
                                }),
                                (o.prototype.getBuffer = function () {
                                    if ((this.flush(), r.useBlobBuilder)) {
                                        for (var e = new i(), t = 0, n = this._parts.length; t < n; t++)
                                            e.append(this._parts[t]);
                                        return e.getBlob();
                                    }
                                    return new Blob(this._parts);
                                }),
                                (t.exports.BufferBuilder = o);
                        },
                        {},
                    ],
                    kdPp: [
                        function (e, t, n) {
                            var r = e('./bufferbuilder').BufferBuilder,
                                i = e('./bufferbuilder').binaryFeatures;
                            function o(e) {
                                (this.index = 0),
                                    (this.dataBuffer = e),
                                    (this.dataView = new Uint8Array(this.dataBuffer)),
                                    (this.length = this.dataBuffer.byteLength);
                            }
                            function s() {
                                this.bufferBuilder = new r();
                            }
                            function a(e) {
                                e = e.charCodeAt(0);
                                return e <= 2047
                                    ? '00'
                                    : e <= 65535
                                    ? '000'
                                    : e <= 2097151
                                    ? '0000'
                                    : e <= 67108863
                                    ? '00000'
                                    : '000000';
                            }
                            (t.exports = {
                                unpack: function (e) {
                                    return new o(e).unpack();
                                },
                                pack: function (e) {
                                    var t = new s();
                                    return t.pack(e), t.getBuffer();
                                },
                            }),
                                (o.prototype.unpack = function () {
                                    var e,
                                        t = this.unpack_uint8();
                                    if (t < 128) return t;
                                    if ((224 ^ t) < 32) return (224 ^ t) - 32;
                                    if ((e = 160 ^ t) <= 15) return this.unpack_raw(e);
                                    if ((e = 176 ^ t) <= 15) return this.unpack_string(e);
                                    if ((e = 144 ^ t) <= 15) return this.unpack_array(e);
                                    if ((e = 128 ^ t) <= 15) return this.unpack_map(e);
                                    switch (t) {
                                        case 192:
                                            return null;
                                        case 193:
                                            return;
                                        case 194:
                                            return !1;
                                        case 195:
                                            return !0;
                                        case 202:
                                            return this.unpack_float();
                                        case 203:
                                            return this.unpack_double();
                                        case 204:
                                            return this.unpack_uint8();
                                        case 205:
                                            return this.unpack_uint16();
                                        case 206:
                                            return this.unpack_uint32();
                                        case 207:
                                            return this.unpack_uint64();
                                        case 208:
                                            return this.unpack_int8();
                                        case 209:
                                            return this.unpack_int16();
                                        case 210:
                                            return this.unpack_int32();
                                        case 211:
                                            return this.unpack_int64();
                                        case 212:
                                        case 213:
                                        case 214:
                                        case 215:
                                            return;
                                        case 216:
                                            return (e = this.unpack_uint16()), this.unpack_string(e);
                                        case 217:
                                            return (e = this.unpack_uint32()), this.unpack_string(e);
                                        case 218:
                                            return (e = this.unpack_uint16()), this.unpack_raw(e);
                                        case 219:
                                            return (e = this.unpack_uint32()), this.unpack_raw(e);
                                        case 220:
                                            return (e = this.unpack_uint16()), this.unpack_array(e);
                                        case 221:
                                            return (e = this.unpack_uint32()), this.unpack_array(e);
                                        case 222:
                                            return (e = this.unpack_uint16()), this.unpack_map(e);
                                        case 223:
                                            return (e = this.unpack_uint32()), this.unpack_map(e);
                                    }
                                }),
                                (o.prototype.unpack_uint8 = function () {
                                    var e = 255 & this.dataView[this.index];
                                    return this.index++, e;
                                }),
                                (o.prototype.unpack_uint16 = function () {
                                    var e = this.read(2),
                                        e = 256 * (255 & e[0]) + (255 & e[1]);
                                    return (this.index += 2), e;
                                }),
                                (o.prototype.unpack_uint32 = function () {
                                    var e = this.read(4),
                                        e = 256 * (256 * (256 * e[0] + e[1]) + e[2]) + e[3];
                                    return (this.index += 4), e;
                                }),
                                (o.prototype.unpack_uint64 = function () {
                                    var e = this.read(8),
                                        e =
                                            256 *
                                                (256 *
                                                    (256 *
                                                        (256 * (256 * (256 * (256 * e[0] + e[1]) + e[2]) + e[3]) +
                                                            e[4]) +
                                                        e[5]) +
                                                    e[6]) +
                                            e[7];
                                    return (this.index += 8), e;
                                }),
                                (o.prototype.unpack_int8 = function () {
                                    var e = this.unpack_uint8();
                                    return e < 128 ? e : e - 256;
                                }),
                                (o.prototype.unpack_int16 = function () {
                                    var e = this.unpack_uint16();
                                    return e < 32768 ? e : e - 65536;
                                }),
                                (o.prototype.unpack_int32 = function () {
                                    var e = this.unpack_uint32();
                                    return e < Math.pow(2, 31) ? e : e - Math.pow(2, 32);
                                }),
                                (o.prototype.unpack_int64 = function () {
                                    var e = this.unpack_uint64();
                                    return e < Math.pow(2, 63) ? e : e - Math.pow(2, 64);
                                }),
                                (o.prototype.unpack_raw = function (e) {
                                    if (this.length < this.index + e)
                                        throw new Error(
                                            'BinaryPackFailure: index is out of range ' +
                                                this.index +
                                                ' ' +
                                                e +
                                                ' ' +
                                                this.length
                                        );
                                    var t = this.dataBuffer.slice(this.index, this.index + e);
                                    return (this.index += e), t;
                                }),
                                (o.prototype.unpack_string = function (e) {
                                    for (var t, n, r = this.read(e), i = 0, o = ''; i < e; )
                                        (t = r[i]) < 128
                                            ? ((o += String.fromCharCode(t)), i++)
                                            : (192 ^ t) < 32
                                            ? ((n = ((192 ^ t) << 6) | (63 & r[i + 1])),
                                              (o += String.fromCharCode(n)),
                                              (i += 2))
                                            : ((n = ((15 & t) << 12) | ((63 & r[i + 1]) << 6) | (63 & r[i + 2])),
                                              (o += String.fromCharCode(n)),
                                              (i += 3));
                                    return (this.index += e), o;
                                }),
                                (o.prototype.unpack_array = function (e) {
                                    for (var t = new Array(e), n = 0; n < e; n++) t[n] = this.unpack();
                                    return t;
                                }),
                                (o.prototype.unpack_map = function (e) {
                                    for (var t = {}, n = 0; n < e; n++) {
                                        var r = this.unpack(),
                                            i = this.unpack();
                                        t[r] = i;
                                    }
                                    return t;
                                }),
                                (o.prototype.unpack_float = function () {
                                    var e = this.unpack_uint32();
                                    return (
                                        (0 == e >> 31 ? 1 : -1) *
                                        ((8388607 & e) | 8388608) *
                                        Math.pow(2, ((e >> 23) & 255) - 127 - 23)
                                    );
                                }),
                                (o.prototype.unpack_double = function () {
                                    var e = this.unpack_uint32(),
                                        t = this.unpack_uint32(),
                                        n = ((e >> 20) & 2047) - 1023;
                                    return (
                                        (0 == e >> 31 ? 1 : -1) *
                                        (((1048575 & e) | 1048576) * Math.pow(2, n - 20) + t * Math.pow(2, n - 52))
                                    );
                                }),
                                (o.prototype.read = function (e) {
                                    var t = this.index;
                                    if (t + e <= this.length) return this.dataView.subarray(t, t + e);
                                    throw new Error('BinaryPackFailure: read index out of range');
                                }),
                                (s.prototype.getBuffer = function () {
                                    return this.bufferBuilder.getBuffer();
                                }),
                                (s.prototype.pack = function (e) {
                                    var t = typeof e;
                                    if ('string' == t) this.pack_string(e);
                                    else if ('number' == t)
                                        Math.floor(e) === e ? this.pack_integer(e) : this.pack_double(e);
                                    else if ('boolean' == t)
                                        !0 === e
                                            ? this.bufferBuilder.append(195)
                                            : !1 === e && this.bufferBuilder.append(194);
                                    else if ('undefined' == t) this.bufferBuilder.append(192);
                                    else {
                                        if ('object' != t) throw new Error('Type "' + t + '" not yet supported');
                                        if (null === e) this.bufferBuilder.append(192);
                                        else {
                                            t = e.constructor;
                                            if (t == Array) this.pack_array(e);
                                            else if (t == Blob || t == File || e instanceof Blob || e instanceof File)
                                                this.pack_bin(e);
                                            else if (t == ArrayBuffer)
                                                i.useArrayBufferView
                                                    ? this.pack_bin(new Uint8Array(e))
                                                    : this.pack_bin(e);
                                            else if ('BYTES_PER_ELEMENT' in e)
                                                i.useArrayBufferView
                                                    ? this.pack_bin(new Uint8Array(e.buffer))
                                                    : this.pack_bin(e.buffer);
                                            else if (t == Object || t.toString().startsWith('class'))
                                                this.pack_object(e);
                                            else if (t == Date) this.pack_string(e.toString());
                                            else {
                                                if ('function' != typeof e.toBinaryPack)
                                                    throw new Error('Type "' + t.toString() + '" not yet supported');
                                                this.bufferBuilder.append(e.toBinaryPack());
                                            }
                                        }
                                    }
                                    this.bufferBuilder.flush();
                                }),
                                (s.prototype.pack_bin = function (e) {
                                    var t = e.length || e.byteLength || e.size;
                                    if (t <= 15) this.pack_uint8(160 + t);
                                    else if (t <= 65535) this.bufferBuilder.append(218), this.pack_uint16(t);
                                    else {
                                        if (!(t <= 4294967295)) throw new Error('Invalid length');
                                        this.bufferBuilder.append(219), this.pack_uint32(t);
                                    }
                                    this.bufferBuilder.append(e);
                                }),
                                (s.prototype.pack_string = function (e) {
                                    var t,
                                        t =
                                            600 < (t = e).length
                                                ? new Blob([t]).size
                                                : t.replace(/[^\u0000-\u007F]/g, a).length;
                                    if (t <= 15) this.pack_uint8(176 + t);
                                    else if (t <= 65535) this.bufferBuilder.append(216), this.pack_uint16(t);
                                    else {
                                        if (!(t <= 4294967295)) throw new Error('Invalid length');
                                        this.bufferBuilder.append(217), this.pack_uint32(t);
                                    }
                                    this.bufferBuilder.append(e);
                                }),
                                (s.prototype.pack_array = function (e) {
                                    var t = e.length;
                                    if (t <= 15) this.pack_uint8(144 + t);
                                    else if (t <= 65535) this.bufferBuilder.append(220), this.pack_uint16(t);
                                    else {
                                        if (!(t <= 4294967295)) throw new Error('Invalid length');
                                        this.bufferBuilder.append(221), this.pack_uint32(t);
                                    }
                                    for (var n = 0; n < t; n++) this.pack(e[n]);
                                }),
                                (s.prototype.pack_integer = function (e) {
                                    if (-32 <= e && e <= 127) this.bufferBuilder.append(255 & e);
                                    else if (0 <= e && e <= 255) this.bufferBuilder.append(204), this.pack_uint8(e);
                                    else if (-128 <= e && e <= 127) this.bufferBuilder.append(208), this.pack_int8(e);
                                    else if (0 <= e && e <= 65535) this.bufferBuilder.append(205), this.pack_uint16(e);
                                    else if (-32768 <= e && e <= 32767)
                                        this.bufferBuilder.append(209), this.pack_int16(e);
                                    else if (0 <= e && e <= 4294967295)
                                        this.bufferBuilder.append(206), this.pack_uint32(e);
                                    else if (-2147483648 <= e && e <= 2147483647)
                                        this.bufferBuilder.append(210), this.pack_int32(e);
                                    else if (-0x8000000000000000 <= e && e <= 0x8000000000000000)
                                        this.bufferBuilder.append(211), this.pack_int64(e);
                                    else {
                                        if (!(0 <= e && e <= 0x10000000000000000)) throw new Error('Invalid integer');
                                        this.bufferBuilder.append(207), this.pack_uint64(e);
                                    }
                                }),
                                (s.prototype.pack_double = function (e) {
                                    var t = 0;
                                    e < 0 && ((t = 1), (e = -e));
                                    var n = Math.floor(Math.log(e) / Math.LN2),
                                        r = e / Math.pow(2, n) - 1,
                                        e = Math.floor(r * Math.pow(2, 52)),
                                        r = Math.pow(2, 32),
                                        n = (t << 31) | ((n + 1023) << 20) | ((e / r) & 1048575),
                                        r = e % r;
                                    this.bufferBuilder.append(203), this.pack_int32(n), this.pack_int32(r);
                                }),
                                (s.prototype.pack_object = function (e) {
                                    var t,
                                        n = Object.keys(e).length;
                                    if (n <= 15) this.pack_uint8(128 + n);
                                    else if (n <= 65535) this.bufferBuilder.append(222), this.pack_uint16(n);
                                    else {
                                        if (!(n <= 4294967295)) throw new Error('Invalid length');
                                        this.bufferBuilder.append(223), this.pack_uint32(n);
                                    }
                                    for (t in e) e.hasOwnProperty(t) && (this.pack(t), this.pack(e[t]));
                                }),
                                (s.prototype.pack_uint8 = function (e) {
                                    this.bufferBuilder.append(e);
                                }),
                                (s.prototype.pack_uint16 = function (e) {
                                    this.bufferBuilder.append(e >> 8), this.bufferBuilder.append(255 & e);
                                }),
                                (s.prototype.pack_uint32 = function (e) {
                                    e &= 4294967295;
                                    this.bufferBuilder.append((4278190080 & e) >>> 24),
                                        this.bufferBuilder.append((16711680 & e) >>> 16),
                                        this.bufferBuilder.append((65280 & e) >>> 8),
                                        this.bufferBuilder.append(255 & e);
                                }),
                                (s.prototype.pack_uint64 = function (e) {
                                    var t = e / Math.pow(2, 32),
                                        e = e % Math.pow(2, 32);
                                    this.bufferBuilder.append((4278190080 & t) >>> 24),
                                        this.bufferBuilder.append((16711680 & t) >>> 16),
                                        this.bufferBuilder.append((65280 & t) >>> 8),
                                        this.bufferBuilder.append(255 & t),
                                        this.bufferBuilder.append((4278190080 & e) >>> 24),
                                        this.bufferBuilder.append((16711680 & e) >>> 16),
                                        this.bufferBuilder.append((65280 & e) >>> 8),
                                        this.bufferBuilder.append(255 & e);
                                }),
                                (s.prototype.pack_int8 = function (e) {
                                    this.bufferBuilder.append(255 & e);
                                }),
                                (s.prototype.pack_int16 = function (e) {
                                    this.bufferBuilder.append((65280 & e) >> 8), this.bufferBuilder.append(255 & e);
                                }),
                                (s.prototype.pack_int32 = function (e) {
                                    this.bufferBuilder.append((e >>> 24) & 255),
                                        this.bufferBuilder.append((16711680 & e) >>> 16),
                                        this.bufferBuilder.append((65280 & e) >>> 8),
                                        this.bufferBuilder.append(255 & e);
                                }),
                                (s.prototype.pack_int64 = function (e) {
                                    var t = Math.floor(e / Math.pow(2, 32)),
                                        e = e % Math.pow(2, 32);
                                    this.bufferBuilder.append((4278190080 & t) >>> 24),
                                        this.bufferBuilder.append((16711680 & t) >>> 16),
                                        this.bufferBuilder.append((65280 & t) >>> 8),
                                        this.bufferBuilder.append(255 & t),
                                        this.bufferBuilder.append((4278190080 & e) >>> 24),
                                        this.bufferBuilder.append((16711680 & e) >>> 16),
                                        this.bufferBuilder.append((65280 & e) >>> 8),
                                        this.bufferBuilder.append(255 & e);
                                });
                        },
                        { './bufferbuilder': 'EgBh' },
                    ],
                    iSxC: [
                        function (e, t, n) {
                            function s(e, t, n) {
                                return (
                                    t in e
                                        ? Object.defineProperty(e, t, {
                                              value: n,
                                              enumerable: !0,
                                              configurable: !0,
                                              writable: !0,
                                          })
                                        : (e[t] = n),
                                    e
                                );
                            }
                            function r(e) {
                                return (r =
                                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e &&
                                                  'function' == typeof Symbol &&
                                                  e.constructor === Symbol &&
                                                  e !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof e;
                                          })(e);
                            }
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.extractVersion = a),
                                (n.wrapPeerConnectionEvent = function (e, r, i) {
                                    {
                                        var o, s;
                                        e.RTCPeerConnection &&
                                            ((e = e.RTCPeerConnection.prototype),
                                            (o = e.addEventListener),
                                            (e.addEventListener = function (e, t) {
                                                if (e !== r) return o.apply(this, arguments);
                                                function n(e) {
                                                    (e = i(e)) && (t.handleEvent ? t.handleEvent(e) : t(e));
                                                }
                                                return (
                                                    (this._eventMap = this._eventMap || {}),
                                                    this._eventMap[r] || (this._eventMap[r] = new Map()),
                                                    this._eventMap[r].set(t, n),
                                                    o.apply(this, [e, n])
                                                );
                                            }),
                                            (s = e.removeEventListener),
                                            (e.removeEventListener = function (e, t) {
                                                if (e !== r || !this._eventMap || !this._eventMap[r])
                                                    return s.apply(this, arguments);
                                                if (!this._eventMap[r].has(t)) return s.apply(this, arguments);
                                                var n = this._eventMap[r].get(t);
                                                return (
                                                    this._eventMap[r].delete(t),
                                                    0 === this._eventMap[r].size && delete this._eventMap[r],
                                                    0 === Object.keys(this._eventMap).length && delete this._eventMap,
                                                    s.apply(this, [e, n])
                                                );
                                            }),
                                            Object.defineProperty(e, 'on' + r, {
                                                get: function () {
                                                    return this['_on' + r];
                                                },
                                                set: function (e) {
                                                    this['_on' + r] &&
                                                        (this.removeEventListener(r, this['_on' + r]),
                                                        delete this['_on' + r]),
                                                        e && this.addEventListener(r, (this['_on' + r] = e));
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }));
                                    }
                                }),
                                (n.disableLog = function (e) {
                                    return 'boolean' != typeof e
                                        ? new Error('Argument type: ' + r(e) + '. Please use a boolean.')
                                        : (i = e)
                                        ? 'adapter.js logging disabled'
                                        : 'adapter.js logging enabled';
                                }),
                                (n.disableWarnings = function (e) {
                                    return 'boolean' != typeof e
                                        ? new Error('Argument type: ' + r(e) + '. Please use a boolean.')
                                        : ((o = !e), 'adapter.js deprecation warnings ' + (e ? 'disabled' : 'enabled'));
                                }),
                                (n.log = function () {
                                    'object' === ('undefined' == typeof window ? 'undefined' : r(window)) &&
                                        (i ||
                                            ('undefined' != typeof console &&
                                                'function' == typeof console.log &&
                                                console.log.apply(console, arguments)));
                                }),
                                (n.deprecated = function (e, t) {
                                    o && console.warn(e + ' is deprecated, please use ' + t + ' instead.');
                                }),
                                (n.detectBrowser = function (e) {
                                    var t = { browser: null, version: null };
                                    if (void 0 === e || !e.navigator) return (t.browser = 'Not a browser.'), t;
                                    var n = e['navigator'];
                                    if (n.mozGetUserMedia)
                                        (t.browser = 'firefox'), (t.version = a(n.userAgent, /Firefox\/(\d+)\./, 1));
                                    else if (
                                        n.webkitGetUserMedia ||
                                        (!1 === e.isSecureContext && e.webkitRTCPeerConnection && !e.RTCIceGatherer)
                                    )
                                        (t.browser = 'chrome'),
                                            (t.version = a(n.userAgent, /Chrom(e|ium)\/(\d+)\./, 2));
                                    else if (n.mediaDevices && n.userAgent.match(/Edge\/(\d+).(\d+)$/))
                                        (t.browser = 'edge'), (t.version = a(n.userAgent, /Edge\/(\d+).(\d+)$/, 2));
                                    else {
                                        if (!e.RTCPeerConnection || !n.userAgent.match(/AppleWebKit\/(\d+)\./))
                                            return (t.browser = 'Not a supported browser.'), t;
                                        (t.browser = 'safari'),
                                            (t.version = a(n.userAgent, /AppleWebKit\/(\d+)\./, 1)),
                                            (t.supportsUnifiedPlan =
                                                e.RTCRtpTransceiver &&
                                                'currentDirection' in e.RTCRtpTransceiver.prototype);
                                    }
                                    return t;
                                }),
                                (n.compactObject = function i(o) {
                                    return c(o)
                                        ? Object.keys(o).reduce(function (e, t) {
                                              var n = c(o[t]),
                                                  r = n ? i(o[t]) : o[t],
                                                  n = n && !Object.keys(r).length;
                                              return void 0 === r || n ? e : Object.assign(e, s({}, t, r));
                                          }, {})
                                        : o;
                                }),
                                (n.walkStats = u),
                                (n.filterStats = function (n, t, e) {
                                    var r = e ? 'outbound-rtp' : 'inbound-rtp',
                                        i = new Map();
                                    if (null === t) return i;
                                    var o = [];
                                    return (
                                        n.forEach(function (e) {
                                            'track' === e.type && e.trackIdentifier === t.id && o.push(e);
                                        }),
                                        o.forEach(function (t) {
                                            n.forEach(function (e) {
                                                e.type === r && e.trackId === t.id && u(n, e, i);
                                            });
                                        }),
                                        i
                                    );
                                });
                            var i = !0,
                                o = !0;
                            function a(e, t, n) {
                                t = e.match(t);
                                return t && t.length >= n && parseInt(t[n], 10);
                            }
                            function c(e) {
                                return '[object Object]' === Object.prototype.toString.call(e);
                            }
                            function u(t, n, r) {
                                n &&
                                    !r.has(n.id) &&
                                    (r.set(n.id, n),
                                    Object.keys(n).forEach(function (e) {
                                        e.endsWith('Id')
                                            ? u(t, t.get(n[e]), r)
                                            : e.endsWith('Ids') &&
                                              n[e].forEach(function (e) {
                                                  u(t, t.get(e), r);
                                              });
                                    }));
                            }
                        },
                        {},
                    ],
                    s6SN: [
                        function (e, t, n) {
                            function s() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (s = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                            function c(e) {
                                return (c =
                                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e &&
                                                  'function' == typeof Symbol &&
                                                  e.constructor === Symbol &&
                                                  e !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof e;
                                          })(e);
                            }
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimGetUserMedia = function (e, t) {
                                    var s = e && e.navigator;
                                    {
                                        var a, r, i, n;
                                        s.mediaDevices &&
                                            ((a = function (i) {
                                                if ('object' !== c(i) || i.mandatory || i.optional) return i;
                                                var o = {};
                                                return (
                                                    Object.keys(i).forEach(function (t) {
                                                        var n, r, e;
                                                        'require' !== t &&
                                                            'advanced' !== t &&
                                                            'mediaSource' !== t &&
                                                            (void 0 !==
                                                                (n = 'object' === c(i[t]) ? i[t] : { ideal: i[t] })
                                                                    .exact &&
                                                                'number' == typeof n.exact &&
                                                                (n.min = n.max = n.exact),
                                                            (r = function (e, t) {
                                                                return e
                                                                    ? e + t.charAt(0).toUpperCase() + t.slice(1)
                                                                    : 'deviceId' === t
                                                                    ? 'sourceId'
                                                                    : t;
                                                            }),
                                                            void 0 !== n.ideal &&
                                                                ((o.optional = o.optional || []),
                                                                (e = {}),
                                                                'number' == typeof n.ideal
                                                                    ? ((e[r('min', t)] = n.ideal),
                                                                      o.optional.push(e),
                                                                      ((e = {})[r('max', t)] = n.ideal))
                                                                    : (e[r('', t)] = n.ideal),
                                                                o.optional.push(e)),
                                                            void 0 !== n.exact && 'number' != typeof n.exact
                                                                ? ((o.mandatory = o.mandatory || {}),
                                                                  (o.mandatory[r('', t)] = n.exact))
                                                                : ['min', 'max'].forEach(function (e) {
                                                                      void 0 !== n[e] &&
                                                                          ((o.mandatory = o.mandatory || {}),
                                                                          (o.mandatory[r(e, t)] = n[e]));
                                                                  }));
                                                    }),
                                                    i.advanced && (o.optional = (o.optional || []).concat(i.advanced)),
                                                    o
                                                );
                                            }),
                                            (r = function (n, r) {
                                                if (61 <= t.version) return r(n);
                                                if (
                                                    ((n = JSON.parse(JSON.stringify(n))) &&
                                                        'object' === c(n.audio) &&
                                                        ((e = function (e, t, n) {
                                                            t in e && !(n in e) && ((e[n] = e[t]), delete e[t]);
                                                        })(
                                                            (n = JSON.parse(JSON.stringify(n))).audio,
                                                            'autoGainControl',
                                                            'googAutoGainControl'
                                                        ),
                                                        e(n.audio, 'noiseSuppression', 'googNoiseSuppression'),
                                                        (n.audio = a(n.audio))),
                                                    n && 'object' === c(n.video))
                                                ) {
                                                    var i,
                                                        o =
                                                            (o = n.video.facingMode) &&
                                                            ('object' === c(o) ? o : { ideal: o }),
                                                        e = t.version < 66;
                                                    if (
                                                        o &&
                                                        ('user' === o.exact ||
                                                            'environment' === o.exact ||
                                                            'user' === o.ideal ||
                                                            'environment' === o.ideal) &&
                                                        (!s.mediaDevices.getSupportedConstraints ||
                                                            !s.mediaDevices.getSupportedConstraints().facingMode ||
                                                            e) &&
                                                        (delete n.video.facingMode,
                                                        'environment' === o.exact || 'environment' === o.ideal
                                                            ? (i = ['back', 'rear'])
                                                            : ('user' !== o.exact && 'user' !== o.ideal) ||
                                                              (i = ['front']),
                                                        i)
                                                    )
                                                        return s.mediaDevices.enumerateDevices().then(function (e) {
                                                            var t = (e = e.filter(function (e) {
                                                                return 'videoinput' === e.kind;
                                                            })).find(function (t) {
                                                                return i.some(function (e) {
                                                                    return t.label.toLowerCase().includes(e);
                                                                });
                                                            });
                                                            return (
                                                                (t =
                                                                    !t && e.length && i.includes('back')
                                                                        ? e[e.length - 1]
                                                                        : t) &&
                                                                    (n.video.deviceId = o.exact
                                                                        ? { exact: t.deviceId }
                                                                        : { ideal: t.deviceId }),
                                                                (n.video = a(n.video)),
                                                                u('chrome: ' + JSON.stringify(n)),
                                                                r(n)
                                                            );
                                                        });
                                                    n.video = a(n.video);
                                                }
                                                return u('chrome: ' + JSON.stringify(n)), r(n);
                                            }),
                                            (i = function (e) {
                                                return 64 <= t.version
                                                    ? e
                                                    : {
                                                          name:
                                                              {
                                                                  PermissionDeniedError: 'NotAllowedError',
                                                                  PermissionDismissedError: 'NotAllowedError',
                                                                  InvalidStateError: 'NotAllowedError',
                                                                  DevicesNotFoundError: 'NotFoundError',
                                                                  ConstraintNotSatisfiedError: 'OverconstrainedError',
                                                                  TrackStartError: 'NotReadableError',
                                                                  MediaDeviceFailedDueToShutdown: 'NotAllowedError',
                                                                  MediaDeviceKillSwitchOn: 'NotAllowedError',
                                                                  TabCaptureError: 'AbortError',
                                                                  ScreenCaptureError: 'AbortError',
                                                                  DeviceCaptureError: 'AbortError',
                                                              }[e.name] || e.name,
                                                          message: e.message,
                                                          constraint: e.constraint || e.constraintName,
                                                          toString: function () {
                                                              return this.name + (this.message && ': ') + this.message;
                                                          },
                                                      };
                                            }),
                                            (s.getUserMedia = function (e, t, n) {
                                                r(e, function (e) {
                                                    s.webkitGetUserMedia(e, t, function (e) {
                                                        n && n(i(e));
                                                    });
                                                });
                                            }.bind(s)),
                                            s.mediaDevices.getUserMedia &&
                                                ((n = s.mediaDevices.getUserMedia.bind(s.mediaDevices)),
                                                (s.mediaDevices.getUserMedia = function (e) {
                                                    return r(e, function (t) {
                                                        return n(t).then(
                                                            function (e) {
                                                                if (
                                                                    (t.audio && !e.getAudioTracks().length) ||
                                                                    (t.video && !e.getVideoTracks().length)
                                                                )
                                                                    throw (
                                                                        (e.getTracks().forEach(function (e) {
                                                                            e.stop();
                                                                        }),
                                                                        new DOMException('', 'NotFoundError'))
                                                                    );
                                                                return e;
                                                            },
                                                            function (e) {
                                                                return Promise.reject(i(e));
                                                            }
                                                        );
                                                    });
                                                })));
                                    }
                                });
                            var u = (function (e) {
                                if (e && e.__esModule) return e;
                                if (null === e || ('object' != typeof e && 'function' != typeof e))
                                    return { default: e };
                                var t = s();
                                if (t && t.has(e)) return t.get(e);
                                var n,
                                    r = {},
                                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                for (n in e) {
                                    var o;
                                    Object.prototype.hasOwnProperty.call(e, n) &&
                                        ((o = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set)
                                            ? Object.defineProperty(r, n, o)
                                            : (r[n] = e[n]));
                                }
                                return (r.default = e), t && t.set(e, r), r;
                            })(e('../utils.js')).log;
                        },
                        { '../utils.js': 'iSxC' },
                    ],
                    VHa8: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimGetDisplayMedia = function (o, e) {
                                    (o.navigator.mediaDevices && 'getDisplayMedia' in o.navigator.mediaDevices) ||
                                        (o.navigator.mediaDevices &&
                                            ('function' == typeof e
                                                ? (o.navigator.mediaDevices.getDisplayMedia = function (i) {
                                                      return e(i).then(function (e) {
                                                          var t = i.video && i.video.width,
                                                              n = i.video && i.video.height,
                                                              r = i.video && i.video.frameRate;
                                                          return (
                                                              (i.video = {
                                                                  mandatory: {
                                                                      chromeMediaSource: 'desktop',
                                                                      chromeMediaSourceId: e,
                                                                      maxFrameRate: r || 3,
                                                                  },
                                                              }),
                                                              t && (i.video.mandatory.maxWidth = t),
                                                              n && (i.video.mandatory.maxHeight = n),
                                                              o.navigator.mediaDevices.getUserMedia(i)
                                                          );
                                                      });
                                                  })
                                                : console.error(
                                                      'shimGetDisplayMedia: getSourceId argument is not a function'
                                                  )));
                                });
                        },
                        {},
                    ],
                    uI5X: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimMediaStream = function (e) {
                                    e.MediaStream = e.MediaStream || e.webkitMediaStream;
                                }),
                                (n.shimOnTrack = function (o) {
                                    {
                                        var e;
                                        'object' !== a(o) ||
                                        !o.RTCPeerConnection ||
                                        'ontrack' in o.RTCPeerConnection.prototype
                                            ? i.wrapPeerConnectionEvent(o, 'track', function (e) {
                                                  return (
                                                      e.transceiver ||
                                                          Object.defineProperty(e, 'transceiver', {
                                                              value: { receiver: e.receiver },
                                                          }),
                                                      e
                                                  );
                                              })
                                            : (Object.defineProperty(o.RTCPeerConnection.prototype, 'ontrack', {
                                                  get: function () {
                                                      return this._ontrack;
                                                  },
                                                  set: function (e) {
                                                      this._ontrack && this.removeEventListener('track', this._ontrack),
                                                          this.addEventListener('track', (this._ontrack = e));
                                                  },
                                                  enumerable: !0,
                                                  configurable: !0,
                                              }),
                                              (e = o.RTCPeerConnection.prototype.setRemoteDescription),
                                              (o.RTCPeerConnection.prototype.setRemoteDescription = function () {
                                                  var i = this;
                                                  return (
                                                      this._ontrackpoly ||
                                                          ((this._ontrackpoly = function (r) {
                                                              r.stream.addEventListener('addtrack', function (t) {
                                                                  var e = o.RTCPeerConnection.prototype.getReceivers
                                                                          ? i.getReceivers().find(function (e) {
                                                                                return (
                                                                                    e.track && e.track.id === t.track.id
                                                                                );
                                                                            })
                                                                          : { track: t.track },
                                                                      n = new Event('track');
                                                                  (n.track = t.track),
                                                                      (n.receiver = e),
                                                                      (n.transceiver = { receiver: e }),
                                                                      (n.streams = [r.stream]),
                                                                      i.dispatchEvent(n);
                                                              }),
                                                                  r.stream.getTracks().forEach(function (t) {
                                                                      var e = o.RTCPeerConnection.prototype.getReceivers
                                                                              ? i.getReceivers().find(function (e) {
                                                                                    return (
                                                                                        e.track && e.track.id === t.id
                                                                                    );
                                                                                })
                                                                              : { track: t },
                                                                          n = new Event('track');
                                                                      (n.track = t),
                                                                          (n.receiver = e),
                                                                          (n.transceiver = { receiver: e }),
                                                                          (n.streams = [r.stream]),
                                                                          i.dispatchEvent(n);
                                                                  });
                                                          }),
                                                          this.addEventListener('addstream', this._ontrackpoly)),
                                                      e.apply(this, arguments)
                                                  );
                                              }));
                                    }
                                }),
                                (n.shimGetSendersWithDtmf = function (e) {
                                    {
                                        var r, i, t, n, o, s;
                                        'object' === a(e) &&
                                        e.RTCPeerConnection &&
                                        !('getSenders' in e.RTCPeerConnection.prototype) &&
                                        'createDTMFSender' in e.RTCPeerConnection.prototype
                                            ? ((r = function (e, t) {
                                                  return {
                                                      track: t,
                                                      get dtmf() {
                                                          return (
                                                              void 0 === this._dtmf &&
                                                                  ('audio' === t.kind
                                                                      ? (this._dtmf = e.createDTMFSender(t))
                                                                      : (this._dtmf = null)),
                                                              this._dtmf
                                                          );
                                                      },
                                                      _pc: e,
                                                  };
                                              }),
                                              e.RTCPeerConnection.prototype.getSenders ||
                                                  ((e.RTCPeerConnection.prototype.getSenders = function () {
                                                      return (
                                                          (this._senders = this._senders || []), this._senders.slice()
                                                      );
                                                  }),
                                                  (i = e.RTCPeerConnection.prototype.addTrack),
                                                  (e.RTCPeerConnection.prototype.addTrack = function (e, t) {
                                                      var n = i.apply(this, arguments);
                                                      return n || ((n = r(this, e)), this._senders.push(n)), n;
                                                  }),
                                                  (t = e.RTCPeerConnection.prototype.removeTrack),
                                                  (e.RTCPeerConnection.prototype.removeTrack = function (e) {
                                                      t.apply(this, arguments);
                                                      e = this._senders.indexOf(e);
                                                      -1 !== e && this._senders.splice(e, 1);
                                                  })),
                                              (n = e.RTCPeerConnection.prototype.addStream),
                                              (e.RTCPeerConnection.prototype.addStream = function (e) {
                                                  var t = this;
                                                  (this._senders = this._senders || []),
                                                      n.apply(this, [e]),
                                                      e.getTracks().forEach(function (e) {
                                                          t._senders.push(r(t, e));
                                                      });
                                              }),
                                              (o = e.RTCPeerConnection.prototype.removeStream),
                                              (e.RTCPeerConnection.prototype.removeStream = function (e) {
                                                  var n = this;
                                                  (this._senders = this._senders || []),
                                                      o.apply(this, [e]),
                                                      e.getTracks().forEach(function (t) {
                                                          var e = n._senders.find(function (e) {
                                                              return e.track === t;
                                                          });
                                                          e && n._senders.splice(n._senders.indexOf(e), 1);
                                                      });
                                              }))
                                            : 'object' === a(e) &&
                                              e.RTCPeerConnection &&
                                              'getSenders' in e.RTCPeerConnection.prototype &&
                                              'createDTMFSender' in e.RTCPeerConnection.prototype &&
                                              e.RTCRtpSender &&
                                              !('dtmf' in e.RTCRtpSender.prototype) &&
                                              ((s = e.RTCPeerConnection.prototype.getSenders),
                                              (e.RTCPeerConnection.prototype.getSenders = function () {
                                                  var t = this,
                                                      e = s.apply(this, []);
                                                  return (
                                                      e.forEach(function (e) {
                                                          return (e._pc = t);
                                                      }),
                                                      e
                                                  );
                                              }),
                                              Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                                                  get: function () {
                                                      return (
                                                          void 0 === this._dtmf &&
                                                              ('audio' === this.track.kind
                                                                  ? (this._dtmf = this._pc.createDTMFSender(this.track))
                                                                  : (this._dtmf = null)),
                                                          this._dtmf
                                                      );
                                                  },
                                              }));
                                    }
                                }),
                                (n.shimGetStats = function (e) {
                                    {
                                        var s;
                                        e.RTCPeerConnection &&
                                            ((s = e.RTCPeerConnection.prototype.getStats),
                                            (e.RTCPeerConnection.prototype.getStats = function () {
                                                var n = this,
                                                    [e, t, r] = arguments;
                                                if (0 < arguments.length && 'function' == typeof e)
                                                    return s.apply(this, arguments);
                                                if (
                                                    0 === s.length &&
                                                    (0 === arguments.length || 'function' != typeof e)
                                                )
                                                    return s.apply(this, []);
                                                function i(e) {
                                                    var r = {};
                                                    return (
                                                        e.result().forEach(function (t) {
                                                            var n = {
                                                                id: t.id,
                                                                timestamp: t.timestamp,
                                                                type:
                                                                    {
                                                                        localcandidate: 'local-candidate',
                                                                        remotecandidate: 'remote-candidate',
                                                                    }[t.type] || t.type,
                                                            };
                                                            t.names().forEach(function (e) {
                                                                n[e] = t.stat(e);
                                                            }),
                                                                (r[n.id] = n);
                                                        }),
                                                        r
                                                    );
                                                }
                                                function o(t) {
                                                    return new Map(
                                                        Object.keys(t).map(function (e) {
                                                            return [e, t[e]];
                                                        })
                                                    );
                                                }
                                                return 2 <= arguments.length
                                                    ? s.apply(this, [
                                                          function (e) {
                                                              t(o(i(e)));
                                                          },
                                                          e,
                                                      ])
                                                    : new Promise(function (t, e) {
                                                          s.apply(n, [
                                                              function (e) {
                                                                  t(o(i(e)));
                                                              },
                                                              e,
                                                          ]);
                                                      }).then(t, r);
                                            }));
                                    }
                                }),
                                (n.shimSenderReceiverGetStats = function (e) {
                                    {
                                        var n, t, r, o;
                                        'object' === a(e) &&
                                            e.RTCPeerConnection &&
                                            e.RTCRtpSender &&
                                            e.RTCRtpReceiver &&
                                            ('getStats' in e.RTCRtpSender.prototype ||
                                                ((n = e.RTCPeerConnection.prototype.getSenders) &&
                                                    (e.RTCPeerConnection.prototype.getSenders = function () {
                                                        var t = this,
                                                            e = n.apply(this, []);
                                                        return (
                                                            e.forEach(function (e) {
                                                                return (e._pc = t);
                                                            }),
                                                            e
                                                        );
                                                    }),
                                                (t = e.RTCPeerConnection.prototype.addTrack) &&
                                                    (e.RTCPeerConnection.prototype.addTrack = function () {
                                                        var e = t.apply(this, arguments);
                                                        return (e._pc = this), e;
                                                    }),
                                                (e.RTCRtpSender.prototype.getStats = function () {
                                                    var t = this;
                                                    return this._pc.getStats().then(function (e) {
                                                        return i.filterStats(e, t.track, !0);
                                                    });
                                                })),
                                            'getStats' in e.RTCRtpReceiver.prototype ||
                                                ((r = e.RTCPeerConnection.prototype.getReceivers) &&
                                                    (e.RTCPeerConnection.prototype.getReceivers = function () {
                                                        var t = this,
                                                            e = r.apply(this, []);
                                                        return (
                                                            e.forEach(function (e) {
                                                                return (e._pc = t);
                                                            }),
                                                            e
                                                        );
                                                    }),
                                                i.wrapPeerConnectionEvent(e, 'track', function (e) {
                                                    return (e.receiver._pc = e.srcElement), e;
                                                }),
                                                (e.RTCRtpReceiver.prototype.getStats = function () {
                                                    var t = this;
                                                    return this._pc.getStats().then(function (e) {
                                                        return i.filterStats(e, t.track, !1);
                                                    });
                                                })),
                                            'getStats' in e.RTCRtpSender.prototype &&
                                                'getStats' in e.RTCRtpReceiver.prototype &&
                                                ((o = e.RTCPeerConnection.prototype.getStats),
                                                (e.RTCPeerConnection.prototype.getStats = function () {
                                                    if (
                                                        0 < arguments.length &&
                                                        arguments[0] instanceof e.MediaStreamTrack
                                                    ) {
                                                        var t,
                                                            n,
                                                            r,
                                                            i = arguments[0];
                                                        return (
                                                            this.getSenders().forEach(function (e) {
                                                                e.track === i && (t ? (r = !0) : (t = e));
                                                            }),
                                                            this.getReceivers().forEach(function (e) {
                                                                return (
                                                                    e.track === i && (n ? (r = !0) : (n = e)),
                                                                    e.track === i
                                                                );
                                                            }),
                                                            r || (t && n)
                                                                ? Promise.reject(
                                                                      new DOMException(
                                                                          'There are more than one sender or receiver for the track.',
                                                                          'InvalidAccessError'
                                                                      )
                                                                  )
                                                                : t
                                                                ? t.getStats()
                                                                : n
                                                                ? n.getStats()
                                                                : Promise.reject(
                                                                      new DOMException(
                                                                          'There is no sender or receiver for the track.',
                                                                          'InvalidAccessError'
                                                                      )
                                                                  )
                                                        );
                                                    }
                                                    return o.apply(this, arguments);
                                                })));
                                    }
                                }),
                                (n.shimAddTrackRemoveTrackWithNative = u),
                                (n.shimAddTrackRemoveTrack = function (i, e) {
                                    if (i.RTCPeerConnection) {
                                        if (i.RTCPeerConnection.prototype.addTrack && 65 <= e.version) return u(i);
                                        var n = i.RTCPeerConnection.prototype.getLocalStreams;
                                        i.RTCPeerConnection.prototype.getLocalStreams = function () {
                                            var t = this,
                                                e = n.apply(this);
                                            return (
                                                (this._reverseStreams = this._reverseStreams || {}),
                                                e.map(function (e) {
                                                    return t._reverseStreams[e.id];
                                                })
                                            );
                                        };
                                        var r = i.RTCPeerConnection.prototype.addStream;
                                        i.RTCPeerConnection.prototype.addStream = function (e) {
                                            var t,
                                                n = this;
                                            (this._streams = this._streams || {}),
                                                (this._reverseStreams = this._reverseStreams || {}),
                                                e.getTracks().forEach(function (t) {
                                                    if (
                                                        n.getSenders().find(function (e) {
                                                            return e.track === t;
                                                        })
                                                    )
                                                        throw new DOMException(
                                                            'Track already exists.',
                                                            'InvalidAccessError'
                                                        );
                                                }),
                                                this._reverseStreams[e.id] ||
                                                    ((t = new i.MediaStream(e.getTracks())),
                                                    (this._streams[e.id] = t),
                                                    (this._reverseStreams[t.id] = e),
                                                    (e = t)),
                                                r.apply(this, [e]);
                                        };
                                        var t = i.RTCPeerConnection.prototype.removeStream;
                                        (i.RTCPeerConnection.prototype.removeStream = function (e) {
                                            (this._streams = this._streams || {}),
                                                (this._reverseStreams = this._reverseStreams || {}),
                                                t.apply(this, [this._streams[e.id] || e]),
                                                delete this._reverseStreams[(this._streams[e.id] || e).id],
                                                delete this._streams[e.id];
                                        }),
                                            (i.RTCPeerConnection.prototype.addTrack = function (t, e) {
                                                var n = this;
                                                if ('closed' === this.signalingState)
                                                    throw new DOMException(
                                                        "The RTCPeerConnection's signalingState is 'closed'.",
                                                        'InvalidStateError'
                                                    );
                                                var r = [].slice.call(arguments, 1);
                                                if (
                                                    1 !== r.length ||
                                                    !r[0].getTracks().find(function (e) {
                                                        return e === t;
                                                    })
                                                )
                                                    throw new DOMException(
                                                        'The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.',
                                                        'NotSupportedError'
                                                    );
                                                if (
                                                    this.getSenders().find(function (e) {
                                                        return e.track === t;
                                                    })
                                                )
                                                    throw new DOMException(
                                                        'Track already exists.',
                                                        'InvalidAccessError'
                                                    );
                                                (this._streams = this._streams || {}),
                                                    (this._reverseStreams = this._reverseStreams || {});
                                                r = this._streams[e.id];
                                                return (
                                                    r
                                                        ? (r.addTrack(t),
                                                          Promise.resolve().then(function () {
                                                              n.dispatchEvent(new Event('negotiationneeded'));
                                                          }))
                                                        : ((r = new i.MediaStream([t])),
                                                          (this._streams[e.id] = r),
                                                          (this._reverseStreams[r.id] = e),
                                                          this.addStream(r)),
                                                    this.getSenders().find(function (e) {
                                                        return e.track === t;
                                                    })
                                                );
                                            }),
                                            ['createOffer', 'createAnswer'].forEach(function (e) {
                                                var r = i.RTCPeerConnection.prototype[e],
                                                    t = c({}, e, function () {
                                                        var t = this,
                                                            n = arguments;
                                                        return arguments.length && 'function' == typeof arguments[0]
                                                            ? r.apply(this, [
                                                                  function (e) {
                                                                      e = a(t, e);
                                                                      n[0].apply(null, [e]);
                                                                  },
                                                                  function (e) {
                                                                      n[1] && n[1].apply(null, e);
                                                                  },
                                                                  arguments[2],
                                                              ])
                                                            : r.apply(this, arguments).then(function (e) {
                                                                  return a(t, e);
                                                              });
                                                    });
                                                i.RTCPeerConnection.prototype[e] = t[e];
                                            });
                                        var o = i.RTCPeerConnection.prototype.setLocalDescription;
                                        i.RTCPeerConnection.prototype.setLocalDescription = function () {
                                            return (
                                                arguments.length &&
                                                    arguments[0].type &&
                                                    (arguments[0] =
                                                        ((n = this),
                                                        (r = (e = arguments[0]).sdp),
                                                        Object.keys(n._reverseStreams || []).forEach(function (e) {
                                                            var t = n._reverseStreams[e],
                                                                e = n._streams[t.id];
                                                            r = r.replace(new RegExp(t.id, 'g'), e.id);
                                                        }),
                                                        new RTCSessionDescription({ type: e.type, sdp: r }))),
                                                o.apply(this, arguments)
                                            );
                                            var n, e, r;
                                        };
                                        var s = Object.getOwnPropertyDescriptor(
                                            i.RTCPeerConnection.prototype,
                                            'localDescription'
                                        );
                                        Object.defineProperty(i.RTCPeerConnection.prototype, 'localDescription', {
                                            get: function () {
                                                var e = s.get.apply(this);
                                                return '' === e.type ? e : a(this, e);
                                            },
                                        }),
                                            (i.RTCPeerConnection.prototype.removeTrack = function (t) {
                                                var n,
                                                    r = this;
                                                if ('closed' === this.signalingState)
                                                    throw new DOMException(
                                                        "The RTCPeerConnection's signalingState is 'closed'.",
                                                        'InvalidStateError'
                                                    );
                                                if (!t._pc)
                                                    throw new DOMException(
                                                        'Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.',
                                                        'TypeError'
                                                    );
                                                if (t._pc !== this)
                                                    throw new DOMException(
                                                        'Sender was not created by this connection.',
                                                        'InvalidAccessError'
                                                    );
                                                (this._streams = this._streams || {}),
                                                    Object.keys(this._streams).forEach(function (e) {
                                                        r._streams[e].getTracks().find(function (e) {
                                                            return t.track === e;
                                                        }) && (n = r._streams[e]);
                                                    }),
                                                    n &&
                                                        (1 === n.getTracks().length
                                                            ? this.removeStream(this._reverseStreams[n.id])
                                                            : n.removeTrack(t.track),
                                                        this.dispatchEvent(new Event('negotiationneeded')));
                                            });
                                    }
                                    function a(n, e) {
                                        var r = e.sdp;
                                        return (
                                            Object.keys(n._reverseStreams || []).forEach(function (e) {
                                                var t = n._reverseStreams[e],
                                                    e = n._streams[t.id];
                                                r = r.replace(new RegExp(e.id, 'g'), t.id);
                                            }),
                                            new RTCSessionDescription({ type: e.type, sdp: r })
                                        );
                                    }
                                }),
                                (n.shimPeerConnection = function (r, e) {
                                    !r.RTCPeerConnection &&
                                        r.webkitRTCPeerConnection &&
                                        (r.RTCPeerConnection = r.webkitRTCPeerConnection),
                                        r.RTCPeerConnection &&
                                            e.version < 53 &&
                                            ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(
                                                function (e) {
                                                    var t = r.RTCPeerConnection.prototype[e],
                                                        n = c({}, e, function () {
                                                            return (
                                                                (arguments[0] = new ('addIceCandidate' === e
                                                                    ? r.RTCIceCandidate
                                                                    : r.RTCSessionDescription)(arguments[0])),
                                                                t.apply(this, arguments)
                                                            );
                                                        });
                                                    r.RTCPeerConnection.prototype[e] = n[e];
                                                }
                                            );
                                }),
                                (n.fixNegotiationNeeded = function (e, n) {
                                    i.wrapPeerConnectionEvent(e, 'negotiationneeded', function (e) {
                                        var t = e.target;
                                        if (
                                            !(
                                                n.version < 72 ||
                                                (t.getConfiguration && 'plan-b' === t.getConfiguration().sdpSemantics)
                                            ) ||
                                            'stable' === t.signalingState
                                        )
                                            return e;
                                    });
                                }),
                                Object.defineProperty(n, 'shimGetUserMedia', {
                                    enumerable: !0,
                                    get: function () {
                                        return r.shimGetUserMedia;
                                    },
                                }),
                                Object.defineProperty(n, 'shimGetDisplayMedia', {
                                    enumerable: !0,
                                    get: function () {
                                        return o.shimGetDisplayMedia;
                                    },
                                });
                            var i = (function (e) {
                                    if (e && e.__esModule) return e;
                                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                                        return { default: e };
                                    var t = s();
                                    if (t && t.has(e)) return t.get(e);
                                    var n,
                                        r = {},
                                        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                    for (n in e) {
                                        var o;
                                        Object.prototype.hasOwnProperty.call(e, n) &&
                                            ((o = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set)
                                                ? Object.defineProperty(r, n, o)
                                                : (r[n] = e[n]));
                                    }
                                    return (r.default = e), t && t.set(e, r), r;
                                })(e('../utils.js')),
                                r = e('./getusermedia'),
                                o = e('./getdisplaymedia');
                            function s() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (s = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                            function c(e, t, n) {
                                return (
                                    t in e
                                        ? Object.defineProperty(e, t, {
                                              value: n,
                                              enumerable: !0,
                                              configurable: !0,
                                              writable: !0,
                                          })
                                        : (e[t] = n),
                                    e
                                );
                            }
                            function a(e) {
                                return (a =
                                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e &&
                                                  'function' == typeof Symbol &&
                                                  e.constructor === Symbol &&
                                                  e !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof e;
                                          })(e);
                            }
                            function u(e) {
                                e.RTCPeerConnection.prototype.getLocalStreams = function () {
                                    var t = this;
                                    return (
                                        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                                        Object.keys(this._shimmedLocalStreams).map(function (e) {
                                            return t._shimmedLocalStreams[e][0];
                                        })
                                    );
                                };
                                var r = e.RTCPeerConnection.prototype.addTrack;
                                e.RTCPeerConnection.prototype.addTrack = function (e, t) {
                                    if (!t) return r.apply(this, arguments);
                                    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                                    var n = r.apply(this, arguments);
                                    return (
                                        this._shimmedLocalStreams[t.id]
                                            ? -1 === this._shimmedLocalStreams[t.id].indexOf(n) &&
                                              this._shimmedLocalStreams[t.id].push(n)
                                            : (this._shimmedLocalStreams[t.id] = [t, n]),
                                        n
                                    );
                                };
                                var i = e.RTCPeerConnection.prototype.addStream;
                                e.RTCPeerConnection.prototype.addStream = function (e) {
                                    var n = this;
                                    (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                                        e.getTracks().forEach(function (t) {
                                            if (
                                                n.getSenders().find(function (e) {
                                                    return e.track === t;
                                                })
                                            )
                                                throw new DOMException('Track already exists.', 'InvalidAccessError');
                                        });
                                    var t = this.getSenders();
                                    i.apply(this, arguments);
                                    var r = this.getSenders().filter(function (e) {
                                        return -1 === t.indexOf(e);
                                    });
                                    this._shimmedLocalStreams[e.id] = [e].concat(r);
                                };
                                var t = e.RTCPeerConnection.prototype.removeStream;
                                e.RTCPeerConnection.prototype.removeStream = function (e) {
                                    return (
                                        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                                        delete this._shimmedLocalStreams[e.id],
                                        t.apply(this, arguments)
                                    );
                                };
                                var o = e.RTCPeerConnection.prototype.removeTrack;
                                e.RTCPeerConnection.prototype.removeTrack = function (n) {
                                    var r = this;
                                    return (
                                        (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
                                        n &&
                                            Object.keys(this._shimmedLocalStreams).forEach(function (e) {
                                                var t = r._shimmedLocalStreams[e].indexOf(n);
                                                -1 !== t && r._shimmedLocalStreams[e].splice(t, 1),
                                                    1 === r._shimmedLocalStreams[e].length &&
                                                        delete r._shimmedLocalStreams[e];
                                            }),
                                        o.apply(this, arguments)
                                    );
                                };
                            }
                        },
                        { '../utils.js': 'iSxC', './getusermedia': 's6SN', './getdisplaymedia': 'VHa8' },
                    ],
                    NZ1C: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.filterIceServers = function (e, t) {
                                    var r = !1;
                                    return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
                                        if (e && (e.urls || e.url)) {
                                            var t = e.urls || e.url;
                                            e.url && !e.urls && i.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                                            var n = 'string' == typeof t,
                                                t = (t = n ? [t] : t).filter(function (e) {
                                                    if (0 === e.indexOf('stun:')) return !1;
                                                    e =
                                                        e.startsWith('turn') &&
                                                        !e.startsWith('turn:[') &&
                                                        e.includes('transport=udp');
                                                    return e && !r && (r = !0);
                                                });
                                            return delete e.url, (e.urls = n ? t[0] : t), !!t.length;
                                        }
                                    });
                                });
                            var i = (function (e) {
                                if (e && e.__esModule) return e;
                                if (null === e || ('object' != typeof e && 'function' != typeof e))
                                    return { default: e };
                                var t = s();
                                if (t && t.has(e)) return t.get(e);
                                var n,
                                    r = {},
                                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                for (n in e) {
                                    var o;
                                    Object.prototype.hasOwnProperty.call(e, n) &&
                                        ((o = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set)
                                            ? Object.defineProperty(r, n, o)
                                            : (r[n] = e[n]));
                                }
                                return (r.default = e), t && t.set(e, r), r;
                            })(e('../utils'));
                            function s() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (s = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                        },
                        { '../utils': 'iSxC' },
                    ],
                    YHvh: [
                        function (e, t, n) {
                            var u = {
                                generateIdentifier: function () {
                                    return Math.random().toString(36).substr(2, 10);
                                },
                            };
                            (u.localCName = u.generateIdentifier()),
                                (u.splitLines = function (e) {
                                    return e
                                        .trim()
                                        .split('\n')
                                        .map(function (e) {
                                            return e.trim();
                                        });
                                }),
                                (u.splitSections = function (e) {
                                    return e.split('\nm=').map(function (e, t) {
                                        return (0 < t ? 'm=' + e : e).trim() + '\r\n';
                                    });
                                }),
                                (u.getDescription = function (e) {
                                    e = u.splitSections(e);
                                    return e && e[0];
                                }),
                                (u.getMediaSections = function (e) {
                                    e = u.splitSections(e);
                                    return e.shift(), e;
                                }),
                                (u.matchPrefix = function (e, t) {
                                    return u.splitLines(e).filter(function (e) {
                                        return 0 === e.indexOf(t);
                                    });
                                }),
                                (u.parseCandidate = function (e) {
                                    for (
                                        var t,
                                            n = {
                                                foundation: (t = (0 === e.indexOf('a=candidate:')
                                                    ? e.substring(12)
                                                    : e.substring(10)
                                                ).split(' '))[0],
                                                component: parseInt(t[1], 10),
                                                protocol: t[2].toLowerCase(),
                                                priority: parseInt(t[3], 10),
                                                ip: t[4],
                                                address: t[4],
                                                port: parseInt(t[5], 10),
                                                type: t[7],
                                            },
                                            r = 8;
                                        r < t.length;
                                        r += 2
                                    )
                                        switch (t[r]) {
                                            case 'raddr':
                                                n.relatedAddress = t[r + 1];
                                                break;
                                            case 'rport':
                                                n.relatedPort = parseInt(t[r + 1], 10);
                                                break;
                                            case 'tcptype':
                                                n.tcpType = t[r + 1];
                                                break;
                                            case 'ufrag':
                                                (n.ufrag = t[r + 1]), (n.usernameFragment = t[r + 1]);
                                                break;
                                            default:
                                                n[t[r]] = t[r + 1];
                                        }
                                    return n;
                                }),
                                (u.writeCandidate = function (e) {
                                    var t = [];
                                    t.push(e.foundation),
                                        t.push(e.component),
                                        t.push(e.protocol.toUpperCase()),
                                        t.push(e.priority),
                                        t.push(e.address || e.ip),
                                        t.push(e.port);
                                    var n = e.type;
                                    return (
                                        t.push('typ'),
                                        t.push(n),
                                        'host' !== n &&
                                            e.relatedAddress &&
                                            e.relatedPort &&
                                            (t.push('raddr'),
                                            t.push(e.relatedAddress),
                                            t.push('rport'),
                                            t.push(e.relatedPort)),
                                        e.tcpType &&
                                            'tcp' === e.protocol.toLowerCase() &&
                                            (t.push('tcptype'), t.push(e.tcpType)),
                                        (e.usernameFragment || e.ufrag) &&
                                            (t.push('ufrag'), t.push(e.usernameFragment || e.ufrag)),
                                        'candidate:' + t.join(' ')
                                    );
                                }),
                                (u.parseIceOptions = function (e) {
                                    return e.substr(14).split(' ');
                                }),
                                (u.parseRtpMap = function (e) {
                                    var t = e.substr(9).split(' '),
                                        e = { payloadType: parseInt(t.shift(), 10) },
                                        t = t[0].split('/');
                                    return (
                                        (e.name = t[0]),
                                        (e.clockRate = parseInt(t[1], 10)),
                                        (e.channels = 3 === t.length ? parseInt(t[2], 10) : 1),
                                        (e.numChannels = e.channels),
                                        e
                                    );
                                }),
                                (u.writeRtpMap = function (e) {
                                    var t = e.payloadType;
                                    void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
                                    var n = e.channels || e.numChannels || 1;
                                    return (
                                        'a=rtpmap:' +
                                        t +
                                        ' ' +
                                        e.name +
                                        '/' +
                                        e.clockRate +
                                        (1 !== n ? '/' + n : '') +
                                        '\r\n'
                                    );
                                }),
                                (u.parseExtmap = function (e) {
                                    e = e.substr(9).split(' ');
                                    return {
                                        id: parseInt(e[0], 10),
                                        direction: 0 < e[0].indexOf('/') ? e[0].split('/')[1] : 'sendrecv',
                                        uri: e[1],
                                    };
                                }),
                                (u.writeExtmap = function (e) {
                                    return (
                                        'a=extmap:' +
                                        (e.id || e.preferredId) +
                                        (e.direction && 'sendrecv' !== e.direction ? '/' + e.direction : '') +
                                        ' ' +
                                        e.uri +
                                        '\r\n'
                                    );
                                }),
                                (u.parseFmtp = function (e) {
                                    for (
                                        var t, n = {}, r = e.substr(e.indexOf(' ') + 1).split(';'), i = 0;
                                        i < r.length;
                                        i++
                                    )
                                        n[(t = r[i].trim().split('='))[0].trim()] = t[1];
                                    return n;
                                }),
                                (u.writeFmtp = function (t) {
                                    var n,
                                        e = '',
                                        r = t.payloadType;
                                    return (
                                        void 0 !== t.preferredPayloadType && (r = t.preferredPayloadType),
                                        t.parameters &&
                                            Object.keys(t.parameters).length &&
                                            ((n = []),
                                            Object.keys(t.parameters).forEach(function (e) {
                                                t.parameters[e] ? n.push(e + '=' + t.parameters[e]) : n.push(e);
                                            }),
                                            (e += 'a=fmtp:' + r + ' ' + n.join(';') + '\r\n')),
                                        e
                                    );
                                }),
                                (u.parseRtcpFb = function (e) {
                                    e = e.substr(e.indexOf(' ') + 1).split(' ');
                                    return { type: e.shift(), parameter: e.join(' ') };
                                }),
                                (u.writeRtcpFb = function (e) {
                                    var t = '',
                                        n = e.payloadType;
                                    return (
                                        void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
                                        e.rtcpFeedback &&
                                            e.rtcpFeedback.length &&
                                            e.rtcpFeedback.forEach(function (e) {
                                                t +=
                                                    'a=rtcp-fb:' +
                                                    n +
                                                    ' ' +
                                                    e.type +
                                                    (e.parameter && e.parameter.length ? ' ' + e.parameter : '') +
                                                    '\r\n';
                                            }),
                                        t
                                    );
                                }),
                                (u.parseSsrcMedia = function (e) {
                                    var t = e.indexOf(' '),
                                        n = { ssrc: parseInt(e.substr(7, t - 7), 10) },
                                        r = e.indexOf(':', t);
                                    return (
                                        -1 < r
                                            ? ((n.attribute = e.substr(t + 1, r - t - 1)), (n.value = e.substr(r + 1)))
                                            : (n.attribute = e.substr(t + 1)),
                                        n
                                    );
                                }),
                                (u.parseSsrcGroup = function (e) {
                                    e = e.substr(13).split(' ');
                                    return {
                                        semantics: e.shift(),
                                        ssrcs: e.map(function (e) {
                                            return parseInt(e, 10);
                                        }),
                                    };
                                }),
                                (u.getMid = function (e) {
                                    e = u.matchPrefix(e, 'a=mid:')[0];
                                    if (e) return e.substr(6);
                                }),
                                (u.parseFingerprint = function (e) {
                                    e = e.substr(14).split(' ');
                                    return { algorithm: e[0].toLowerCase(), value: e[1] };
                                }),
                                (u.getDtlsParameters = function (e, t) {
                                    return {
                                        role: 'auto',
                                        fingerprints: u.matchPrefix(e + t, 'a=fingerprint:').map(u.parseFingerprint),
                                    };
                                }),
                                (u.writeDtlsParameters = function (e, t) {
                                    var n = 'a=setup:' + t + '\r\n';
                                    return (
                                        e.fingerprints.forEach(function (e) {
                                            n += 'a=fingerprint:' + e.algorithm + ' ' + e.value + '\r\n';
                                        }),
                                        n
                                    );
                                }),
                                (u.parseCryptoLine = function (e) {
                                    e = e.substr(9).split(' ');
                                    return {
                                        tag: parseInt(e[0], 10),
                                        cryptoSuite: e[1],
                                        keyParams: e[2],
                                        sessionParams: e.slice(3),
                                    };
                                }),
                                (u.writeCryptoLine = function (e) {
                                    return (
                                        'a=crypto:' +
                                        e.tag +
                                        ' ' +
                                        e.cryptoSuite +
                                        ' ' +
                                        ('object' == typeof e.keyParams
                                            ? u.writeCryptoKeyParams(e.keyParams)
                                            : e.keyParams) +
                                        (e.sessionParams ? ' ' + e.sessionParams.join(' ') : '') +
                                        '\r\n'
                                    );
                                }),
                                (u.parseCryptoKeyParams = function (e) {
                                    if (0 !== e.indexOf('inline:')) return null;
                                    e = e.substr(7).split('|');
                                    return {
                                        keyMethod: 'inline',
                                        keySalt: e[0],
                                        lifeTime: e[1],
                                        mkiValue: e[2] ? e[2].split(':')[0] : void 0,
                                        mkiLength: e[2] ? e[2].split(':')[1] : void 0,
                                    };
                                }),
                                (u.writeCryptoKeyParams = function (e) {
                                    return (
                                        e.keyMethod +
                                        ':' +
                                        e.keySalt +
                                        (e.lifeTime ? '|' + e.lifeTime : '') +
                                        (e.mkiValue && e.mkiLength ? '|' + e.mkiValue + ':' + e.mkiLength : '')
                                    );
                                }),
                                (u.getCryptoParameters = function (e, t) {
                                    return u.matchPrefix(e + t, 'a=crypto:').map(u.parseCryptoLine);
                                }),
                                (u.getIceParameters = function (e, t) {
                                    var n = u.matchPrefix(e + t, 'a=ice-ufrag:')[0],
                                        t = u.matchPrefix(e + t, 'a=ice-pwd:')[0];
                                    return n && t ? { usernameFragment: n.substr(12), password: t.substr(10) } : null;
                                }),
                                (u.writeIceParameters = function (e) {
                                    return 'a=ice-ufrag:' + e.usernameFragment + '\r\na=ice-pwd:' + e.password + '\r\n';
                                }),
                                (u.parseRtpParameters = function (e) {
                                    for (
                                        var t = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] },
                                            n = u.splitLines(e)[0].split(' '),
                                            r = 3;
                                        r < n.length;
                                        r++
                                    ) {
                                        var i = n[r],
                                            o = u.matchPrefix(e, 'a=rtpmap:' + i + ' ')[0];
                                        if (o) {
                                            var s = u.parseRtpMap(o),
                                                o = u.matchPrefix(e, 'a=fmtp:' + i + ' ');
                                            switch (
                                                ((s.parameters = o.length ? u.parseFmtp(o[0]) : {}),
                                                (s.rtcpFeedback = u
                                                    .matchPrefix(e, 'a=rtcp-fb:' + i + ' ')
                                                    .map(u.parseRtcpFb)),
                                                t.codecs.push(s),
                                                s.name.toUpperCase())
                                            ) {
                                                case 'RED':
                                                case 'ULPFEC':
                                                    t.fecMechanisms.push(s.name.toUpperCase());
                                            }
                                        }
                                    }
                                    return (
                                        u.matchPrefix(e, 'a=extmap:').forEach(function (e) {
                                            t.headerExtensions.push(u.parseExtmap(e));
                                        }),
                                        t
                                    );
                                }),
                                (u.writeRtpDescription = function (e, t) {
                                    var n = '';
                                    (n += 'm=' + e + ' '),
                                        (n += 0 < t.codecs.length ? '9' : '0'),
                                        (n += ' UDP/TLS/RTP/SAVPF '),
                                        (n +=
                                            t.codecs
                                                .map(function (e) {
                                                    return void 0 !== e.preferredPayloadType
                                                        ? e.preferredPayloadType
                                                        : e.payloadType;
                                                })
                                                .join(' ') + '\r\n'),
                                        (n += 'c=IN IP4 0.0.0.0\r\n'),
                                        (n += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'),
                                        t.codecs.forEach(function (e) {
                                            (n += u.writeRtpMap(e)), (n += u.writeFmtp(e)), (n += u.writeRtcpFb(e));
                                        });
                                    var r = 0;
                                    return (
                                        t.codecs.forEach(function (e) {
                                            e.maxptime > r && (r = e.maxptime);
                                        }),
                                        0 < r && (n += 'a=maxptime:' + r + '\r\n'),
                                        (n += 'a=rtcp-mux\r\n'),
                                        t.headerExtensions &&
                                            t.headerExtensions.forEach(function (e) {
                                                n += u.writeExtmap(e);
                                            }),
                                        n
                                    );
                                }),
                                (u.parseRtpEncodingParameters = function (e) {
                                    var t,
                                        n = [],
                                        r = u.parseRtpParameters(e),
                                        i = -1 !== r.fecMechanisms.indexOf('RED'),
                                        o = -1 !== r.fecMechanisms.indexOf('ULPFEC'),
                                        s = u
                                            .matchPrefix(e, 'a=ssrc:')
                                            .map(function (e) {
                                                return u.parseSsrcMedia(e);
                                            })
                                            .filter(function (e) {
                                                return 'cname' === e.attribute;
                                            }),
                                        a = 0 < s.length && s[0].ssrc,
                                        s = u.matchPrefix(e, 'a=ssrc-group:FID').map(function (e) {
                                            return e
                                                .substr(17)
                                                .split(' ')
                                                .map(function (e) {
                                                    return parseInt(e, 10);
                                                });
                                        });
                                    0 < s.length && 1 < s[0].length && s[0][0] === a && (t = s[0][1]),
                                        r.codecs.forEach(function (e) {
                                            'RTX' === e.name.toUpperCase() &&
                                                e.parameters.apt &&
                                                ((e = { ssrc: a, codecPayloadType: parseInt(e.parameters.apt, 10) }),
                                                a && t && (e.rtx = { ssrc: t }),
                                                n.push(e),
                                                i &&
                                                    (((e = JSON.parse(JSON.stringify(e))).fec = {
                                                        ssrc: a,
                                                        mechanism: o ? 'red+ulpfec' : 'red',
                                                    }),
                                                    n.push(e)));
                                        }),
                                        0 === n.length && a && n.push({ ssrc: a });
                                    var c = u.matchPrefix(e, 'b=');
                                    return (
                                        c.length &&
                                            ((c =
                                                0 === c[0].indexOf('b=TIAS:')
                                                    ? parseInt(c[0].substr(7), 10)
                                                    : 0 === c[0].indexOf('b=AS:')
                                                    ? 1e3 * parseInt(c[0].substr(5), 10) * 0.95 - 16e3
                                                    : void 0),
                                            n.forEach(function (e) {
                                                e.maxBitrate = c;
                                            })),
                                        n
                                    );
                                }),
                                (u.parseRtcpParameters = function (e) {
                                    var t = {},
                                        n = u
                                            .matchPrefix(e, 'a=ssrc:')
                                            .map(function (e) {
                                                return u.parseSsrcMedia(e);
                                            })
                                            .filter(function (e) {
                                                return 'cname' === e.attribute;
                                            })[0];
                                    n && ((t.cname = n.value), (t.ssrc = n.ssrc));
                                    n = u.matchPrefix(e, 'a=rtcp-rsize');
                                    (t.reducedSize = 0 < n.length), (t.compound = 0 === n.length);
                                    e = u.matchPrefix(e, 'a=rtcp-mux');
                                    return (t.mux = 0 < e.length), t;
                                }),
                                (u.parseMsid = function (e) {
                                    var t,
                                        n = u.matchPrefix(e, 'a=msid:');
                                    if (1 === n.length)
                                        return { stream: (t = n[0].substr(7).split(' '))[0], track: t[1] };
                                    e = u
                                        .matchPrefix(e, 'a=ssrc:')
                                        .map(function (e) {
                                            return u.parseSsrcMedia(e);
                                        })
                                        .filter(function (e) {
                                            return 'msid' === e.attribute;
                                        });
                                    return 0 < e.length
                                        ? { stream: (t = e[0].value.split(' '))[0], track: t[1] }
                                        : void 0;
                                }),
                                (u.parseSctpDescription = function (e) {
                                    var t,
                                        n = u.parseMLine(e),
                                        r = u.matchPrefix(e, 'a=max-message-size:');
                                    0 < r.length && (t = parseInt(r[0].substr(19), 10)), isNaN(t) && (t = 65536);
                                    r = u.matchPrefix(e, 'a=sctp-port:');
                                    if (0 < r.length)
                                        return {
                                            port: parseInt(r[0].substr(12), 10),
                                            protocol: n.fmt,
                                            maxMessageSize: t,
                                        };
                                    if (0 < u.matchPrefix(e, 'a=sctpmap:').length) {
                                        e = u.matchPrefix(e, 'a=sctpmap:')[0].substr(10).split(' ');
                                        return { port: parseInt(e[0], 10), protocol: e[1], maxMessageSize: t };
                                    }
                                }),
                                (u.writeSctpDescription = function (e, t) {
                                    var n = [],
                                        n =
                                            'DTLS/SCTP' !== e.protocol
                                                ? [
                                                      'm=' + e.kind + ' 9 ' + e.protocol + ' ' + t.protocol + '\r\n',
                                                      'c=IN IP4 0.0.0.0\r\n',
                                                      'a=sctp-port:' + t.port + '\r\n',
                                                  ]
                                                : [
                                                      'm=' + e.kind + ' 9 ' + e.protocol + ' ' + t.port + '\r\n',
                                                      'c=IN IP4 0.0.0.0\r\n',
                                                      'a=sctpmap:' + t.port + ' ' + t.protocol + ' 65535\r\n',
                                                  ];
                                    return (
                                        void 0 !== t.maxMessageSize &&
                                            n.push('a=max-message-size:' + t.maxMessageSize + '\r\n'),
                                        n.join('')
                                    );
                                }),
                                (u.generateSessionId = function () {
                                    return Math.random().toString().substr(2, 21);
                                }),
                                (u.writeSessionBoilerplate = function (e, t, n) {
                                    t = void 0 !== t ? t : 2;
                                    return (
                                        'v=0\r\no=' +
                                        (n || 'thisisadapterortc') +
                                        ' ' +
                                        (e || u.generateSessionId()) +
                                        ' ' +
                                        t +
                                        ' IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n'
                                    );
                                }),
                                (u.writeMediaSection = function (e, t, n, r) {
                                    t = u.writeRtpDescription(e.kind, t);
                                    return (
                                        (t += u.writeIceParameters(e.iceGatherer.getLocalParameters())),
                                        (t += u.writeDtlsParameters(
                                            e.dtlsTransport.getLocalParameters(),
                                            'offer' === n ? 'actpass' : 'active'
                                        )),
                                        (t += 'a=mid:' + e.mid + '\r\n'),
                                        e.direction
                                            ? (t += 'a=' + e.direction + '\r\n')
                                            : e.rtpSender && e.rtpReceiver
                                            ? (t += 'a=sendrecv\r\n')
                                            : e.rtpSender
                                            ? (t += 'a=sendonly\r\n')
                                            : e.rtpReceiver
                                            ? (t += 'a=recvonly\r\n')
                                            : (t += 'a=inactive\r\n'),
                                        e.rtpSender &&
                                            ((t += 'a=' + (r = 'msid:' + r.id + ' ' + e.rtpSender.track.id + '\r\n')),
                                            (t += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + r),
                                            e.sendEncodingParameters[0].rtx &&
                                                ((t += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + r),
                                                (t +=
                                                    'a=ssrc-group:FID ' +
                                                    e.sendEncodingParameters[0].ssrc +
                                                    ' ' +
                                                    e.sendEncodingParameters[0].rtx.ssrc +
                                                    '\r\n'))),
                                        (t +=
                                            'a=ssrc:' +
                                            e.sendEncodingParameters[0].ssrc +
                                            ' cname:' +
                                            u.localCName +
                                            '\r\n'),
                                        e.rtpSender &&
                                            e.sendEncodingParameters[0].rtx &&
                                            (t +=
                                                'a=ssrc:' +
                                                e.sendEncodingParameters[0].rtx.ssrc +
                                                ' cname:' +
                                                u.localCName +
                                                '\r\n'),
                                        t
                                    );
                                }),
                                (u.getDirection = function (e, t) {
                                    for (var n = u.splitLines(e), r = 0; r < n.length; r++)
                                        switch (n[r]) {
                                            case 'a=sendrecv':
                                            case 'a=sendonly':
                                            case 'a=recvonly':
                                            case 'a=inactive':
                                                return n[r].substr(2);
                                        }
                                    return t ? u.getDirection(t) : 'sendrecv';
                                }),
                                (u.getKind = function (e) {
                                    return u.splitLines(e)[0].split(' ')[0].substr(2);
                                }),
                                (u.isRejected = function (e) {
                                    return '0' === e.split(' ', 2)[1];
                                }),
                                (u.parseMLine = function (e) {
                                    e = u.splitLines(e)[0].substr(2).split(' ');
                                    return {
                                        kind: e[0],
                                        port: parseInt(e[1], 10),
                                        protocol: e[2],
                                        fmt: e.slice(3).join(' '),
                                    };
                                }),
                                (u.parseOLine = function (e) {
                                    e = u.matchPrefix(e, 'o=')[0].substr(2).split(' ');
                                    return {
                                        username: e[0],
                                        sessionId: e[1],
                                        sessionVersion: parseInt(e[2], 10),
                                        netType: e[3],
                                        addressType: e[4],
                                        address: e[5],
                                    };
                                }),
                                (u.isValidSDP = function (e) {
                                    if ('string' != typeof e || 0 === e.length) return !1;
                                    for (var t = u.splitLines(e), n = 0; n < t.length; n++)
                                        if (t[n].length < 2 || '=' !== t[n].charAt(1)) return !1;
                                    return !0;
                                }),
                                'object' == typeof t && (t.exports = u);
                        },
                        {},
                    ],
                    NJ2u: [
                        function (e, t, n) {
                            var I = e('sdp');
                            function s(e, t, n, r, i) {
                                t = I.writeRtpDescription(e.kind, t);
                                return (
                                    (t += I.writeIceParameters(e.iceGatherer.getLocalParameters())),
                                    (t += I.writeDtlsParameters(
                                        e.dtlsTransport.getLocalParameters(),
                                        'offer' === n ? 'actpass' : i || 'active'
                                    )),
                                    (t += 'a=mid:' + e.mid + '\r\n'),
                                    e.rtpSender && e.rtpReceiver
                                        ? (t += 'a=sendrecv\r\n')
                                        : e.rtpSender
                                        ? (t += 'a=sendonly\r\n')
                                        : e.rtpReceiver
                                        ? (t += 'a=recvonly\r\n')
                                        : (t += 'a=inactive\r\n'),
                                    e.rtpSender &&
                                        ((i = e.rtpSender._initialTrackId || e.rtpSender.track.id),
                                        (e.rtpSender._initialTrackId = i),
                                        (t += 'a=' + (i = 'msid:' + (r ? r.id : '-') + ' ' + i + '\r\n')),
                                        (t += 'a=ssrc:' + e.sendEncodingParameters[0].ssrc + ' ' + i),
                                        e.sendEncodingParameters[0].rtx &&
                                            ((t += 'a=ssrc:' + e.sendEncodingParameters[0].rtx.ssrc + ' ' + i),
                                            (t +=
                                                'a=ssrc-group:FID ' +
                                                e.sendEncodingParameters[0].ssrc +
                                                ' ' +
                                                e.sendEncodingParameters[0].rtx.ssrc +
                                                '\r\n'))),
                                    (t +=
                                        'a=ssrc:' +
                                        e.sendEncodingParameters[0].ssrc +
                                        ' cname:' +
                                        I.localCName +
                                        '\r\n'),
                                    e.rtpSender &&
                                        e.sendEncodingParameters[0].rtx &&
                                        (t +=
                                            'a=ssrc:' +
                                            e.sendEncodingParameters[0].rtx.ssrc +
                                            ' cname:' +
                                            I.localCName +
                                            '\r\n'),
                                    t
                                );
                            }
                            function M(r, i) {
                                function o(e, t) {
                                    e = parseInt(e, 10);
                                    for (var n = 0; n < t.length; n++)
                                        if (t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n];
                                }
                                var s = { codecs: [], headerExtensions: [], fecMechanisms: [] };
                                return (
                                    r.codecs.forEach(function (n) {
                                        for (var e = 0; e < i.codecs.length; e++) {
                                            var t = i.codecs[e];
                                            if (
                                                n.name.toLowerCase() === t.name.toLowerCase() &&
                                                n.clockRate === t.clockRate &&
                                                ('rtx' !== n.name.toLowerCase() ||
                                                    !n.parameters ||
                                                    !t.parameters.apt ||
                                                    (function (e, t, n, r) {
                                                        (n = o(e.parameters.apt, n)), (r = o(t.parameters.apt, r));
                                                        return n && r && n.name.toLowerCase() === r.name.toLowerCase();
                                                    })(n, t, r.codecs, i.codecs))
                                            ) {
                                                ((t = JSON.parse(JSON.stringify(t))).numChannels = Math.min(
                                                    n.numChannels,
                                                    t.numChannels
                                                )),
                                                    s.codecs.push(t),
                                                    (t.rtcpFeedback = t.rtcpFeedback.filter(function (e) {
                                                        for (var t = 0; t < n.rtcpFeedback.length; t++)
                                                            if (
                                                                n.rtcpFeedback[t].type === e.type &&
                                                                n.rtcpFeedback[t].parameter === e.parameter
                                                            )
                                                                return !0;
                                                        return !1;
                                                    }));
                                                break;
                                            }
                                        }
                                    }),
                                    r.headerExtensions.forEach(function (e) {
                                        for (var t = 0; t < i.headerExtensions.length; t++) {
                                            var n = i.headerExtensions[t];
                                            if (e.uri === n.uri) {
                                                s.headerExtensions.push(n);
                                                break;
                                            }
                                        }
                                    }),
                                    s
                                );
                            }
                            function o(e, t, n) {
                                return (
                                    -1 !==
                                    {
                                        offer: {
                                            setLocalDescription: ['stable', 'have-local-offer'],
                                            setRemoteDescription: ['stable', 'have-remote-offer'],
                                        },
                                        answer: {
                                            setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
                                            setRemoteDescription: ['have-local-offer', 'have-remote-pranswer'],
                                        },
                                    }[t][e].indexOf(n)
                                );
                            }
                            function D(e, t) {
                                var n = e.getRemoteCandidates().find(function (e) {
                                    return (
                                        t.foundation === e.foundation &&
                                        t.ip === e.ip &&
                                        t.port === e.port &&
                                        t.priority === e.priority &&
                                        t.protocol === e.protocol &&
                                        t.type === e.type
                                    );
                                });
                                return n || e.addRemoteCandidate(t), !n;
                            }
                            function p(e, t) {
                                t = new Error(t);
                                return (
                                    (t.name = e),
                                    (t.code = {
                                        NotSupportedError: 9,
                                        InvalidStateError: 11,
                                        InvalidAccessError: 15,
                                        TypeError: void 0,
                                        OperationError: void 0,
                                    }[e]),
                                    t
                                );
                            }
                            t.exports = function (R, O) {
                                function x(e, t) {
                                    t.addTrack(e),
                                        t.dispatchEvent(new R.MediaStreamTrackEvent('addtrack', { track: e }));
                                }
                                function i(e, t, n, r) {
                                    var i = new Event('track');
                                    (i.track = t),
                                        (i.receiver = n),
                                        (i.transceiver = { receiver: n }),
                                        (i.streams = r),
                                        R.setTimeout(function () {
                                            e._dispatchEvent('track', i);
                                        });
                                }
                                function r(e) {
                                    var t,
                                        r,
                                        i,
                                        n = this,
                                        o = document.createDocumentFragment();
                                    if (
                                        (['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (
                                            e
                                        ) {
                                            n[e] = o[e].bind(o);
                                        }),
                                        (this.canTrickleIceCandidates = null),
                                        (this.needNegotiation = !1),
                                        (this.localStreams = []),
                                        (this.remoteStreams = []),
                                        (this._localDescription = null),
                                        (this._remoteDescription = null),
                                        (this.signalingState = 'stable'),
                                        (this.iceConnectionState = 'new'),
                                        (this.connectionState = 'new'),
                                        (this.iceGatheringState = 'new'),
                                        (e = JSON.parse(JSON.stringify(e || {}))),
                                        (this.usingBundle = 'max-bundle' === e.bundlePolicy),
                                        'negotiate' === e.rtcpMuxPolicy)
                                    )
                                        throw p('NotSupportedError', "rtcpMuxPolicy 'negotiate' is not supported");
                                    switch ((e.rtcpMuxPolicy || (e.rtcpMuxPolicy = 'require'), e.iceTransportPolicy)) {
                                        case 'all':
                                        case 'relay':
                                            break;
                                        default:
                                            e.iceTransportPolicy = 'all';
                                    }
                                    switch (e.bundlePolicy) {
                                        case 'balanced':
                                        case 'max-compat':
                                        case 'max-bundle':
                                            break;
                                        default:
                                            e.bundlePolicy = 'balanced';
                                    }
                                    if (
                                        ((e.iceServers =
                                            ((t = e.iceServers || []),
                                            (r = O),
                                            (i = !1),
                                            (t = JSON.parse(JSON.stringify(t))).filter(function (e) {
                                                if (e && (e.urls || e.url)) {
                                                    var t = e.urls || e.url;
                                                    e.url &&
                                                        !e.urls &&
                                                        console.warn(
                                                            'RTCIceServer.url is deprecated! Use urls instead.'
                                                        );
                                                    var n = 'string' == typeof t,
                                                        t = (t = n ? [t] : t).filter(function (e) {
                                                            return 0 !== e.indexOf('turn:') ||
                                                                -1 === e.indexOf('transport=udp') ||
                                                                -1 !== e.indexOf('turn:[') ||
                                                                i
                                                                ? 0 === e.indexOf('stun:') &&
                                                                      14393 <= r &&
                                                                      -1 === e.indexOf('?transport=udp')
                                                                : (i = !0);
                                                        });
                                                    return delete e.url, (e.urls = n ? t[0] : t), !!t.length;
                                                }
                                            }))),
                                        (this._iceGatherers = []),
                                        e.iceCandidatePoolSize)
                                    )
                                        for (var s = e.iceCandidatePoolSize; 0 < s; s--)
                                            this._iceGatherers.push(
                                                new R.RTCIceGatherer({
                                                    iceServers: e.iceServers,
                                                    gatherPolicy: e.iceTransportPolicy,
                                                })
                                            );
                                    else e.iceCandidatePoolSize = 0;
                                    (this._config = e),
                                        (this.transceivers = []),
                                        (this._sdpSessionId = I.generateSessionId()),
                                        (this._sdpSessionVersion = 0),
                                        (this._dtlsRole = void 0),
                                        (this._isClosed = !1);
                                }
                                return (
                                    Object.defineProperty(r.prototype, 'localDescription', {
                                        configurable: !0,
                                        get: function () {
                                            return this._localDescription;
                                        },
                                    }),
                                    Object.defineProperty(r.prototype, 'remoteDescription', {
                                        configurable: !0,
                                        get: function () {
                                            return this._remoteDescription;
                                        },
                                    }),
                                    (r.prototype.onicecandidate = null),
                                    (r.prototype.onaddstream = null),
                                    (r.prototype.ontrack = null),
                                    (r.prototype.onremovestream = null),
                                    (r.prototype.onsignalingstatechange = null),
                                    (r.prototype.oniceconnectionstatechange = null),
                                    (r.prototype.onconnectionstatechange = null),
                                    (r.prototype.onicegatheringstatechange = null),
                                    (r.prototype.onnegotiationneeded = null),
                                    (r.prototype.ondatachannel = null),
                                    (r.prototype._dispatchEvent = function (e, t) {
                                        this._isClosed ||
                                            (this.dispatchEvent(t),
                                            'function' == typeof this['on' + e] && this['on' + e](t));
                                    }),
                                    (r.prototype._emitGatheringStateChange = function () {
                                        var e = new Event('icegatheringstatechange');
                                        this._dispatchEvent('icegatheringstatechange', e);
                                    }),
                                    (r.prototype.getConfiguration = function () {
                                        return this._config;
                                    }),
                                    (r.prototype.getLocalStreams = function () {
                                        return this.localStreams;
                                    }),
                                    (r.prototype.getRemoteStreams = function () {
                                        return this.remoteStreams;
                                    }),
                                    (r.prototype._createTransceiver = function (e, t) {
                                        var n = 0 < this.transceivers.length,
                                            e = {
                                                track: null,
                                                iceGatherer: null,
                                                iceTransport: null,
                                                dtlsTransport: null,
                                                localCapabilities: null,
                                                remoteCapabilities: null,
                                                rtpSender: null,
                                                rtpReceiver: null,
                                                kind: e,
                                                mid: null,
                                                sendEncodingParameters: null,
                                                recvEncodingParameters: null,
                                                stream: null,
                                                associatedRemoteMediaStreams: [],
                                                wantReceive: !0,
                                            };
                                        return (
                                            this.usingBundle && n
                                                ? ((e.iceTransport = this.transceivers[0].iceTransport),
                                                  (e.dtlsTransport = this.transceivers[0].dtlsTransport))
                                                : ((n = this._createIceAndDtlsTransports()),
                                                  (e.iceTransport = n.iceTransport),
                                                  (e.dtlsTransport = n.dtlsTransport)),
                                            t || this.transceivers.push(e),
                                            e
                                        );
                                    }),
                                    (r.prototype.addTrack = function (t, e) {
                                        if (this._isClosed)
                                            throw p(
                                                'InvalidStateError',
                                                'Attempted to call addTrack on a closed peerconnection.'
                                            );
                                        var n;
                                        if (
                                            this.transceivers.find(function (e) {
                                                return e.track === t;
                                            })
                                        )
                                            throw p('InvalidAccessError', 'Track already exists.');
                                        for (var r = 0; r < this.transceivers.length; r++)
                                            this.transceivers[r].track ||
                                                this.transceivers[r].kind !== t.kind ||
                                                (n = this.transceivers[r]);
                                        return (
                                            (n = n || this._createTransceiver(t.kind)),
                                            this._maybeFireNegotiationNeeded(),
                                            -1 === this.localStreams.indexOf(e) && this.localStreams.push(e),
                                            (n.track = t),
                                            (n.stream = e),
                                            (n.rtpSender = new R.RTCRtpSender(t, n.dtlsTransport)),
                                            n.rtpSender
                                        );
                                    }),
                                    (r.prototype.addStream = function (t) {
                                        var r,
                                            n = this;
                                        15025 <= O
                                            ? t.getTracks().forEach(function (e) {
                                                  n.addTrack(e, t);
                                              })
                                            : ((r = t.clone()),
                                              t.getTracks().forEach(function (e, t) {
                                                  var n = r.getTracks()[t];
                                                  e.addEventListener('enabled', function (e) {
                                                      n.enabled = e.enabled;
                                                  });
                                              }),
                                              r.getTracks().forEach(function (e) {
                                                  n.addTrack(e, r);
                                              }));
                                    }),
                                    (r.prototype.removeTrack = function (t) {
                                        if (this._isClosed)
                                            throw p(
                                                'InvalidStateError',
                                                'Attempted to call removeTrack on a closed peerconnection.'
                                            );
                                        if (!(t instanceof R.RTCRtpSender))
                                            throw new TypeError(
                                                'Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.'
                                            );
                                        var e = this.transceivers.find(function (e) {
                                            return e.rtpSender === t;
                                        });
                                        if (!e)
                                            throw p('InvalidAccessError', 'Sender was not created by this connection.');
                                        var n = e.stream;
                                        e.rtpSender.stop(),
                                            (e.rtpSender = null),
                                            (e.track = null),
                                            (e.stream = null),
                                            -1 ===
                                                this.transceivers
                                                    .map(function (e) {
                                                        return e.stream;
                                                    })
                                                    .indexOf(n) &&
                                                -1 < this.localStreams.indexOf(n) &&
                                                this.localStreams.splice(this.localStreams.indexOf(n), 1),
                                            this._maybeFireNegotiationNeeded();
                                    }),
                                    (r.prototype.removeStream = function (e) {
                                        var n = this;
                                        e.getTracks().forEach(function (t) {
                                            var e = n.getSenders().find(function (e) {
                                                return e.track === t;
                                            });
                                            e && n.removeTrack(e);
                                        });
                                    }),
                                    (r.prototype.getSenders = function () {
                                        return this.transceivers
                                            .filter(function (e) {
                                                return !!e.rtpSender;
                                            })
                                            .map(function (e) {
                                                return e.rtpSender;
                                            });
                                    }),
                                    (r.prototype.getReceivers = function () {
                                        return this.transceivers
                                            .filter(function (e) {
                                                return !!e.rtpReceiver;
                                            })
                                            .map(function (e) {
                                                return e.rtpReceiver;
                                            });
                                    }),
                                    (r.prototype._createIceGatherer = function (n, e) {
                                        var r = this;
                                        if (e && 0 < n) return this.transceivers[0].iceGatherer;
                                        if (this._iceGatherers.length) return this._iceGatherers.shift();
                                        var i = new R.RTCIceGatherer({
                                            iceServers: this._config.iceServers,
                                            gatherPolicy: this._config.iceTransportPolicy,
                                        });
                                        return (
                                            Object.defineProperty(i, 'state', { value: 'new', writable: !0 }),
                                            (this.transceivers[n].bufferedCandidateEvents = []),
                                            (this.transceivers[n].bufferCandidates = function (e) {
                                                var t = !e.candidate || 0 === Object.keys(e.candidate).length;
                                                (i.state = t ? 'completed' : 'gathering'),
                                                    null !== r.transceivers[n].bufferedCandidateEvents &&
                                                        r.transceivers[n].bufferedCandidateEvents.push(e);
                                            }),
                                            i.addEventListener('localcandidate', this.transceivers[n].bufferCandidates),
                                            i
                                        );
                                    }),
                                    (r.prototype._gather = function (i, o) {
                                        var e,
                                            s = this,
                                            a = this.transceivers[o].iceGatherer;
                                        a.onlocalcandidate ||
                                            ((e = this.transceivers[o].bufferedCandidateEvents),
                                            (this.transceivers[o].bufferedCandidateEvents = null),
                                            a.removeEventListener(
                                                'localcandidate',
                                                this.transceivers[o].bufferCandidates
                                            ),
                                            (a.onlocalcandidate = function (e) {
                                                var t, n, r;
                                                (s.usingBundle && 0 < o) ||
                                                    (((t = new Event('icecandidate')).candidate = {
                                                        sdpMid: i,
                                                        sdpMLineIndex: o,
                                                    }),
                                                    (e = !(n = e.candidate) || 0 === Object.keys(n).length)
                                                        ? ('new' !== a.state && 'gathering' !== a.state) ||
                                                          (a.state = 'completed')
                                                        : ('new' === a.state && (a.state = 'gathering'),
                                                          (n.component = 1),
                                                          (n.ufrag = a.getLocalParameters().usernameFragment),
                                                          (r = I.writeCandidate(n)),
                                                          (t.candidate = Object.assign(
                                                              t.candidate,
                                                              I.parseCandidate(r)
                                                          )),
                                                          (t.candidate.candidate = r),
                                                          (t.candidate.toJSON = function () {
                                                              return {
                                                                  candidate: t.candidate.candidate,
                                                                  sdpMid: t.candidate.sdpMid,
                                                                  sdpMLineIndex: t.candidate.sdpMLineIndex,
                                                                  usernameFragment: t.candidate.usernameFragment,
                                                              };
                                                          })),
                                                    ((r = I.getMediaSections(s._localDescription.sdp))[
                                                        t.candidate.sdpMLineIndex
                                                    ] += e
                                                        ? 'a=end-of-candidates\r\n'
                                                        : 'a=' + t.candidate.candidate + '\r\n'),
                                                    (s._localDescription.sdp =
                                                        I.getDescription(s._localDescription.sdp) + r.join('')),
                                                    (r = s.transceivers.every(function (e) {
                                                        return e.iceGatherer && 'completed' === e.iceGatherer.state;
                                                    })),
                                                    'gathering' !== s.iceGatheringState &&
                                                        ((s.iceGatheringState = 'gathering'),
                                                        s._emitGatheringStateChange()),
                                                    e || s._dispatchEvent('icecandidate', t),
                                                    r &&
                                                        (s._dispatchEvent('icecandidate', new Event('icecandidate')),
                                                        (s.iceGatheringState = 'complete'),
                                                        s._emitGatheringStateChange()));
                                            }),
                                            R.setTimeout(function () {
                                                e.forEach(function (e) {
                                                    a.onlocalcandidate(e);
                                                });
                                            }, 0));
                                    }),
                                    (r.prototype._createIceAndDtlsTransports = function () {
                                        var e = this,
                                            t = new R.RTCIceTransport(null);
                                        t.onicestatechange = function () {
                                            e._updateIceConnectionState(), e._updateConnectionState();
                                        };
                                        var n = new R.RTCDtlsTransport(t);
                                        return (
                                            (n.ondtlsstatechange = function () {
                                                e._updateConnectionState();
                                            }),
                                            (n.onerror = function () {
                                                Object.defineProperty(n, 'state', { value: 'failed', writable: !0 }),
                                                    e._updateConnectionState();
                                            }),
                                            { iceTransport: t, dtlsTransport: n }
                                        );
                                    }),
                                    (r.prototype._disposeIceAndDtlsTransports = function (e) {
                                        var t = this.transceivers[e].iceGatherer;
                                        t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
                                        t = this.transceivers[e].iceTransport;
                                        t && (delete t.onicestatechange, delete this.transceivers[e].iceTransport);
                                        t = this.transceivers[e].dtlsTransport;
                                        t &&
                                            (delete t.ondtlsstatechange,
                                            delete t.onerror,
                                            delete this.transceivers[e].dtlsTransport);
                                    }),
                                    (r.prototype._transceive = function (e, t, n) {
                                        var r = M(e.localCapabilities, e.remoteCapabilities);
                                        t &&
                                            e.rtpSender &&
                                            ((r.encodings = e.sendEncodingParameters),
                                            (r.rtcp = { cname: I.localCName, compound: e.rtcpParameters.compound }),
                                            e.recvEncodingParameters.length &&
                                                (r.rtcp.ssrc = e.recvEncodingParameters[0].ssrc),
                                            e.rtpSender.send(r)),
                                            n &&
                                                e.rtpReceiver &&
                                                0 < r.codecs.length &&
                                                ('video' === e.kind &&
                                                    e.recvEncodingParameters &&
                                                    O < 15019 &&
                                                    e.recvEncodingParameters.forEach(function (e) {
                                                        delete e.rtx;
                                                    }),
                                                e.recvEncodingParameters.length
                                                    ? (r.encodings = e.recvEncodingParameters)
                                                    : (r.encodings = [{}]),
                                                (r.rtcp = { compound: e.rtcpParameters.compound }),
                                                e.rtcpParameters.cname && (r.rtcp.cname = e.rtcpParameters.cname),
                                                e.sendEncodingParameters.length &&
                                                    (r.rtcp.ssrc = e.sendEncodingParameters[0].ssrc),
                                                e.rtpReceiver.receive(r));
                                    }),
                                    (r.prototype.setLocalDescription = function (e) {
                                        var t,
                                            u,
                                            d,
                                            l = this;
                                        return -1 === ['offer', 'answer'].indexOf(e.type)
                                            ? Promise.reject(p('TypeError', 'Unsupported type "' + e.type + '"'))
                                            : !o('setLocalDescription', e.type, l.signalingState) || l._isClosed
                                            ? Promise.reject(
                                                  p(
                                                      'InvalidStateError',
                                                      'Can not set local ' + e.type + ' in state ' + l.signalingState
                                                  )
                                              )
                                            : ('offer' === e.type
                                                  ? ((t = I.splitSections(e.sdp)),
                                                    (u = t.shift()),
                                                    t.forEach(function (e, t) {
                                                        e = I.parseRtpParameters(e);
                                                        l.transceivers[t].localCapabilities = e;
                                                    }),
                                                    l.transceivers.forEach(function (e, t) {
                                                        l._gather(e.mid, t);
                                                    }))
                                                  : 'answer' === e.type &&
                                                    ((u = (t = I.splitSections(l._remoteDescription.sdp)).shift()),
                                                    (d = 0 < I.matchPrefix(u, 'a=ice-lite').length),
                                                    t.forEach(function (e, t) {
                                                        var n,
                                                            r = l.transceivers[t],
                                                            i = r.iceGatherer,
                                                            o = r.iceTransport,
                                                            s = r.dtlsTransport,
                                                            a = r.localCapabilities,
                                                            c = r.remoteCapabilities;
                                                        (I.isRejected(e) &&
                                                            0 === I.matchPrefix(e, 'a=bundle-only').length) ||
                                                            r.rejected ||
                                                            ((n = I.getIceParameters(e, u)),
                                                            (e = I.getDtlsParameters(e, u)),
                                                            d && (e.role = 'server'),
                                                            (l.usingBundle && 0 !== t) ||
                                                                (l._gather(r.mid, t),
                                                                'new' === o.state &&
                                                                    o.start(i, n, d ? 'controlling' : 'controlled'),
                                                                'new' === s.state && s.start(e)),
                                                            (c = M(a, c)),
                                                            l._transceive(r, 0 < c.codecs.length, !1));
                                                    })),
                                              (l._localDescription = { type: e.type, sdp: e.sdp }),
                                              'offer' === e.type
                                                  ? l._updateSignalingState('have-local-offer')
                                                  : l._updateSignalingState('stable'),
                                              Promise.resolve());
                                    }),
                                    (r.prototype.setRemoteDescription = function (S) {
                                        var C = this;
                                        if (-1 === ['offer', 'answer'].indexOf(S.type))
                                            return Promise.reject(p('TypeError', 'Unsupported type "' + S.type + '"'));
                                        if (!o('setRemoteDescription', S.type, C.signalingState) || C._isClosed)
                                            return Promise.reject(
                                                p(
                                                    'InvalidStateError',
                                                    'Can not set remote ' + S.type + ' in state ' + C.signalingState
                                                )
                                            );
                                        var w = {};
                                        C.remoteStreams.forEach(function (e) {
                                            w[e.id] = e;
                                        });
                                        var k = [],
                                            e = I.splitSections(S.sdp),
                                            T = e.shift(),
                                            E = 0 < I.matchPrefix(T, 'a=ice-lite').length,
                                            P = 0 < I.matchPrefix(T, 'a=group:BUNDLE ').length;
                                        C.usingBundle = P;
                                        var t = I.matchPrefix(T, 'a=ice-options:')[0];
                                        return (
                                            (C.canTrickleIceCandidates =
                                                !!t && 0 <= t.substr(14).split(' ').indexOf('trickle')),
                                            e.forEach(function (e, t) {
                                                var n,
                                                    r,
                                                    i,
                                                    o,
                                                    s,
                                                    a,
                                                    c,
                                                    u,
                                                    d,
                                                    l,
                                                    p,
                                                    h,
                                                    f = I.splitLines(e),
                                                    m = I.getKind(e),
                                                    v =
                                                        I.isRejected(e) &&
                                                        0 === I.matchPrefix(e, 'a=bundle-only').length,
                                                    y = f[0].substr(2).split(' ')[2],
                                                    g = I.getDirection(e, T),
                                                    b = I.parseMsid(e),
                                                    _ = I.getMid(e) || I.generateIdentifier();
                                                v ||
                                                ('application' === m && ('DTLS/SCTP' === y || 'UDP/DTLS/SCTP' === y))
                                                    ? (C.transceivers[t] = {
                                                          mid: _,
                                                          kind: m,
                                                          protocol: y,
                                                          rejected: !0,
                                                      })
                                                    : (!v &&
                                                          C.transceivers[t] &&
                                                          C.transceivers[t].rejected &&
                                                          (C.transceivers[t] = C._createTransceiver(m, !0)),
                                                      (c = I.parseRtpParameters(e)),
                                                      v ||
                                                          ((s = I.getIceParameters(e, T)),
                                                          ((a = I.getDtlsParameters(e, T)).role = 'client')),
                                                      (u = I.parseRtpEncodingParameters(e)),
                                                      (d = I.parseRtcpParameters(e)),
                                                      (l = 0 < I.matchPrefix(e, 'a=end-of-candidates', T).length),
                                                      (f = I.matchPrefix(e, 'a=candidate:')
                                                          .map(function (e) {
                                                              return I.parseCandidate(e);
                                                          })
                                                          .filter(function (e) {
                                                              return 1 === e.component;
                                                          })),
                                                      ('offer' === S.type || 'answer' === S.type) &&
                                                          !v &&
                                                          P &&
                                                          0 < t &&
                                                          C.transceivers[t] &&
                                                          (C._disposeIceAndDtlsTransports(t),
                                                          (C.transceivers[t].iceGatherer =
                                                              C.transceivers[0].iceGatherer),
                                                          (C.transceivers[t].iceTransport =
                                                              C.transceivers[0].iceTransport),
                                                          (C.transceivers[t].dtlsTransport =
                                                              C.transceivers[0].dtlsTransport),
                                                          C.transceivers[t].rtpSender &&
                                                              C.transceivers[t].rtpSender.setTransport(
                                                                  C.transceivers[0].dtlsTransport
                                                              ),
                                                          C.transceivers[t].rtpReceiver &&
                                                              C.transceivers[t].rtpReceiver.setTransport(
                                                                  C.transceivers[0].dtlsTransport
                                                              )),
                                                      'offer' !== S.type || v
                                                          ? 'answer' !== S.type ||
                                                            v ||
                                                            ((y = (n = C.transceivers[t]).iceGatherer),
                                                            (e = n.iceTransport),
                                                            (v = n.dtlsTransport),
                                                            (r = n.rtpReceiver),
                                                            (p = n.sendEncodingParameters),
                                                            (i = n.localCapabilities),
                                                            (C.transceivers[t].recvEncodingParameters = u),
                                                            (C.transceivers[t].remoteCapabilities = c),
                                                            (C.transceivers[t].rtcpParameters = d),
                                                            f.length &&
                                                                'new' === e.state &&
                                                                ((!E && !l) || (P && 0 !== t)
                                                                    ? f.forEach(function (e) {
                                                                          D(n.iceTransport, e);
                                                                      })
                                                                    : e.setRemoteCandidates(f)),
                                                            (P && 0 !== t) ||
                                                                ('new' === e.state && e.start(y, s, 'controlling'),
                                                                'new' === v.state && v.start(a)),
                                                            !M(n.localCapabilities, n.remoteCapabilities).codecs.filter(
                                                                function (e) {
                                                                    return 'rtx' === e.name.toLowerCase();
                                                                }
                                                            ).length &&
                                                                n.sendEncodingParameters[0].rtx &&
                                                                delete n.sendEncodingParameters[0].rtx,
                                                            C._transceive(
                                                                n,
                                                                'sendrecv' === g || 'recvonly' === g,
                                                                'sendrecv' === g || 'sendonly' === g
                                                            ),
                                                            !r || ('sendrecv' !== g && 'sendonly' !== g)
                                                                ? delete n.rtpReceiver
                                                                : ((o = r.track),
                                                                  b
                                                                      ? (w[b.stream] ||
                                                                            (w[b.stream] = new R.MediaStream()),
                                                                        x(o, w[b.stream]),
                                                                        k.push([o, r, w[b.stream]]))
                                                                      : (w.default || (w.default = new R.MediaStream()),
                                                                        x(o, w.default),
                                                                        k.push([o, r, w.default]))))
                                                          : (((n =
                                                                C.transceivers[t] || C._createTransceiver(m)).mid = _),
                                                            n.iceGatherer ||
                                                                (n.iceGatherer = C._createIceGatherer(t, P)),
                                                            f.length &&
                                                                'new' === n.iceTransport.state &&
                                                                (!l || (P && 0 !== t)
                                                                    ? f.forEach(function (e) {
                                                                          D(n.iceTransport, e);
                                                                      })
                                                                    : n.iceTransport.setRemoteCandidates(f)),
                                                            (i = R.RTCRtpReceiver.getCapabilities(m)),
                                                            O < 15019 &&
                                                                (i.codecs = i.codecs.filter(function (e) {
                                                                    return 'rtx' !== e.name;
                                                                })),
                                                            (p = n.sendEncodingParameters || [
                                                                { ssrc: 1001 * (2 * t + 2) },
                                                            ]),
                                                            (f = !1),
                                                            'sendrecv' === g || 'sendonly' === g
                                                                ? ((f = !n.rtpReceiver),
                                                                  (r =
                                                                      n.rtpReceiver ||
                                                                      new R.RTCRtpReceiver(n.dtlsTransport, m)),
                                                                  f &&
                                                                      ((o = r.track),
                                                                      (h =
                                                                          !b || '-' !== b.stream
                                                                              ? b
                                                                                  ? (w[b.stream] ||
                                                                                        ((w[
                                                                                            b.stream
                                                                                        ] = new R.MediaStream()),
                                                                                        Object.defineProperty(
                                                                                            w[b.stream],
                                                                                            'id',
                                                                                            {
                                                                                                get: function () {
                                                                                                    return b.stream;
                                                                                                },
                                                                                            }
                                                                                        )),
                                                                                    Object.defineProperty(o, 'id', {
                                                                                        get: function () {
                                                                                            return b.track;
                                                                                        },
                                                                                    }),
                                                                                    w[b.stream])
                                                                                  : (w.default ||
                                                                                        (w.default = new R.MediaStream()),
                                                                                    w.default)
                                                                              : h) &&
                                                                          (x(o, h),
                                                                          n.associatedRemoteMediaStreams.push(h)),
                                                                      k.push([o, r, h])))
                                                                : n.rtpReceiver &&
                                                                  n.rtpReceiver.track &&
                                                                  (n.associatedRemoteMediaStreams.forEach(function (e) {
                                                                      var t = e.getTracks().find(function (e) {
                                                                          return e.id === n.rtpReceiver.track.id;
                                                                      });
                                                                      t &&
                                                                          ((e = e).removeTrack((t = t)),
                                                                          e.dispatchEvent(
                                                                              new R.MediaStreamTrackEvent(
                                                                                  'removetrack',
                                                                                  { track: t }
                                                                              )
                                                                          ));
                                                                  }),
                                                                  (n.associatedRemoteMediaStreams = [])),
                                                            (n.localCapabilities = i),
                                                            (n.remoteCapabilities = c),
                                                            (n.rtpReceiver = r),
                                                            (n.rtcpParameters = d),
                                                            (n.sendEncodingParameters = p),
                                                            (n.recvEncodingParameters = u),
                                                            C._transceive(C.transceivers[t], !1, f)));
                                            }),
                                            void 0 === C._dtlsRole &&
                                                (C._dtlsRole = 'offer' === S.type ? 'active' : 'passive'),
                                            (C._remoteDescription = { type: S.type, sdp: S.sdp }),
                                            'offer' === S.type
                                                ? C._updateSignalingState('have-remote-offer')
                                                : C._updateSignalingState('stable'),
                                            Object.keys(w).forEach(function (e) {
                                                var t,
                                                    r = w[e];
                                                r.getTracks().length &&
                                                    (-1 === C.remoteStreams.indexOf(r) &&
                                                        (C.remoteStreams.push(r),
                                                        ((t = new Event('addstream')).stream = r),
                                                        R.setTimeout(function () {
                                                            C._dispatchEvent('addstream', t);
                                                        })),
                                                    k.forEach(function (e) {
                                                        var t = e[0],
                                                            n = e[1];
                                                        r.id === e[2].id && i(C, t, n, [r]);
                                                    }));
                                            }),
                                            k.forEach(function (e) {
                                                e[2] || i(C, e[0], e[1], []);
                                            }),
                                            R.setTimeout(function () {
                                                C &&
                                                    C.transceivers &&
                                                    C.transceivers.forEach(function (e) {
                                                        e.iceTransport &&
                                                            'new' === e.iceTransport.state &&
                                                            0 < e.iceTransport.getRemoteCandidates().length &&
                                                            (console.warn(
                                                                'Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification'
                                                            ),
                                                            e.iceTransport.addRemoteCandidate({}));
                                                    });
                                            }, 4e3),
                                            Promise.resolve()
                                        );
                                    }),
                                    (r.prototype.close = function () {
                                        this.transceivers.forEach(function (e) {
                                            e.iceTransport && e.iceTransport.stop(),
                                                e.dtlsTransport && e.dtlsTransport.stop(),
                                                e.rtpSender && e.rtpSender.stop(),
                                                e.rtpReceiver && e.rtpReceiver.stop();
                                        }),
                                            (this._isClosed = !0),
                                            this._updateSignalingState('closed');
                                    }),
                                    (r.prototype._updateSignalingState = function (e) {
                                        this.signalingState = e;
                                        e = new Event('signalingstatechange');
                                        this._dispatchEvent('signalingstatechange', e);
                                    }),
                                    (r.prototype._maybeFireNegotiationNeeded = function () {
                                        var t = this;
                                        'stable' === this.signalingState &&
                                            !0 !== this.needNegotiation &&
                                            ((this.needNegotiation = !0),
                                            R.setTimeout(function () {
                                                var e;
                                                t.needNegotiation &&
                                                    ((t.needNegotiation = !1),
                                                    (e = new Event('negotiationneeded')),
                                                    t._dispatchEvent('negotiationneeded', e));
                                            }, 0));
                                    }),
                                    (r.prototype._updateIceConnectionState = function () {
                                        var e,
                                            t = {
                                                new: 0,
                                                closed: 0,
                                                checking: 0,
                                                connected: 0,
                                                completed: 0,
                                                disconnected: 0,
                                                failed: 0,
                                            };
                                        this.transceivers.forEach(function (e) {
                                            e.iceTransport && !e.rejected && t[e.iceTransport.state]++;
                                        }),
                                            (e = 'new'),
                                            0 < t.failed
                                                ? (e = 'failed')
                                                : 0 < t.checking
                                                ? (e = 'checking')
                                                : 0 < t.disconnected
                                                ? (e = 'disconnected')
                                                : 0 < t.new
                                                ? (e = 'new')
                                                : 0 < t.connected
                                                ? (e = 'connected')
                                                : 0 < t.completed && (e = 'completed'),
                                            e !== this.iceConnectionState &&
                                                ((this.iceConnectionState = e),
                                                (e = new Event('iceconnectionstatechange')),
                                                this._dispatchEvent('iceconnectionstatechange', e));
                                    }),
                                    (r.prototype._updateConnectionState = function () {
                                        var e,
                                            t = {
                                                new: 0,
                                                closed: 0,
                                                connecting: 0,
                                                connected: 0,
                                                completed: 0,
                                                disconnected: 0,
                                                failed: 0,
                                            };
                                        this.transceivers.forEach(function (e) {
                                            e.iceTransport &&
                                                e.dtlsTransport &&
                                                !e.rejected &&
                                                (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++);
                                        }),
                                            (t.connected += t.completed),
                                            (e = 'new'),
                                            0 < t.failed
                                                ? (e = 'failed')
                                                : 0 < t.connecting
                                                ? (e = 'connecting')
                                                : 0 < t.disconnected
                                                ? (e = 'disconnected')
                                                : 0 < t.new
                                                ? (e = 'new')
                                                : 0 < t.connected && (e = 'connected'),
                                            e !== this.connectionState &&
                                                ((this.connectionState = e),
                                                (e = new Event('connectionstatechange')),
                                                this._dispatchEvent('connectionstatechange', e));
                                    }),
                                    (r.prototype.createOffer = function () {
                                        var o = this;
                                        if (o._isClosed)
                                            return Promise.reject(
                                                p('InvalidStateError', 'Can not call createOffer after close')
                                            );
                                        var t = o.transceivers.filter(function (e) {
                                                return 'audio' === e.kind;
                                            }).length,
                                            n = o.transceivers.filter(function (e) {
                                                return 'video' === e.kind;
                                            }).length,
                                            e = arguments[0];
                                        if (e) {
                                            if (e.mandatory || e.optional)
                                                throw new TypeError(
                                                    'Legacy mandatory/optional constraints not supported.'
                                                );
                                            void 0 !== e.offerToReceiveAudio &&
                                                (t =
                                                    !0 === e.offerToReceiveAudio
                                                        ? 1
                                                        : !1 === e.offerToReceiveAudio
                                                        ? 0
                                                        : e.offerToReceiveAudio),
                                                void 0 !== e.offerToReceiveVideo &&
                                                    (n =
                                                        !0 === e.offerToReceiveVideo
                                                            ? 1
                                                            : !1 === e.offerToReceiveVideo
                                                            ? 0
                                                            : e.offerToReceiveVideo);
                                        }
                                        for (
                                            o.transceivers.forEach(function (e) {
                                                'audio' === e.kind
                                                    ? --t < 0 && (e.wantReceive = !1)
                                                    : 'video' === e.kind && --n < 0 && (e.wantReceive = !1);
                                            });
                                            0 < t || 0 < n;

                                        )
                                            0 < t && (o._createTransceiver('audio'), t--),
                                                0 < n && (o._createTransceiver('video'), n--);
                                        var r = I.writeSessionBoilerplate(o._sdpSessionId, o._sdpSessionVersion++);
                                        o.transceivers.forEach(function (e, t) {
                                            var n = e.track,
                                                r = e.kind,
                                                i = e.mid || I.generateIdentifier();
                                            (e.mid = i),
                                                e.iceGatherer ||
                                                    (e.iceGatherer = o._createIceGatherer(t, o.usingBundle));
                                            i = R.RTCRtpSender.getCapabilities(r);
                                            O < 15019 &&
                                                (i.codecs = i.codecs.filter(function (e) {
                                                    return 'rtx' !== e.name;
                                                })),
                                                i.codecs.forEach(function (t) {
                                                    'H264' === t.name &&
                                                        void 0 === t.parameters['level-asymmetry-allowed'] &&
                                                        (t.parameters['level-asymmetry-allowed'] = '1'),
                                                        e.remoteCapabilities &&
                                                            e.remoteCapabilities.codecs &&
                                                            e.remoteCapabilities.codecs.forEach(function (e) {
                                                                t.name.toLowerCase() === e.name.toLowerCase() &&
                                                                    t.clockRate === e.clockRate &&
                                                                    (t.preferredPayloadType = e.payloadType);
                                                            });
                                                }),
                                                i.headerExtensions.forEach(function (t) {
                                                    (
                                                        (e.remoteCapabilities &&
                                                            e.remoteCapabilities.headerExtensions) ||
                                                        []
                                                    ).forEach(function (e) {
                                                        t.uri === e.uri && (t.id = e.id);
                                                    });
                                                });
                                            t = e.sendEncodingParameters || [{ ssrc: 1001 * (2 * t + 1) }];
                                            n &&
                                                15019 <= O &&
                                                'video' === r &&
                                                !t[0].rtx &&
                                                (t[0].rtx = { ssrc: t[0].ssrc + 1 }),
                                                e.wantReceive &&
                                                    (e.rtpReceiver = new R.RTCRtpReceiver(e.dtlsTransport, r)),
                                                (e.localCapabilities = i),
                                                (e.sendEncodingParameters = t);
                                        }),
                                            'max-compat' !== o._config.bundlePolicy &&
                                                (r +=
                                                    'a=group:BUNDLE ' +
                                                    o.transceivers
                                                        .map(function (e) {
                                                            return e.mid;
                                                        })
                                                        .join(' ') +
                                                    '\r\n'),
                                            (r += 'a=ice-options:trickle\r\n'),
                                            o.transceivers.forEach(function (e, t) {
                                                (r += s(e, e.localCapabilities, 'offer', e.stream, o._dtlsRole)),
                                                    (r += 'a=rtcp-rsize\r\n'),
                                                    !e.iceGatherer ||
                                                        'new' === o.iceGatheringState ||
                                                        (0 !== t && o.usingBundle) ||
                                                        (e.iceGatherer.getLocalCandidates().forEach(function (e) {
                                                            (e.component = 1),
                                                                (r += 'a=' + I.writeCandidate(e) + '\r\n');
                                                        }),
                                                        'completed' === e.iceGatherer.state &&
                                                            (r += 'a=end-of-candidates\r\n'));
                                            });
                                        e = new R.RTCSessionDescription({ type: 'offer', sdp: r });
                                        return Promise.resolve(e);
                                    }),
                                    (r.prototype.createAnswer = function () {
                                        var r = this;
                                        if (r._isClosed)
                                            return Promise.reject(
                                                p('InvalidStateError', 'Can not call createAnswer after close')
                                            );
                                        if (
                                            'have-remote-offer' !== r.signalingState &&
                                            'have-local-pranswer' !== r.signalingState
                                        )
                                            return Promise.reject(
                                                p(
                                                    'InvalidStateError',
                                                    'Can not call createAnswer in signalingState ' + r.signalingState
                                                )
                                            );
                                        var i = I.writeSessionBoilerplate(r._sdpSessionId, r._sdpSessionVersion++);
                                        r.usingBundle &&
                                            (i +=
                                                'a=group:BUNDLE ' +
                                                r.transceivers
                                                    .map(function (e) {
                                                        return e.mid;
                                                    })
                                                    .join(' ') +
                                                '\r\n'),
                                            (i += 'a=ice-options:trickle\r\n');
                                        var o = I.getMediaSections(r._remoteDescription.sdp).length;
                                        r.transceivers.forEach(function (e, t) {
                                            if (!(o < t + 1)) {
                                                if (e.rejected)
                                                    return (
                                                        'application' === e.kind
                                                            ? 'DTLS/SCTP' === e.protocol
                                                                ? (i += 'm=application 0 DTLS/SCTP 5000\r\n')
                                                                : (i +=
                                                                      'm=application 0 ' +
                                                                      e.protocol +
                                                                      ' webrtc-datachannel\r\n')
                                                            : 'audio' === e.kind
                                                            ? (i +=
                                                                  'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n')
                                                            : 'video' === e.kind &&
                                                              (i +=
                                                                  'm=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n'),
                                                        void (i +=
                                                            'c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:' + e.mid + '\r\n')
                                                    );
                                                e.stream &&
                                                    ('audio' === e.kind
                                                        ? (n = e.stream.getAudioTracks()[0])
                                                        : 'video' === e.kind && (n = e.stream.getVideoTracks()[0]),
                                                    n &&
                                                        15019 <= O &&
                                                        'video' === e.kind &&
                                                        !e.sendEncodingParameters[0].rtx &&
                                                        (e.sendEncodingParameters[0].rtx = {
                                                            ssrc: e.sendEncodingParameters[0].ssrc + 1,
                                                        }));
                                                var n = M(e.localCapabilities, e.remoteCapabilities);
                                                !n.codecs.filter(function (e) {
                                                    return 'rtx' === e.name.toLowerCase();
                                                }).length &&
                                                    e.sendEncodingParameters[0].rtx &&
                                                    delete e.sendEncodingParameters[0].rtx,
                                                    (i += s(e, n, 'answer', e.stream, r._dtlsRole)),
                                                    e.rtcpParameters &&
                                                        e.rtcpParameters.reducedSize &&
                                                        (i += 'a=rtcp-rsize\r\n');
                                            }
                                        });
                                        var e = new R.RTCSessionDescription({ type: 'answer', sdp: i });
                                        return Promise.resolve(e);
                                    }),
                                    (r.prototype.addIceCandidate = function (a) {
                                        var c,
                                            u = this;
                                        return a && void 0 === a.sdpMLineIndex && !a.sdpMid
                                            ? Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'))
                                            : new Promise(function (e, t) {
                                                  if (!u._remoteDescription)
                                                      return t(
                                                          p(
                                                              'InvalidStateError',
                                                              'Can not add ICE candidate without a remote description'
                                                          )
                                                      );
                                                  if (a && '' !== a.candidate) {
                                                      var n = a.sdpMLineIndex;
                                                      if (a.sdpMid)
                                                          for (var r = 0; r < u.transceivers.length; r++)
                                                              if (u.transceivers[r].mid === a.sdpMid) {
                                                                  n = r;
                                                                  break;
                                                              }
                                                      var i = u.transceivers[n];
                                                      if (!i)
                                                          return t(p('OperationError', 'Can not add ICE candidate'));
                                                      if (i.rejected) return e();
                                                      var o =
                                                          0 < Object.keys(a.candidate).length
                                                              ? I.parseCandidate(a.candidate)
                                                              : {};
                                                      if ('tcp' === o.protocol && (0 === o.port || 9 === o.port))
                                                          return e();
                                                      if (o.component && 1 !== o.component) return e();
                                                      if (
                                                          (0 === n ||
                                                              (0 < n &&
                                                                  i.iceTransport !== u.transceivers[0].iceTransport)) &&
                                                          !D(i.iceTransport, o)
                                                      )
                                                          return t(p('OperationError', 'Can not add ICE candidate'));
                                                      t = a.candidate.trim();
                                                      0 === t.indexOf('a=') && (t = t.substr(2)),
                                                          ((c = I.getMediaSections(u._remoteDescription.sdp))[n] +=
                                                              'a=' + (o.type ? t : 'end-of-candidates') + '\r\n'),
                                                          (u._remoteDescription.sdp =
                                                              I.getDescription(u._remoteDescription.sdp) + c.join(''));
                                                  } else for (var s = 0; s < u.transceivers.length && (u.transceivers[s].rejected || (u.transceivers[s].iceTransport.addRemoteCandidate({}), ((c = I.getMediaSections(u._remoteDescription.sdp))[s] += 'a=end-of-candidates\r\n'), (u._remoteDescription.sdp = I.getDescription(u._remoteDescription.sdp) + c.join('')), !u.usingBundle)); s++);
                                                  e();
                                              });
                                    }),
                                    (r.prototype.getStats = function (t) {
                                        if (t && t instanceof R.MediaStreamTrack) {
                                            var n = null;
                                            if (
                                                (this.transceivers.forEach(function (e) {
                                                    e.rtpSender && e.rtpSender.track === t
                                                        ? (n = e.rtpSender)
                                                        : e.rtpReceiver &&
                                                          e.rtpReceiver.track === t &&
                                                          (n = e.rtpReceiver);
                                                }),
                                                !n)
                                            )
                                                throw p('InvalidAccessError', 'Invalid selector.');
                                            return n.getStats();
                                        }
                                        var r = [];
                                        return (
                                            this.transceivers.forEach(function (t) {
                                                [
                                                    'rtpSender',
                                                    'rtpReceiver',
                                                    'iceGatherer',
                                                    'iceTransport',
                                                    'dtlsTransport',
                                                ].forEach(function (e) {
                                                    t[e] && r.push(t[e].getStats());
                                                });
                                            }),
                                            Promise.all(r).then(function (e) {
                                                var t = new Map();
                                                return (
                                                    e.forEach(function (e) {
                                                        e.forEach(function (e) {
                                                            t.set(e.id, e);
                                                        });
                                                    }),
                                                    t
                                                );
                                            })
                                        );
                                    }),
                                    [
                                        'RTCRtpSender',
                                        'RTCRtpReceiver',
                                        'RTCIceGatherer',
                                        'RTCIceTransport',
                                        'RTCDtlsTransport',
                                    ].forEach(function (e) {
                                        var t,
                                            e = R[e];
                                        e &&
                                            e.prototype &&
                                            e.prototype.getStats &&
                                            ((t = e.prototype.getStats),
                                            (e.prototype.getStats = function () {
                                                return t.apply(this).then(function (n) {
                                                    var r = new Map();
                                                    return (
                                                        Object.keys(n).forEach(function (e) {
                                                            var t;
                                                            (n[e].type =
                                                                {
                                                                    inboundrtp: 'inbound-rtp',
                                                                    outboundrtp: 'outbound-rtp',
                                                                    candidatepair: 'candidate-pair',
                                                                    localcandidate: 'local-candidate',
                                                                    remotecandidate: 'remote-candidate',
                                                                }[(t = n[e]).type] || t.type),
                                                                r.set(e, n[e]);
                                                        }),
                                                        r
                                                    );
                                                });
                                            }));
                                    }),
                                    ['createOffer', 'createAnswer'].forEach(function (e) {
                                        var n = r.prototype[e];
                                        r.prototype[e] = function () {
                                            var t = arguments;
                                            return 'function' == typeof t[0] || 'function' == typeof t[1]
                                                ? n.apply(this, [arguments[2]]).then(
                                                      function (e) {
                                                          'function' == typeof t[0] && t[0].apply(null, [e]);
                                                      },
                                                      function (e) {
                                                          'function' == typeof t[1] && t[1].apply(null, [e]);
                                                      }
                                                  )
                                                : n.apply(this, arguments);
                                        };
                                    }),
                                    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(
                                        function (e) {
                                            var n = r.prototype[e];
                                            r.prototype[e] = function () {
                                                var t = arguments;
                                                return 'function' == typeof t[1] || 'function' == typeof t[2]
                                                    ? n.apply(this, arguments).then(
                                                          function () {
                                                              'function' == typeof t[1] && t[1].apply(null);
                                                          },
                                                          function (e) {
                                                              'function' == typeof t[2] && t[2].apply(null, [e]);
                                                          }
                                                      )
                                                    : n.apply(this, arguments);
                                            };
                                        }
                                    ),
                                    ['getStats'].forEach(function (e) {
                                        var t = r.prototype[e];
                                        r.prototype[e] = function () {
                                            var e = arguments;
                                            return 'function' == typeof e[1]
                                                ? t.apply(this, arguments).then(function () {
                                                      'function' == typeof e[1] && e[1].apply(null);
                                                  })
                                                : t.apply(this, arguments);
                                        };
                                    }),
                                    r
                                );
                            };
                        },
                        { sdp: 'YHvh' },
                    ],
                    YdKx: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimGetUserMedia = function (e) {
                                    var t = (e = e && e.navigator).mediaDevices.getUserMedia.bind(e.mediaDevices);
                                    e.mediaDevices.getUserMedia = function (e) {
                                        return t(e).catch(function (e) {
                                            return Promise.reject({
                                                name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
                                                message: e.message,
                                                constraint: e.constraint,
                                                toString: function () {
                                                    return this.name;
                                                },
                                            });
                                        });
                                    };
                                });
                        },
                        {},
                    ],
                    P3bV: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimGetDisplayMedia = function (e) {
                                    'getDisplayMedia' in e.navigator &&
                                        e.navigator.mediaDevices &&
                                        ((e.navigator.mediaDevices && 'getDisplayMedia' in e.navigator.mediaDevices) ||
                                            (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(
                                                e.navigator
                                            )));
                                });
                        },
                        {},
                    ],
                    XRic: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimPeerConnection = function (e, t) {
                                    {
                                        var n;
                                        e.RTCIceGatherer &&
                                            (e.RTCIceCandidate ||
                                                (e.RTCIceCandidate = function (e) {
                                                    return e;
                                                }),
                                            e.RTCSessionDescription ||
                                                (e.RTCSessionDescription = function (e) {
                                                    return e;
                                                }),
                                            t.version < 15025) &&
                                            ((n = Object.getOwnPropertyDescriptor(
                                                e.MediaStreamTrack.prototype,
                                                'enabled'
                                            )),
                                            Object.defineProperty(e.MediaStreamTrack.prototype, 'enabled', {
                                                set: function (e) {
                                                    n.set.call(this, e);
                                                    var t = new Event('enabled');
                                                    (t.enabled = e), this.dispatchEvent(t);
                                                },
                                            }));
                                    }
                                    !e.RTCRtpSender ||
                                        'dtmf' in e.RTCRtpSender.prototype ||
                                        Object.defineProperty(e.RTCRtpSender.prototype, 'dtmf', {
                                            get: function () {
                                                return (
                                                    void 0 === this._dtmf &&
                                                        ('audio' === this.track.kind
                                                            ? (this._dtmf = new e.RTCDtmfSender(this))
                                                            : 'video' === this.track.kind && (this._dtmf = null)),
                                                    this._dtmf
                                                );
                                            },
                                        }),
                                        e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender);
                                    var r = (0, s.default)(e, t.version);
                                    (e.RTCPeerConnection = function (e) {
                                        return (
                                            e &&
                                                e.iceServers &&
                                                ((e.iceServers = (0, o.filterIceServers)(e.iceServers, t.version)),
                                                i.log('ICE servers after filtering:', e.iceServers)),
                                            new r(e)
                                        );
                                    }),
                                        (e.RTCPeerConnection.prototype = r.prototype);
                                }),
                                (n.shimReplaceTrack = function (e) {
                                    !e.RTCRtpSender ||
                                        'replaceTrack' in e.RTCRtpSender.prototype ||
                                        (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack);
                                }),
                                Object.defineProperty(n, 'shimGetUserMedia', {
                                    enumerable: !0,
                                    get: function () {
                                        return a.shimGetUserMedia;
                                    },
                                }),
                                Object.defineProperty(n, 'shimGetDisplayMedia', {
                                    enumerable: !0,
                                    get: function () {
                                        return c.shimGetDisplayMedia;
                                    },
                                });
                            var r,
                                i = (function (e) {
                                    if (e && e.__esModule) return e;
                                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                                        return { default: e };
                                    var t = u();
                                    if (t && t.has(e)) return t.get(e);
                                    var n,
                                        r = {},
                                        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                    for (n in e) {
                                        var o;
                                        Object.prototype.hasOwnProperty.call(e, n) &&
                                            ((o = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set)
                                                ? Object.defineProperty(r, n, o)
                                                : (r[n] = e[n]));
                                    }
                                    return (r.default = e), t && t.set(e, r), r;
                                })(e('../utils')),
                                o = e('./filtericeservers'),
                                s = (r = e('rtcpeerconnection-shim')) && r.__esModule ? r : { default: r },
                                a = e('./getusermedia'),
                                c = e('./getdisplaymedia');
                            function u() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (u = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                        },
                        {
                            '../utils': 'iSxC',
                            './filtericeservers': 'NZ1C',
                            'rtcpeerconnection-shim': 'NJ2u',
                            './getusermedia': 'YdKx',
                            './getdisplaymedia': 'P3bV',
                        },
                    ],
                    GzSv: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimGetUserMedia = function (e, t) {
                                    var r = e && e.navigator,
                                        e = e && e.MediaStreamTrack;
                                    {
                                        var n, i, o, s;
                                        (r.getUserMedia = function (e, t, n) {
                                            a.deprecated(
                                                'navigator.getUserMedia',
                                                'navigator.mediaDevices.getUserMedia'
                                            ),
                                                r.mediaDevices.getUserMedia(e).then(t, n);
                                        }),
                                            (55 < t.version &&
                                                'autoGainControl' in r.mediaDevices.getSupportedConstraints()) ||
                                                ((n = function (e, t, n) {
                                                    t in e && !(n in e) && ((e[n] = e[t]), delete e[t]);
                                                }),
                                                (i = r.mediaDevices.getUserMedia.bind(r.mediaDevices)),
                                                (r.mediaDevices.getUserMedia = function (e) {
                                                    return (
                                                        'object' === c(e) &&
                                                            'object' === c(e.audio) &&
                                                            ((e = JSON.parse(JSON.stringify(e))),
                                                            n(e.audio, 'autoGainControl', 'mozAutoGainControl'),
                                                            n(e.audio, 'noiseSuppression', 'mozNoiseSuppression')),
                                                        i(e)
                                                    );
                                                }),
                                                e &&
                                                    e.prototype.getSettings &&
                                                    ((o = e.prototype.getSettings),
                                                    (e.prototype.getSettings = function () {
                                                        var e = o.apply(this, arguments);
                                                        return (
                                                            n(e, 'mozAutoGainControl', 'autoGainControl'),
                                                            n(e, 'mozNoiseSuppression', 'noiseSuppression'),
                                                            e
                                                        );
                                                    })),
                                                e &&
                                                    e.prototype.applyConstraints &&
                                                    ((s = e.prototype.applyConstraints),
                                                    (e.prototype.applyConstraints = function (e) {
                                                        return (
                                                            'audio' === this.kind &&
                                                                'object' === c(e) &&
                                                                ((e = JSON.parse(JSON.stringify(e))),
                                                                n(e, 'autoGainControl', 'mozAutoGainControl'),
                                                                n(e, 'noiseSuppression', 'mozNoiseSuppression')),
                                                            s.apply(this, [e])
                                                        );
                                                    })));
                                    }
                                });
                            var a = (function (e) {
                                if (e && e.__esModule) return e;
                                if (null === e || ('object' != typeof e && 'function' != typeof e))
                                    return { default: e };
                                var t = s();
                                if (t && t.has(e)) return t.get(e);
                                var n,
                                    r = {},
                                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                for (n in e) {
                                    var o;
                                    Object.prototype.hasOwnProperty.call(e, n) &&
                                        ((o = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set)
                                            ? Object.defineProperty(r, n, o)
                                            : (r[n] = e[n]));
                                }
                                return (r.default = e), t && t.set(e, r), r;
                            })(e('../utils'));
                            function s() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (s = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                            function c(e) {
                                return (c =
                                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e &&
                                                  'function' == typeof Symbol &&
                                                  e.constructor === Symbol &&
                                                  e !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof e;
                                          })(e);
                            }
                        },
                        { '../utils': 'iSxC' },
                    ],
                    UuGU: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimGetDisplayMedia = function (t, n) {
                                    (t.navigator.mediaDevices && 'getDisplayMedia' in t.navigator.mediaDevices) ||
                                        (t.navigator.mediaDevices &&
                                            (t.navigator.mediaDevices.getDisplayMedia = function (e) {
                                                if (e && e.video)
                                                    return (
                                                        !0 === e.video
                                                            ? (e.video = { mediaSource: n })
                                                            : (e.video.mediaSource = n),
                                                        t.navigator.mediaDevices.getUserMedia(e)
                                                    );
                                                e = new DOMException(
                                                    'getDisplayMedia without video constraints is undefined'
                                                );
                                                return (e.name = 'NotFoundError'), (e.code = 8), Promise.reject(e);
                                            }));
                                });
                        },
                        {},
                    ],
                    Fzdr: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimOnTrack = function (e) {
                                    'object' === a(e) &&
                                        e.RTCTrackEvent &&
                                        'receiver' in e.RTCTrackEvent.prototype &&
                                        !('transceiver' in e.RTCTrackEvent.prototype) &&
                                        Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                                            get: function () {
                                                return { receiver: this.receiver };
                                            },
                                        });
                                }),
                                (n.shimPeerConnection = function (o, r) {
                                    {
                                        var i, s;
                                        'object' === a(o) &&
                                            (o.RTCPeerConnection || o.mozRTCPeerConnection) &&
                                            (!o.RTCPeerConnection &&
                                                o.mozRTCPeerConnection &&
                                                (o.RTCPeerConnection = o.mozRTCPeerConnection),
                                            r.version < 53 &&
                                                [
                                                    'setLocalDescription',
                                                    'setRemoteDescription',
                                                    'addIceCandidate',
                                                ].forEach(function (e) {
                                                    var t,
                                                        n,
                                                        r,
                                                        i = o.RTCPeerConnection.prototype[e],
                                                        t =
                                                            ((r = function () {
                                                                return (
                                                                    (arguments[0] = new ('addIceCandidate' === e
                                                                        ? o.RTCIceCandidate
                                                                        : o.RTCSessionDescription)(arguments[0])),
                                                                    i.apply(this, arguments)
                                                                );
                                                            }),
                                                            (n = e) in (t = {})
                                                                ? Object.defineProperty(t, n, {
                                                                      value: r,
                                                                      enumerable: !0,
                                                                      configurable: !0,
                                                                      writable: !0,
                                                                  })
                                                                : (t[n] = r),
                                                            t);
                                                    o.RTCPeerConnection.prototype[e] = t[e];
                                                }),
                                            (i = {
                                                inboundrtp: 'inbound-rtp',
                                                outboundrtp: 'outbound-rtp',
                                                candidatepair: 'candidate-pair',
                                                localcandidate: 'local-candidate',
                                                remotecandidate: 'remote-candidate',
                                            }),
                                            (s = o.RTCPeerConnection.prototype.getStats),
                                            (o.RTCPeerConnection.prototype.getStats = function () {
                                                var [e, t, n] = arguments;
                                                return s
                                                    .apply(this, [e || null])
                                                    .then(function (n) {
                                                        if (r.version < 53 && !t)
                                                            try {
                                                                n.forEach(function (e) {
                                                                    e.type = i[e.type] || e.type;
                                                                });
                                                            } catch (e) {
                                                                if ('TypeError' !== e.name) throw e;
                                                                n.forEach(function (e, t) {
                                                                    n.set(
                                                                        t,
                                                                        Object.assign({}, e, {
                                                                            type: i[e.type] || e.type,
                                                                        })
                                                                    );
                                                                });
                                                            }
                                                        return n;
                                                    })
                                                    .then(t, n);
                                            }));
                                    }
                                }),
                                (n.shimSenderGetStats = function (e) {
                                    {
                                        var n, t;
                                        'object' !== a(e) ||
                                            !e.RTCPeerConnection ||
                                            !e.RTCRtpSender ||
                                            (e.RTCRtpSender && 'getStats' in e.RTCRtpSender.prototype) ||
                                            ((n = e.RTCPeerConnection.prototype.getSenders) &&
                                                (e.RTCPeerConnection.prototype.getSenders = function () {
                                                    var t = this,
                                                        e = n.apply(this, []);
                                                    return (
                                                        e.forEach(function (e) {
                                                            return (e._pc = t);
                                                        }),
                                                        e
                                                    );
                                                }),
                                            (t = e.RTCPeerConnection.prototype.addTrack) &&
                                                (e.RTCPeerConnection.prototype.addTrack = function () {
                                                    var e = t.apply(this, arguments);
                                                    return (e._pc = this), e;
                                                }),
                                            (e.RTCRtpSender.prototype.getStats = function () {
                                                return this.track
                                                    ? this._pc.getStats(this.track)
                                                    : Promise.resolve(new Map());
                                            }));
                                    }
                                }),
                                (n.shimReceiverGetStats = function (e) {
                                    {
                                        var n;
                                        'object' !== a(e) ||
                                            !e.RTCPeerConnection ||
                                            !e.RTCRtpSender ||
                                            (e.RTCRtpSender && 'getStats' in e.RTCRtpReceiver.prototype) ||
                                            ((n = e.RTCPeerConnection.prototype.getReceivers) &&
                                                (e.RTCPeerConnection.prototype.getReceivers = function () {
                                                    var t = this,
                                                        e = n.apply(this, []);
                                                    return (
                                                        e.forEach(function (e) {
                                                            return (e._pc = t);
                                                        }),
                                                        e
                                                    );
                                                }),
                                            r.wrapPeerConnectionEvent(e, 'track', function (e) {
                                                return (e.receiver._pc = e.srcElement), e;
                                            }),
                                            (e.RTCRtpReceiver.prototype.getStats = function () {
                                                return this._pc.getStats(this.track);
                                            }));
                                    }
                                }),
                                (n.shimRemoveStream = function (e) {
                                    !e.RTCPeerConnection ||
                                        'removeStream' in e.RTCPeerConnection.prototype ||
                                        (e.RTCPeerConnection.prototype.removeStream = function (t) {
                                            var n = this;
                                            r.deprecated('removeStream', 'removeTrack'),
                                                this.getSenders().forEach(function (e) {
                                                    e.track && t.getTracks().includes(e.track) && n.removeTrack(e);
                                                });
                                        });
                                }),
                                (n.shimRTCDataChannel = function (e) {
                                    e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
                                }),
                                (n.shimAddTransceiver = function (e) {
                                    {
                                        var i;
                                        'object' !== a(e) ||
                                            !e.RTCPeerConnection ||
                                            ((i = e.RTCPeerConnection.prototype.addTransceiver) &&
                                                (e.RTCPeerConnection.prototype.addTransceiver = function () {
                                                    this.setParametersPromises = [];
                                                    var e = arguments[1],
                                                        t = e && 'sendEncodings' in e;
                                                    t &&
                                                        e.sendEncodings.forEach(function (e) {
                                                            if ('rid' in e && !/^[a-z0-9]{0,16}$/i.test(e.rid))
                                                                throw new TypeError('Invalid RID value provided.');
                                                            if (
                                                                'scaleResolutionDownBy' in e &&
                                                                !(1 <= parseFloat(e.scaleResolutionDownBy))
                                                            )
                                                                throw new RangeError(
                                                                    'scale_resolution_down_by must be >= 1.0'
                                                                );
                                                            if (
                                                                'maxFramerate' in e &&
                                                                !(0 <= parseFloat(e.maxFramerate))
                                                            )
                                                                throw new RangeError('max_framerate must be >= 0.0');
                                                        });
                                                    var n,
                                                        r = i.apply(this, arguments);
                                                    return (
                                                        t &&
                                                            ((n = r['sender']),
                                                            ('encodings' in (t = n.getParameters()) &&
                                                                (1 !== t.encodings.length ||
                                                                    0 !== Object.keys(t.encodings[0]).length)) ||
                                                                ((t.encodings = e.sendEncodings),
                                                                (n.sendEncodings = e.sendEncodings),
                                                                this.setParametersPromises.push(
                                                                    n
                                                                        .setParameters(t)
                                                                        .then(function () {
                                                                            delete n.sendEncodings;
                                                                        })
                                                                        .catch(function () {
                                                                            delete n.sendEncodings;
                                                                        })
                                                                ))),
                                                        r
                                                    );
                                                }));
                                    }
                                }),
                                (n.shimGetParameters = function (e) {
                                    {
                                        var t;
                                        'object' !== a(e) ||
                                            !e.RTCRtpSender ||
                                            ((t = e.RTCRtpSender.prototype.getParameters) &&
                                                (e.RTCRtpSender.prototype.getParameters = function () {
                                                    var e = t.apply(this, arguments);
                                                    return (
                                                        'encodings' in e ||
                                                            (e.encodings = [].concat(this.sendEncodings || [{}])),
                                                        e
                                                    );
                                                }));
                                    }
                                }),
                                (n.shimCreateOffer = function (e) {
                                    {
                                        var n;
                                        'object' === a(e) &&
                                            e.RTCPeerConnection &&
                                            ((n = e.RTCPeerConnection.prototype.createOffer),
                                            (e.RTCPeerConnection.prototype.createOffer = function () {
                                                var e = arguments,
                                                    t = this;
                                                return this.setParametersPromises && this.setParametersPromises.length
                                                    ? Promise.all(this.setParametersPromises)
                                                          .then(function () {
                                                              return n.apply(t, e);
                                                          })
                                                          .finally(function () {
                                                              t.setParametersPromises = [];
                                                          })
                                                    : n.apply(this, arguments);
                                            }));
                                    }
                                }),
                                (n.shimCreateAnswer = function (e) {
                                    {
                                        var n;
                                        'object' === a(e) &&
                                            e.RTCPeerConnection &&
                                            ((n = e.RTCPeerConnection.prototype.createAnswer),
                                            (e.RTCPeerConnection.prototype.createAnswer = function () {
                                                var e = arguments,
                                                    t = this;
                                                return this.setParametersPromises && this.setParametersPromises.length
                                                    ? Promise.all(this.setParametersPromises)
                                                          .then(function () {
                                                              return n.apply(t, e);
                                                          })
                                                          .finally(function () {
                                                              t.setParametersPromises = [];
                                                          })
                                                    : n.apply(this, arguments);
                                            }));
                                    }
                                }),
                                Object.defineProperty(n, 'shimGetUserMedia', {
                                    enumerable: !0,
                                    get: function () {
                                        return i.shimGetUserMedia;
                                    },
                                }),
                                Object.defineProperty(n, 'shimGetDisplayMedia', {
                                    enumerable: !0,
                                    get: function () {
                                        return o.shimGetDisplayMedia;
                                    },
                                });
                            var r = (function (e) {
                                    if (e && e.__esModule) return e;
                                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                                        return { default: e };
                                    var t = s();
                                    if (t && t.has(e)) return t.get(e);
                                    var n,
                                        r = {},
                                        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                    for (n in e) {
                                        var o;
                                        Object.prototype.hasOwnProperty.call(e, n) &&
                                            ((o = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set)
                                                ? Object.defineProperty(r, n, o)
                                                : (r[n] = e[n]));
                                    }
                                    return (r.default = e), t && t.set(e, r), r;
                                })(e('../utils')),
                                i = e('./getusermedia'),
                                o = e('./getdisplaymedia');
                            function s() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (s = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                            function a(e) {
                                return (a =
                                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e &&
                                                  'function' == typeof Symbol &&
                                                  e.constructor === Symbol &&
                                                  e !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof e;
                                          })(e);
                            }
                        },
                        { '../utils': 'iSxC', './getusermedia': 'GzSv', './getdisplaymedia': 'UuGU' },
                    ],
                    t1lL: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimLocalStreamsAPI = function (e) {
                                    {
                                        var o;
                                        'object' === c(e) &&
                                            e.RTCPeerConnection &&
                                            ('getLocalStreams' in e.RTCPeerConnection.prototype ||
                                                (e.RTCPeerConnection.prototype.getLocalStreams = function () {
                                                    return (
                                                        this._localStreams || (this._localStreams = []),
                                                        this._localStreams
                                                    );
                                                }),
                                            'addStream' in e.RTCPeerConnection.prototype ||
                                                ((o = e.RTCPeerConnection.prototype.addTrack),
                                                (e.RTCPeerConnection.prototype.addStream = function (t) {
                                                    var n = this;
                                                    this._localStreams || (this._localStreams = []),
                                                        this._localStreams.includes(t) || this._localStreams.push(t),
                                                        t.getAudioTracks().forEach(function (e) {
                                                            return o.call(n, e, t);
                                                        }),
                                                        t.getVideoTracks().forEach(function (e) {
                                                            return o.call(n, e, t);
                                                        });
                                                }),
                                                (e.RTCPeerConnection.prototype.addTrack = function (e) {
                                                    for (
                                                        var t = this,
                                                            n = arguments.length,
                                                            r = new Array(1 < n ? n - 1 : 0),
                                                            i = 1;
                                                        i < n;
                                                        i++
                                                    )
                                                        r[i - 1] = arguments[i];
                                                    return (
                                                        r &&
                                                            r.forEach(function (e) {
                                                                t._localStreams
                                                                    ? t._localStreams.includes(e) ||
                                                                      t._localStreams.push(e)
                                                                    : (t._localStreams = [e]);
                                                            }),
                                                        o.apply(this, arguments)
                                                    );
                                                })),
                                            'removeStream' in e.RTCPeerConnection.prototype ||
                                                (e.RTCPeerConnection.prototype.removeStream = function (e) {
                                                    var t = this;
                                                    this._localStreams || (this._localStreams = []);
                                                    var n,
                                                        r = this._localStreams.indexOf(e);
                                                    -1 !== r &&
                                                        (this._localStreams.splice(r, 1),
                                                        (n = e.getTracks()),
                                                        this.getSenders().forEach(function (e) {
                                                            n.includes(e.track) && t.removeTrack(e);
                                                        }));
                                                }));
                                    }
                                }),
                                (n.shimRemoteStreamsAPI = function (e) {
                                    {
                                        var t;
                                        'object' !== c(e) ||
                                            !e.RTCPeerConnection ||
                                            ('getRemoteStreams' in e.RTCPeerConnection.prototype ||
                                                (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
                                                    return this._remoteStreams || [];
                                                }),
                                            'onaddstream' in e.RTCPeerConnection.prototype) ||
                                            (Object.defineProperty(e.RTCPeerConnection.prototype, 'onaddstream', {
                                                get: function () {
                                                    return this._onaddstream;
                                                },
                                                set: function (e) {
                                                    var n = this;
                                                    this._onaddstream &&
                                                        (this.removeEventListener('addstream', this._onaddstream),
                                                        this.removeEventListener('track', this._onaddstreampoly)),
                                                        this.addEventListener('addstream', (this._onaddstream = e)),
                                                        this.addEventListener(
                                                            'track',
                                                            (this._onaddstreampoly = function (e) {
                                                                e.streams.forEach(function (e) {
                                                                    var t;
                                                                    n._remoteStreams || (n._remoteStreams = []),
                                                                        n._remoteStreams.includes(e) ||
                                                                            (n._remoteStreams.push(e),
                                                                            ((t = new Event('addstream')).stream = e),
                                                                            n.dispatchEvent(t));
                                                                });
                                                            })
                                                        );
                                                },
                                            }),
                                            (t = e.RTCPeerConnection.prototype.setRemoteDescription),
                                            (e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                                                var n = this;
                                                return (
                                                    this._onaddstreampoly ||
                                                        this.addEventListener(
                                                            'track',
                                                            (this._onaddstreampoly = function (e) {
                                                                e.streams.forEach(function (e) {
                                                                    var t;
                                                                    n._remoteStreams || (n._remoteStreams = []),
                                                                        0 <= n._remoteStreams.indexOf(e) ||
                                                                            (n._remoteStreams.push(e),
                                                                            ((t = new Event('addstream')).stream = e),
                                                                            n.dispatchEvent(t));
                                                                });
                                                            })
                                                        ),
                                                    t.apply(n, arguments)
                                                );
                                            }));
                                    }
                                }),
                                (n.shimCallbacksAPI = function (e) {
                                    {
                                        var t, r, i, o, s, a;
                                        'object' === c(e) &&
                                            e.RTCPeerConnection &&
                                            ((t = e.RTCPeerConnection.prototype),
                                            (r = t.createOffer),
                                            (i = t.createAnswer),
                                            (o = t.setLocalDescription),
                                            (s = t.setRemoteDescription),
                                            (a = t.addIceCandidate),
                                            (t.createOffer = function (e, t) {
                                                var n = r.apply(this, [2 <= arguments.length ? arguments[2] : e]);
                                                return t ? (n.then(e, t), Promise.resolve()) : n;
                                            }),
                                            (t.createAnswer = function (e, t) {
                                                var n = i.apply(this, [2 <= arguments.length ? arguments[2] : e]);
                                                return t ? (n.then(e, t), Promise.resolve()) : n;
                                            }),
                                            (e = function (e, t, n) {
                                                e = o.apply(this, [e]);
                                                return n ? (e.then(t, n), Promise.resolve()) : e;
                                            }),
                                            (t.setLocalDescription = e),
                                            (e = function (e, t, n) {
                                                e = s.apply(this, [e]);
                                                return n ? (e.then(t, n), Promise.resolve()) : e;
                                            }),
                                            (t.setRemoteDescription = e),
                                            (e = function (e, t, n) {
                                                e = a.apply(this, [e]);
                                                return n ? (e.then(t, n), Promise.resolve()) : e;
                                            }),
                                            (t.addIceCandidate = e));
                                    }
                                }),
                                (n.shimGetUserMedia = function (e) {
                                    var r = e && e.navigator;
                                    {
                                        var t;
                                        r.mediaDevices &&
                                            r.mediaDevices.getUserMedia &&
                                            ((e = r.mediaDevices),
                                            (t = e.getUserMedia.bind(e)),
                                            (r.mediaDevices.getUserMedia = function (e) {
                                                return t(i(e));
                                            }));
                                    }
                                    !r.getUserMedia &&
                                        r.mediaDevices &&
                                        r.mediaDevices.getUserMedia &&
                                        (r.getUserMedia = function (e, t, n) {
                                            r.mediaDevices.getUserMedia(e).then(t, n);
                                        }.bind(r));
                                }),
                                (n.shimConstraints = i),
                                (n.shimRTCIceServerUrls = function (e) {
                                    {
                                        var o;
                                        e.RTCPeerConnection &&
                                            ((o = e.RTCPeerConnection),
                                            (e.RTCPeerConnection = function (e, t) {
                                                if (e && e.iceServers) {
                                                    for (var n = [], r = 0; r < e.iceServers.length; r++) {
                                                        var i = e.iceServers[r];
                                                        !i.hasOwnProperty('urls') && i.hasOwnProperty('url')
                                                            ? (s.deprecated('RTCIceServer.url', 'RTCIceServer.urls'),
                                                              ((i = JSON.parse(JSON.stringify(i))).urls = i.url),
                                                              delete i.url,
                                                              n.push(i))
                                                            : n.push(e.iceServers[r]);
                                                    }
                                                    e.iceServers = n;
                                                }
                                                return new o(e, t);
                                            }),
                                            (e.RTCPeerConnection.prototype = o.prototype),
                                            'generateCertificate' in o &&
                                                Object.defineProperty(e.RTCPeerConnection, 'generateCertificate', {
                                                    get: function () {
                                                        return o.generateCertificate;
                                                    },
                                                }));
                                    }
                                }),
                                (n.shimTrackEventTransceiver = function (e) {
                                    'object' === c(e) &&
                                        e.RTCTrackEvent &&
                                        'receiver' in e.RTCTrackEvent.prototype &&
                                        !('transceiver' in e.RTCTrackEvent.prototype) &&
                                        Object.defineProperty(e.RTCTrackEvent.prototype, 'transceiver', {
                                            get: function () {
                                                return { receiver: this.receiver };
                                            },
                                        });
                                }),
                                (n.shimCreateOfferLegacy = function (e) {
                                    var n = e.RTCPeerConnection.prototype.createOffer;
                                    e.RTCPeerConnection.prototype.createOffer = function (e) {
                                        var t;
                                        return (
                                            e &&
                                                (void 0 !== e.offerToReceiveAudio &&
                                                    (e.offerToReceiveAudio = !!e.offerToReceiveAudio),
                                                (t = this.getTransceivers().find(function (e) {
                                                    return 'audio' === e.receiver.track.kind;
                                                })),
                                                !1 === e.offerToReceiveAudio && t
                                                    ? 'sendrecv' === t.direction
                                                        ? t.setDirection
                                                            ? t.setDirection('sendonly')
                                                            : (t.direction = 'sendonly')
                                                        : 'recvonly' === t.direction &&
                                                          (t.setDirection
                                                              ? t.setDirection('inactive')
                                                              : (t.direction = 'inactive'))
                                                    : !0 !== e.offerToReceiveAudio || t || this.addTransceiver('audio'),
                                                void 0 !== e.offerToReceiveVideo &&
                                                    (e.offerToReceiveVideo = !!e.offerToReceiveVideo),
                                                (t = this.getTransceivers().find(function (e) {
                                                    return 'video' === e.receiver.track.kind;
                                                })),
                                                !1 === e.offerToReceiveVideo && t
                                                    ? 'sendrecv' === t.direction
                                                        ? t.setDirection
                                                            ? t.setDirection('sendonly')
                                                            : (t.direction = 'sendonly')
                                                        : 'recvonly' === t.direction &&
                                                          (t.setDirection
                                                              ? t.setDirection('inactive')
                                                              : (t.direction = 'inactive'))
                                                    : !0 !== e.offerToReceiveVideo ||
                                                      t ||
                                                      this.addTransceiver('video')),
                                            n.apply(this, arguments)
                                        );
                                    };
                                }),
                                (n.shimAudioContext = function (e) {
                                    'object' !== c(e) || e.AudioContext || (e.AudioContext = e.webkitAudioContext);
                                });
                            var s = (function (e) {
                                if (e && e.__esModule) return e;
                                if (null === e || ('object' != typeof e && 'function' != typeof e))
                                    return { default: e };
                                var t = a();
                                if (t && t.has(e)) return t.get(e);
                                var n,
                                    r = {},
                                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                for (n in e) {
                                    var o;
                                    Object.prototype.hasOwnProperty.call(e, n) &&
                                        ((o = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set)
                                            ? Object.defineProperty(r, n, o)
                                            : (r[n] = e[n]));
                                }
                                return (r.default = e), t && t.set(e, r), r;
                            })(e('../utils'));
                            function a() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (a = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                            function c(e) {
                                return (c =
                                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e &&
                                                  'function' == typeof Symbol &&
                                                  e.constructor === Symbol &&
                                                  e !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof e;
                                          })(e);
                            }
                            function i(e) {
                                return e && void 0 !== e.video
                                    ? Object.assign({}, e, { video: s.compactObject(e.video) })
                                    : e;
                            }
                        },
                        { '../utils': 'iSxC' },
                    ],
                    GOQK: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.shimRTCIceCandidate = function (t) {
                                    {
                                        var i;
                                        !t.RTCIceCandidate ||
                                            (t.RTCIceCandidate && 'foundation' in t.RTCIceCandidate.prototype) ||
                                            ((i = t.RTCIceCandidate),
                                            (t.RTCIceCandidate = function (e) {
                                                if (
                                                    ('object' === c(e) &&
                                                        e.candidate &&
                                                        0 === e.candidate.indexOf('a=') &&
                                                        ((e = JSON.parse(
                                                            JSON.stringify(e)
                                                        )).candidate = e.candidate.substr(2)),
                                                    e.candidate && e.candidate.length)
                                                ) {
                                                    var t = new i(e),
                                                        n = o.default.parseCandidate(e.candidate),
                                                        r = Object.assign(t, n);
                                                    return (
                                                        (r.toJSON = function () {
                                                            return {
                                                                candidate: r.candidate,
                                                                sdpMid: r.sdpMid,
                                                                sdpMLineIndex: r.sdpMLineIndex,
                                                                usernameFragment: r.usernameFragment,
                                                            };
                                                        }),
                                                        r
                                                    );
                                                }
                                                return new i(e);
                                            }),
                                            (t.RTCIceCandidate.prototype = i.prototype),
                                            s.wrapPeerConnectionEvent(t, 'icecandidate', function (e) {
                                                return (
                                                    e.candidate &&
                                                        Object.defineProperty(e, 'candidate', {
                                                            value: new t.RTCIceCandidate(e.candidate),
                                                            writable: 'false',
                                                        }),
                                                    e
                                                );
                                            }));
                                    }
                                }),
                                (n.shimMaxMessageSize = function (e, r) {
                                    {
                                        var i;
                                        e.RTCPeerConnection &&
                                            ('sctp' in e.RTCPeerConnection.prototype ||
                                                Object.defineProperty(e.RTCPeerConnection.prototype, 'sctp', {
                                                    get: function () {
                                                        return void 0 === this._sctp ? null : this._sctp;
                                                    },
                                                }),
                                            (i = e.RTCPeerConnection.prototype.setRemoteDescription),
                                            (e.RTCPeerConnection.prototype.setRemoteDescription = function () {
                                                var e, t, n;
                                                return (
                                                    (this._sctp = null),
                                                    'chrome' === r.browser &&
                                                        76 <= r.version &&
                                                        ((n = this.getConfiguration()['sdpSemantics']),
                                                        'plan-b' === n &&
                                                            Object.defineProperty(this, 'sctp', {
                                                                get: function () {
                                                                    return void 0 === this._sctp ? null : this._sctp;
                                                                },
                                                                enumerable: !0,
                                                                configurable: !0,
                                                            })),
                                                    (function (e) {
                                                        if (e && e.sdp) {
                                                            e = o.default.splitSections(e.sdp);
                                                            return (
                                                                e.shift(),
                                                                e.some(function (e) {
                                                                    e = o.default.parseMLine(e);
                                                                    return (
                                                                        e &&
                                                                        'application' === e.kind &&
                                                                        -1 !== e.protocol.indexOf('SCTP')
                                                                    );
                                                                })
                                                            );
                                                        }
                                                    })(arguments[0]) &&
                                                        ((t = (function (e) {
                                                            e = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                                                            if (null === e || e.length < 2) return -1;
                                                            e = parseInt(e[1], 10);
                                                            return e != e ? -1 : e;
                                                        })(arguments[0])),
                                                        (n = 65536),
                                                        (n = n =
                                                            'firefox' === r.browser
                                                                ? r.version < 57
                                                                    ? -1 === t
                                                                        ? 16384
                                                                        : 2147483637
                                                                    : r.version < 60
                                                                    ? 57 === r.version
                                                                        ? 65535
                                                                        : 65536
                                                                    : 2147483637
                                                                : n),
                                                        (t = (function (e, t) {
                                                            var n = 65536;
                                                            'firefox' === r.browser && 57 === r.version && (n = 65535);
                                                            e = o.default.matchPrefix(e.sdp, 'a=max-message-size:');
                                                            return (
                                                                0 < e.length
                                                                    ? (n = parseInt(e[0].substr(19), 10))
                                                                    : 'firefox' === r.browser &&
                                                                      -1 !== t &&
                                                                      (n = 2147483637),
                                                                n
                                                            );
                                                        })(arguments[0], t)),
                                                        (e =
                                                            0 === n && 0 === t
                                                                ? Number.POSITIVE_INFINITY
                                                                : 0 === n || 0 === t
                                                                ? Math.max(n, t)
                                                                : Math.min(n, t)),
                                                        (t = {}),
                                                        Object.defineProperty(t, 'maxMessageSize', {
                                                            get: function () {
                                                                return e;
                                                            },
                                                        }),
                                                        (this._sctp = t)),
                                                    i.apply(this, arguments)
                                                );
                                            }));
                                    }
                                }),
                                (n.shimSendThrowTypeError = function (e) {
                                    {
                                        var t;
                                        e.RTCPeerConnection &&
                                            'createDataChannel' in e.RTCPeerConnection.prototype &&
                                            ((t = e.RTCPeerConnection.prototype.createDataChannel),
                                            (e.RTCPeerConnection.prototype.createDataChannel = function () {
                                                var e = t.apply(this, arguments);
                                                return n(e, this), e;
                                            }),
                                            s.wrapPeerConnectionEvent(e, 'datachannel', function (e) {
                                                return n(e.channel, e.target), e;
                                            }));
                                    }
                                    function n(t, n) {
                                        var r = t.send;
                                        t.send = function () {
                                            var e = arguments[0],
                                                e = e.length || e.size || e.byteLength;
                                            if ('open' === t.readyState && n.sctp && e > n.sctp.maxMessageSize)
                                                throw new TypeError(
                                                    'Message too large (can send a maximum of ' +
                                                        n.sctp.maxMessageSize +
                                                        ' bytes)'
                                                );
                                            return r.apply(t, arguments);
                                        };
                                    }
                                }),
                                (n.shimConnectionState = function (e) {
                                    {
                                        var n;
                                        !e.RTCPeerConnection ||
                                            'connectionState' in e.RTCPeerConnection.prototype ||
                                            ((n = e.RTCPeerConnection.prototype),
                                            Object.defineProperty(n, 'connectionState', {
                                                get: function () {
                                                    return (
                                                        { completed: 'connected', checking: 'connecting' }[
                                                            this.iceConnectionState
                                                        ] || this.iceConnectionState
                                                    );
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(n, 'onconnectionstatechange', {
                                                get: function () {
                                                    return this._onconnectionstatechange || null;
                                                },
                                                set: function (e) {
                                                    this._onconnectionstatechange &&
                                                        (this.removeEventListener(
                                                            'connectionstatechange',
                                                            this._onconnectionstatechange
                                                        ),
                                                        delete this._onconnectionstatechange),
                                                        e &&
                                                            this.addEventListener(
                                                                'connectionstatechange',
                                                                (this._onconnectionstatechange = e)
                                                            );
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            ['setLocalDescription', 'setRemoteDescription'].forEach(function (e) {
                                                var t = n[e];
                                                n[e] = function () {
                                                    return (
                                                        this._connectionstatechangepoly ||
                                                            ((this._connectionstatechangepoly = function (e) {
                                                                var t,
                                                                    n = e.target;
                                                                return (
                                                                    n._lastConnectionState !== n.connectionState &&
                                                                        ((n._lastConnectionState = n.connectionState),
                                                                        (t = new Event('connectionstatechange', e)),
                                                                        n.dispatchEvent(t)),
                                                                    e
                                                                );
                                                            }),
                                                            this.addEventListener(
                                                                'iceconnectionstatechange',
                                                                this._connectionstatechangepoly
                                                            )),
                                                        t.apply(this, arguments)
                                                    );
                                                };
                                            }));
                                    }
                                }),
                                (n.removeExtmapAllowMixed = function (n, e) {
                                    {
                                        var r;
                                        n.RTCPeerConnection &&
                                            !(
                                                ('chrome' === e.browser && 71 <= e.version) ||
                                                ('safari' === e.browser && 605 <= e.version)
                                            ) &&
                                            ((r = n.RTCPeerConnection.prototype.setRemoteDescription),
                                            (n.RTCPeerConnection.prototype.setRemoteDescription = function (e) {
                                                var t;
                                                return (
                                                    e &&
                                                        e.sdp &&
                                                        -1 !== e.sdp.indexOf('\na=extmap-allow-mixed') &&
                                                        ((t = e.sdp
                                                            .split('\n')
                                                            .filter(function (e) {
                                                                return 'a=extmap-allow-mixed' !== e.trim();
                                                            })
                                                            .join('\n')),
                                                        n.RTCSessionDescription && e instanceof n.RTCSessionDescription
                                                            ? (arguments[0] = new n.RTCSessionDescription({
                                                                  type: e.type,
                                                                  sdp: t,
                                                              }))
                                                            : (e.sdp = t)),
                                                    r.apply(this, arguments)
                                                );
                                            }));
                                    }
                                }),
                                (n.shimAddIceCandidateNullOrEmpty = function (e, t) {
                                    {
                                        var n;
                                        e.RTCPeerConnection &&
                                            e.RTCPeerConnection.prototype &&
                                            (n = e.RTCPeerConnection.prototype.addIceCandidate) &&
                                            0 !== n.length &&
                                            (e.RTCPeerConnection.prototype.addIceCandidate = function () {
                                                return arguments[0]
                                                    ? (('chrome' === t.browser && t.version < 78) ||
                                                          ('firefox' === t.browser && t.version < 68) ||
                                                          'safari' === t.browser) &&
                                                      arguments[0] &&
                                                      '' === arguments[0].candidate
                                                        ? Promise.resolve()
                                                        : n.apply(this, arguments)
                                                    : (arguments[1] && arguments[1].apply(null), Promise.resolve());
                                            });
                                    }
                                });
                            var r,
                                o = (r = e('sdp')) && r.__esModule ? r : { default: r },
                                s = (function (e) {
                                    if (e && e.__esModule) return e;
                                    if (null === e || ('object' != typeof e && 'function' != typeof e))
                                        return { default: e };
                                    var t = a();
                                    if (t && t.has(e)) return t.get(e);
                                    var n,
                                        r = {},
                                        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                    for (n in e) {
                                        var o;
                                        Object.prototype.hasOwnProperty.call(e, n) &&
                                            ((o = i ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set)
                                                ? Object.defineProperty(r, n, o)
                                                : (r[n] = e[n]));
                                    }
                                    return (r.default = e), t && t.set(e, r), r;
                                })(e('./utils'));
                            function a() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (a = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                            function c(e) {
                                return (c =
                                    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e &&
                                                  'function' == typeof Symbol &&
                                                  e.constructor === Symbol &&
                                                  e !== Symbol.prototype
                                                  ? 'symbol'
                                                  : typeof e;
                                          })(e);
                            }
                        },
                        { sdp: 'YHvh', './utils': 'iSxC' },
                    ],
                    KtlG: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.adapterFactory = function () {
                                    var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})[
                                            'window'
                                        ],
                                        t =
                                            1 < arguments.length && void 0 !== arguments[1]
                                                ? arguments[1]
                                                : { shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0 },
                                        n = o.log,
                                        r = o.detectBrowser(e),
                                        i = {
                                            browserDetails: r,
                                            commonShim: d,
                                            extractVersion: o.extractVersion,
                                            disableLog: o.disableLog,
                                            disableWarnings: o.disableWarnings,
                                        };
                                    switch (r.browser) {
                                        case 'chrome':
                                            if (!s || !s.shimPeerConnection || !t.shimChrome)
                                                return n('Chrome shim is not included in this adapter release.'), i;
                                            if (null === r.version)
                                                return n('Chrome shim can not determine version, not shimming.'), i;
                                            n('adapter.js shimming chrome.'),
                                                (i.browserShim = s),
                                                d.shimAddIceCandidateNullOrEmpty(e, r),
                                                s.shimGetUserMedia(e, r),
                                                s.shimMediaStream(e, r),
                                                s.shimPeerConnection(e, r),
                                                s.shimOnTrack(e, r),
                                                s.shimAddTrackRemoveTrack(e, r),
                                                s.shimGetSendersWithDtmf(e, r),
                                                s.shimGetStats(e, r),
                                                s.shimSenderReceiverGetStats(e, r),
                                                s.fixNegotiationNeeded(e, r),
                                                d.shimRTCIceCandidate(e, r),
                                                d.shimConnectionState(e, r),
                                                d.shimMaxMessageSize(e, r),
                                                d.shimSendThrowTypeError(e, r),
                                                d.removeExtmapAllowMixed(e, r);
                                            break;
                                        case 'firefox':
                                            if (!c || !c.shimPeerConnection || !t.shimFirefox)
                                                return n('Firefox shim is not included in this adapter release.'), i;
                                            n('adapter.js shimming firefox.'),
                                                (i.browserShim = c),
                                                d.shimAddIceCandidateNullOrEmpty(e, r),
                                                c.shimGetUserMedia(e, r),
                                                c.shimPeerConnection(e, r),
                                                c.shimOnTrack(e, r),
                                                c.shimRemoveStream(e, r),
                                                c.shimSenderGetStats(e, r),
                                                c.shimReceiverGetStats(e, r),
                                                c.shimRTCDataChannel(e, r),
                                                c.shimAddTransceiver(e, r),
                                                c.shimGetParameters(e, r),
                                                c.shimCreateOffer(e, r),
                                                c.shimCreateAnswer(e, r),
                                                d.shimRTCIceCandidate(e, r),
                                                d.shimConnectionState(e, r),
                                                d.shimMaxMessageSize(e, r),
                                                d.shimSendThrowTypeError(e, r);
                                            break;
                                        case 'edge':
                                            if (!a || !a.shimPeerConnection || !t.shimEdge)
                                                return n('MS edge shim is not included in this adapter release.'), i;
                                            n('adapter.js shimming edge.'),
                                                (i.browserShim = a).shimGetUserMedia(e, r),
                                                a.shimGetDisplayMedia(e, r),
                                                a.shimPeerConnection(e, r),
                                                a.shimReplaceTrack(e, r),
                                                d.shimMaxMessageSize(e, r),
                                                d.shimSendThrowTypeError(e, r);
                                            break;
                                        case 'safari':
                                            if (!u || !t.shimSafari)
                                                return n('Safari shim is not included in this adapter release.'), i;
                                            n('adapter.js shimming safari.'),
                                                (i.browserShim = u),
                                                d.shimAddIceCandidateNullOrEmpty(e, r),
                                                u.shimRTCIceServerUrls(e, r),
                                                u.shimCreateOfferLegacy(e, r),
                                                u.shimCallbacksAPI(e, r),
                                                u.shimLocalStreamsAPI(e, r),
                                                u.shimRemoteStreamsAPI(e, r),
                                                u.shimTrackEventTransceiver(e, r),
                                                u.shimGetUserMedia(e, r),
                                                u.shimAudioContext(e, r),
                                                d.shimRTCIceCandidate(e, r),
                                                d.shimMaxMessageSize(e, r),
                                                d.shimSendThrowTypeError(e, r),
                                                d.removeExtmapAllowMixed(e, r);
                                            break;
                                        default:
                                            n('Unsupported browser!');
                                    }
                                    return i;
                                });
                            var o = r(e('./utils')),
                                s = r(e('./chrome/chrome_shim')),
                                a = r(e('./edge/edge_shim')),
                                c = r(e('./firefox/firefox_shim')),
                                u = r(e('./safari/safari_shim')),
                                d = r(e('./common_shim'));
                            function l() {
                                if ('function' != typeof WeakMap) return null;
                                var e = new WeakMap();
                                return (
                                    (l = function () {
                                        return e;
                                    }),
                                    e
                                );
                            }
                            function r(e) {
                                if (e && e.__esModule) return e;
                                if (null === e || ('object' != typeof e && 'function' != typeof e))
                                    return { default: e };
                                var t = l();
                                if (t && t.has(e)) return t.get(e);
                                var n,
                                    r,
                                    i = {},
                                    o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                                for (n in e)
                                    Object.prototype.hasOwnProperty.call(e, n) &&
                                        ((r = o ? Object.getOwnPropertyDescriptor(e, n) : null) && (r.get || r.set)
                                            ? Object.defineProperty(i, n, r)
                                            : (i[n] = e[n]));
                                return (i.default = e), t && t.set(e, i), i;
                            }
                        },
                        {
                            './utils': 'iSxC',
                            './chrome/chrome_shim': 'uI5X',
                            './edge/edge_shim': 'XRic',
                            './firefox/firefox_shim': 'Fzdr',
                            './safari/safari_shim': 't1lL',
                            './common_shim': 'GOQK',
                        },
                    ],
                    tI1X: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 });
                            e = ((n.default = void 0), e('./adapter_factory.js').adapterFactory)({
                                window: 'undefined' == typeof window ? void 0 : window,
                            });
                            n.default = e;
                        },
                        { './adapter_factory.js': 'KtlG' },
                    ],
                    sXtV: [
                        function (e, t, n) {
                            var r =
                                (this && this.__importDefault) ||
                                function (e) {
                                    return e && e.__esModule ? e : { default: e };
                                };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.webRTCAdapter = void 0);
                            e = r(e('webrtc-adapter'));
                            n.webRTCAdapter = e.default;
                        },
                        { 'webrtc-adapter': 'tI1X' },
                    ],
                    I31f: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.Supports = void 0);
                            var r = e('./adapter');
                            function i() {
                                (this.isIOS = ['iPad', 'iPhone', 'iPod'].includes(navigator.platform)),
                                    (this.supportedBrowsers = ['firefox', 'chrome', 'safari']),
                                    (this.minFirefoxVersion = 59),
                                    (this.minChromeVersion = 72),
                                    (this.minSafariVersion = 605);
                            }
                            n.Supports =
                                ((i.prototype.isWebRTCSupported = function () {
                                    return 'undefined' != typeof RTCPeerConnection;
                                }),
                                (i.prototype.isBrowserSupported = function () {
                                    var e = this.getBrowser(),
                                        t = this.getVersion();
                                    return (
                                        !!this.supportedBrowsers.includes(e) &&
                                        ('chrome' === e
                                            ? t >= this.minChromeVersion
                                            : 'firefox' === e
                                            ? t >= this.minFirefoxVersion
                                            : 'safari' === e && !this.isIOS && t >= this.minSafariVersion)
                                    );
                                }),
                                (i.prototype.getBrowser = function () {
                                    return r.webRTCAdapter.browserDetails.browser;
                                }),
                                (i.prototype.getVersion = function () {
                                    return r.webRTCAdapter.browserDetails.version || 0;
                                }),
                                (i.prototype.isUnifiedPlanSupported = function () {
                                    var e,
                                        t = this.getBrowser(),
                                        n = r.webRTCAdapter.browserDetails.version || 0;
                                    if ('chrome' === t && n < 72) return !1;
                                    if ('firefox' === t && 59 <= n) return !0;
                                    if (
                                        !(window.RTCRtpTransceiver && 'currentDirection' in RTCRtpTransceiver.prototype)
                                    )
                                        return !1;
                                    n = !1;
                                    try {
                                        (e = new RTCPeerConnection()).addTransceiver('audio'), (n = !0);
                                    } catch (e) {
                                    } finally {
                                        e && e.close();
                                    }
                                    return n;
                                }),
                                (i.prototype.toString = function () {
                                    return (
                                        'Supports: \n    browser:' +
                                        this.getBrowser() +
                                        ' \n    version:' +
                                        this.getVersion() +
                                        ' \n    isIOS:' +
                                        this.isIOS +
                                        ' \n    isWebRTCSupported:' +
                                        this.isWebRTCSupported() +
                                        ' \n    isBrowserSupported:' +
                                        this.isBrowserSupported() +
                                        ' \n    isUnifiedPlanSupported:' +
                                        this.isUnifiedPlanSupported()
                                    );
                                }),
                                new i());
                        },
                        { './adapter': 'sXtV' },
                    ],
                    BHXf: [
                        function (e, t, c) {
                            var r =
                                    (this && this.__createBinding) ||
                                    (Object.create
                                        ? function (e, t, n, r) {
                                              void 0 === r && (r = n),
                                                  Object.defineProperty(e, r, {
                                                      enumerable: !0,
                                                      get: function () {
                                                          return t[n];
                                                      },
                                                  });
                                          }
                                        : function (e, t, n, r) {
                                              e[(r = void 0 === r ? n : r)] = t[n];
                                          }),
                                i =
                                    (this && this.__setModuleDefault) ||
                                    (Object.create
                                        ? function (e, t) {
                                              Object.defineProperty(e, 'default', { enumerable: !0, value: t });
                                          }
                                        : function (e, t) {
                                              e.default = t;
                                          }),
                                n =
                                    (this && this.__importStar) ||
                                    function (e) {
                                        if (e && e.__esModule) return e;
                                        var t = {};
                                        if (null != e)
                                            for (var n in e)
                                                'default' !== n &&
                                                    Object.prototype.hasOwnProperty.call(e, n) &&
                                                    r(t, e, n);
                                        return i(t, e), t;
                                    };
                            Object.defineProperty(c, '__esModule', { value: !0 }), (c.util = void 0);
                            var o = n(e('peerjs-js-binarypack')),
                                s = e('./supports'),
                                a = {
                                    iceServers: [
                                        { urls: 'stun:stun.l.google.com:19302' },
                                        { urls: 'turn:0.peerjs.com:3478', username: 'peerjs', credential: 'peerjsp' },
                                    ],
                                    sdpSemantics: 'unified-plan',
                                };
                            function u() {
                                (this.CLOUD_HOST = '0.peerjs.com'),
                                    (this.CLOUD_PORT = 443),
                                    (this.chunkedBrowsers = { Chrome: 1, chrome: 1 }),
                                    (this.chunkedMTU = 16300),
                                    (this.defaultConfig = a),
                                    (this.browser = s.Supports.getBrowser()),
                                    (this.browserVersion = s.Supports.getVersion()),
                                    (this.supports = (function () {
                                        var e,
                                            t = {
                                                browser: s.Supports.isBrowserSupported(),
                                                webRTC: s.Supports.isWebRTCSupported(),
                                                audioVideo: !1,
                                                data: !1,
                                                binaryBlob: !1,
                                                reliable: !1,
                                            };
                                        if (!t.webRTC) return t;
                                        try {
                                            (e = new RTCPeerConnection(a)), (t.audioVideo = !0);
                                            var n = void 0;
                                            try {
                                                (n = e.createDataChannel('_PEERJSTEST', { ordered: !0 })),
                                                    (t.data = !0),
                                                    (t.reliable = !!n.ordered);
                                                try {
                                                    (n.binaryType = 'blob'), (t.binaryBlob = !s.Supports.isIOS);
                                                } catch (e) {}
                                            } catch (e) {
                                            } finally {
                                                n && n.close();
                                            }
                                        } catch (e) {
                                        } finally {
                                            e && e.close();
                                        }
                                        return t;
                                    })()),
                                    (this.pack = o.pack),
                                    (this.unpack = o.unpack),
                                    (this._dataCount = 1);
                            }
                            c.util =
                                ((u.prototype.noop = function () {}),
                                (u.prototype.validateId = function (e) {
                                    return !e || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e);
                                }),
                                (u.prototype.chunk = function (e) {
                                    for (
                                        var t = [], n = e.size, r = Math.ceil(n / c.util.chunkedMTU), i = 0, o = 0;
                                        o < n;

                                    ) {
                                        var s = Math.min(n, o + c.util.chunkedMTU),
                                            a = e.slice(o, s),
                                            a = { __peerData: this._dataCount, n: i, data: a, total: r };
                                        t.push(a), (o = s), i++;
                                    }
                                    return this._dataCount++, t;
                                }),
                                (u.prototype.blobToArrayBuffer = function (e, t) {
                                    var n = new FileReader();
                                    return (
                                        (n.onload = function (e) {
                                            e.target && t(e.target.result);
                                        }),
                                        n.readAsArrayBuffer(e),
                                        n
                                    );
                                }),
                                (u.prototype.binaryStringToArrayBuffer = function (e) {
                                    for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++)
                                        t[n] = 255 & e.charCodeAt(n);
                                    return t.buffer;
                                }),
                                (u.prototype.randomToken = function () {
                                    return Math.random().toString(36).substr(2);
                                }),
                                (u.prototype.isSecure = function () {
                                    return 'https:' === location.protocol;
                                }),
                                new u());
                        },
                        { 'peerjs-js-binarypack': 'kdPp', './supports': 'I31f' },
                    ],
                    JJlS: [
                        function (e, t, n) {
                            var r = Object.prototype.hasOwnProperty,
                                h = '~';
                            function i() {}
                            function o(e, t, n) {
                                (this.fn = e), (this.context = t), (this.once = n || !1);
                            }
                            function s(e, t, n, r, i) {
                                if ('function' != typeof n) throw new TypeError('The listener must be a function');
                                (i = new o(n, r || e, i)), (t = h ? h + t : t);
                                return (
                                    e._events[t]
                                        ? e._events[t].fn
                                            ? (e._events[t] = [e._events[t], i])
                                            : e._events[t].push(i)
                                        : ((e._events[t] = i), e._eventsCount++),
                                    e
                                );
                            }
                            function c(e, t) {
                                0 == --e._eventsCount ? (e._events = new i()) : delete e._events[t];
                            }
                            function a() {
                                (this._events = new i()), (this._eventsCount = 0);
                            }
                            Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (h = !1)),
                                (a.prototype.eventNames = function () {
                                    var e,
                                        t,
                                        n = [];
                                    if (0 === this._eventsCount) return n;
                                    for (t in (e = this._events)) r.call(e, t) && n.push(h ? t.slice(1) : t);
                                    return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n;
                                }),
                                (a.prototype.listeners = function (e) {
                                    var e = h ? h + e : e,
                                        t = this._events[e];
                                    if (!t) return [];
                                    if (t.fn) return [t.fn];
                                    for (var n = 0, r = t.length, i = new Array(r); n < r; n++) i[n] = t[n].fn;
                                    return i;
                                }),
                                (a.prototype.listenerCount = function (e) {
                                    (e = h ? h + e : e), (e = this._events[e]);
                                    return e ? (e.fn ? 1 : e.length) : 0;
                                }),
                                (a.prototype.emit = function (e, t, n, r, i, o) {
                                    var s = h ? h + e : e;
                                    if (!this._events[s]) return !1;
                                    var a,
                                        c = this._events[s],
                                        u = arguments.length;
                                    if (c.fn) {
                                        switch ((c.once && this.removeListener(e, c.fn, void 0, !0), u)) {
                                            case 1:
                                                return c.fn.call(c.context), !0;
                                            case 2:
                                                return c.fn.call(c.context, t), !0;
                                            case 3:
                                                return c.fn.call(c.context, t, n), !0;
                                            case 4:
                                                return c.fn.call(c.context, t, n, r), !0;
                                            case 5:
                                                return c.fn.call(c.context, t, n, r, i), !0;
                                            case 6:
                                                return c.fn.call(c.context, t, n, r, i, o), !0;
                                        }
                                        for (p = 1, a = new Array(u - 1); p < u; p++) a[p - 1] = arguments[p];
                                        c.fn.apply(c.context, a);
                                    } else
                                        for (var d, l = c.length, p = 0; p < l; p++)
                                            switch ((c[p].once && this.removeListener(e, c[p].fn, void 0, !0), u)) {
                                                case 1:
                                                    c[p].fn.call(c[p].context);
                                                    break;
                                                case 2:
                                                    c[p].fn.call(c[p].context, t);
                                                    break;
                                                case 3:
                                                    c[p].fn.call(c[p].context, t, n);
                                                    break;
                                                case 4:
                                                    c[p].fn.call(c[p].context, t, n, r);
                                                    break;
                                                default:
                                                    if (!a)
                                                        for (d = 1, a = new Array(u - 1); d < u; d++)
                                                            a[d - 1] = arguments[d];
                                                    c[p].fn.apply(c[p].context, a);
                                            }
                                    return !0;
                                }),
                                (a.prototype.on = function (e, t, n) {
                                    return s(this, e, t, n, !1);
                                }),
                                (a.prototype.once = function (e, t, n) {
                                    return s(this, e, t, n, !0);
                                }),
                                (a.prototype.removeListener = function (e, t, n, r) {
                                    e = h ? h + e : e;
                                    if (!this._events[e]) return this;
                                    if (!t) return c(this, e), this;
                                    var i = this._events[e];
                                    if (i.fn) i.fn !== t || (r && !i.once) || (n && i.context !== n) || c(this, e);
                                    else {
                                        for (var o = 0, s = [], a = i.length; o < a; o++)
                                            (i[o].fn !== t || (r && !i[o].once) || (n && i[o].context !== n)) &&
                                                s.push(i[o]);
                                        s.length ? (this._events[e] = 1 === s.length ? s[0] : s) : c(this, e);
                                    }
                                    return this;
                                }),
                                (a.prototype.removeAllListeners = function (e) {
                                    return (
                                        e
                                            ? ((e = h ? h + e : e), this._events[e] && c(this, e))
                                            : ((this._events = new i()), (this._eventsCount = 0)),
                                        this
                                    );
                                }),
                                (a.prototype.off = a.prototype.removeListener),
                                (a.prototype.addListener = a.prototype.on),
                                (a.prefixed = h),
                                (a.EventEmitter = a),
                                void 0 !== t && (t.exports = a);
                        },
                        {},
                    ],
                    WOs9: [
                        function (e, t, n) {
                            var o =
                                    (this && this.__read) ||
                                    function (e, t) {
                                        var n = 'function' == typeof Symbol && e[Symbol.iterator];
                                        if (!n) return e;
                                        var r,
                                            i,
                                            o = n.call(e),
                                            s = [];
                                        try {
                                            for (; (void 0 === t || 0 < t--) && !(r = o.next()).done; ) s.push(r.value);
                                        } catch (e) {
                                            i = { error: e };
                                        } finally {
                                            try {
                                                r && !r.done && (n = o.return) && n.call(o);
                                            } finally {
                                                if (i) throw i.error;
                                            }
                                        }
                                        return s;
                                    },
                                s =
                                    (this && this.__spreadArray) ||
                                    function (e, t) {
                                        for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
                                        return e;
                                    };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.LogLevel = void 0);
                            var a;
                            ((r = a = n.LogLevel || (n.LogLevel = {}))[(r.Disabled = 0)] = 'Disabled'),
                                (r[(r.Errors = 1)] = 'Errors'),
                                (r[(r.Warnings = 2)] = 'Warnings'),
                                (r[(r.All = 3)] = 'All');
                            var r =
                                (Object.defineProperty(i.prototype, 'logLevel', {
                                    get: function () {
                                        return this._logLevel;
                                    },
                                    set: function (e) {
                                        this._logLevel = e;
                                    },
                                    enumerable: !1,
                                    configurable: !0,
                                }),
                                (i.prototype.log = function () {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    this._logLevel >= a.All && this._print.apply(this, s([a.All], o(e)));
                                }),
                                (i.prototype.warn = function () {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    this._logLevel >= a.Warnings && this._print.apply(this, s([a.Warnings], o(e)));
                                }),
                                (i.prototype.error = function () {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    this._logLevel >= a.Errors && this._print.apply(this, s([a.Errors], o(e)));
                                }),
                                (i.prototype.setLogFunction = function (e) {
                                    this._print = e;
                                }),
                                (i.prototype._print = function (e) {
                                    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                                    var r,
                                        i = s(['PeerJS: '], o(t));
                                    for (r in i)
                                        i[r] instanceof Error && (i[r] = '(' + i[r].name + ') ' + i[r].message);
                                    e >= a.All
                                        ? console.log.apply(console, s([], o(i)))
                                        : e >= a.Warnings
                                        ? console.warn.apply(console, s(['WARNING'], o(i)))
                                        : e >= a.Errors && console.error.apply(console, s(['ERROR'], o(i)));
                                }),
                                i);
                            function i() {
                                this._logLevel = a.Disabled;
                            }
                            n.default = new r();
                        },
                        {},
                    ],
                    ZRYf: [
                        function (e, t, n) {
                            var r;
                            Object.defineProperty(n, '__esModule', { value: !0 }),
                                (n.ServerMessageType = n.SocketEventType = n.SerializationType = n.PeerErrorType = n.PeerEventType = n.ConnectionType = n.ConnectionEventType = void 0),
                                ((r = n.ConnectionEventType || (n.ConnectionEventType = {})).Open = 'open'),
                                (r.Stream = 'stream'),
                                (r.Data = 'data'),
                                (r.Close = 'close'),
                                (r.Error = 'error'),
                                (r.IceStateChanged = 'iceStateChanged'),
                                ((r = n.ConnectionType || (n.ConnectionType = {})).Data = 'data'),
                                (r.Media = 'media'),
                                ((r = n.PeerEventType || (n.PeerEventType = {})).Open = 'open'),
                                (r.Close = 'close'),
                                (r.Connection = 'connection'),
                                (r.Call = 'call'),
                                (r.Disconnected = 'disconnected'),
                                (r.Error = 'error'),
                                ((r = n.PeerErrorType || (n.PeerErrorType = {})).BrowserIncompatible =
                                    'browser-incompatible'),
                                (r.Disconnected = 'disconnected'),
                                (r.InvalidID = 'invalid-id'),
                                (r.InvalidKey = 'invalid-key'),
                                (r.Network = 'network'),
                                (r.PeerUnavailable = 'peer-unavailable'),
                                (r.SslUnavailable = 'ssl-unavailable'),
                                (r.ServerError = 'server-error'),
                                (r.SocketError = 'socket-error'),
                                (r.SocketClosed = 'socket-closed'),
                                (r.UnavailableID = 'unavailable-id'),
                                (r.WebRTC = 'webrtc'),
                                ((r = n.SerializationType || (n.SerializationType = {})).Binary = 'binary'),
                                (r.BinaryUTF8 = 'binary-utf8'),
                                (r.JSON = 'json'),
                                ((r = n.SocketEventType || (n.SocketEventType = {})).Message = 'message'),
                                (r.Disconnected = 'disconnected'),
                                (r.Error = 'error'),
                                (r.Close = 'close'),
                                ((n = n.ServerMessageType || (n.ServerMessageType = {})).Heartbeat = 'HEARTBEAT'),
                                (n.Candidate = 'CANDIDATE'),
                                (n.Offer = 'OFFER'),
                                (n.Answer = 'ANSWER'),
                                (n.Open = 'OPEN'),
                                (n.Error = 'ERROR'),
                                (n.IdTaken = 'ID-TAKEN'),
                                (n.InvalidKey = 'INVALID-KEY'),
                                (n.Leave = 'LEAVE'),
                                (n.Expire = 'EXPIRE');
                        },
                        {},
                    ],
                    wJlv: [
                        function (e, t, n) {
                            var r,
                                i =
                                    (this && this.__extends) ||
                                    ((r = function (e, t) {
                                        return (r =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (e, t) {
                                                    e.__proto__ = t;
                                                }) ||
                                            function (e, t) {
                                                for (var n in t)
                                                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                                            })(e, t);
                                    }),
                                    function (e, t) {
                                        if ('function' != typeof t && null !== t)
                                            throw new TypeError(
                                                'Class extends value ' + String(t) + ' is not a constructor or null'
                                            );
                                        function n() {
                                            this.constructor = e;
                                        }
                                        r(e, t),
                                            (e.prototype =
                                                null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
                                    }),
                                s =
                                    (this && this.__read) ||
                                    function (e, t) {
                                        var n = 'function' == typeof Symbol && e[Symbol.iterator];
                                        if (!n) return e;
                                        var r,
                                            i,
                                            o = n.call(e),
                                            s = [];
                                        try {
                                            for (; (void 0 === t || 0 < t--) && !(r = o.next()).done; ) s.push(r.value);
                                        } catch (e) {
                                            i = { error: e };
                                        } finally {
                                            try {
                                                r && !r.done && (n = o.return) && n.call(o);
                                            } finally {
                                                if (i) throw i.error;
                                            }
                                        }
                                        return s;
                                    },
                                a =
                                    (this && this.__spreadArray) ||
                                    function (e, t) {
                                        for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
                                        return e;
                                    },
                                c =
                                    (this && this.__values) ||
                                    function (e) {
                                        var t = 'function' == typeof Symbol && Symbol.iterator,
                                            n = t && e[t],
                                            r = 0;
                                        if (n) return n.call(e);
                                        if (e && 'number' == typeof e.length)
                                            return {
                                                next: function () {
                                                    return {
                                                        value: (e = e && r >= e.length ? void 0 : e) && e[r++],
                                                        done: !e,
                                                    };
                                                },
                                            };
                                        throw new TypeError(
                                            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
                                        );
                                    },
                                o =
                                    (this && this.__importDefault) ||
                                    function (e) {
                                        return e && e.__esModule ? e : { default: e };
                                    };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.Socket = void 0);
                            var u,
                                d = e('eventemitter3'),
                                l = o(e('./logger')),
                                p = e('./enums'),
                                i =
                                    ((u = d.EventEmitter),
                                    i(h, u),
                                    (h.prototype.start = function (e, t) {
                                        var n = this;
                                        this._id = e;
                                        t = this._baseUrl + '&id=' + e + '&token=' + t;
                                        !this._socket &&
                                            this._disconnected &&
                                            ((this._socket = new WebSocket(t)),
                                            (this._disconnected = !1),
                                            (this._socket.onmessage = function (t) {
                                                var e;
                                                try {
                                                    (e = JSON.parse(t.data)),
                                                        l.default.log('Server message received:', e);
                                                } catch (e) {
                                                    return void l.default.log('Invalid server message', t.data);
                                                }
                                                n.emit(p.SocketEventType.Message, e);
                                            }),
                                            (this._socket.onclose = function (e) {
                                                n._disconnected ||
                                                    (l.default.log('Socket closed.', e),
                                                    n._cleanup(),
                                                    (n._disconnected = !0),
                                                    n.emit(p.SocketEventType.Disconnected));
                                            }),
                                            (this._socket.onopen = function () {
                                                n._disconnected ||
                                                    (n._sendQueuedMessages(),
                                                    l.default.log('Socket open'),
                                                    n._scheduleHeartbeat());
                                            }));
                                    }),
                                    (h.prototype._scheduleHeartbeat = function () {
                                        var e = this;
                                        this._wsPingTimer = setTimeout(function () {
                                            e._sendHeartbeat();
                                        }, this.pingInterval);
                                    }),
                                    (h.prototype._sendHeartbeat = function () {
                                        var e;
                                        this._wsOpen()
                                            ? ((e = JSON.stringify({ type: p.ServerMessageType.Heartbeat })),
                                              this._socket.send(e),
                                              this._scheduleHeartbeat())
                                            : l.default.log('Cannot send heartbeat, because socket closed');
                                    }),
                                    (h.prototype._wsOpen = function () {
                                        return !!this._socket && 1 === this._socket.readyState;
                                    }),
                                    (h.prototype._sendQueuedMessages = function () {
                                        var t,
                                            e,
                                            n = a([], s(this._messagesQueue));
                                        this._messagesQueue = [];
                                        try {
                                            for (var r = c(n), i = r.next(); !i.done; i = r.next()) {
                                                var o = i.value;
                                                this.send(o);
                                            }
                                        } catch (e) {
                                            t = { error: e };
                                        } finally {
                                            try {
                                                i && !i.done && (e = r.return) && e.call(r);
                                            } finally {
                                                if (t) throw t.error;
                                            }
                                        }
                                    }),
                                    (h.prototype.send = function (e) {
                                        var t;
                                        this._disconnected ||
                                            (this._id
                                                ? e.type
                                                    ? this._wsOpen() && ((t = JSON.stringify(e)), this._socket.send(t))
                                                    : this.emit(p.SocketEventType.Error, 'Invalid message')
                                                : this._messagesQueue.push(e));
                                    }),
                                    (h.prototype.close = function () {
                                        this._disconnected || (this._cleanup(), (this._disconnected = !0));
                                    }),
                                    (h.prototype._cleanup = function () {
                                        this._socket &&
                                            ((this._socket.onopen = this._socket.onmessage = this._socket.onclose = null),
                                            this._socket.close(),
                                            (this._socket = void 0)),
                                            clearTimeout(this._wsPingTimer);
                                    }),
                                    h);
                            function h(e, t, n, r, i, o) {
                                void 0 === o && (o = 5e3);
                                var s = u.call(this) || this;
                                return (
                                    (s.pingInterval = o),
                                    (s._disconnected = !0),
                                    (s._messagesQueue = []),
                                    (s._baseUrl = (e ? 'wss://' : 'ws://') + t + ':' + n + r + 'peerjs?key=' + i),
                                    s
                                );
                            }
                            n.Socket = i;
                        },
                        { eventemitter3: 'JJlS', './logger': 'WOs9', './enums': 'ZRYf' },
                    ],
                    HCdX: [
                        function (e, t, n) {
                            var a =
                                    (this && this.__assign) ||
                                    function () {
                                        return (a =
                                            Object.assign ||
                                            function (e) {
                                                for (var t, n = 1, r = arguments.length; n < r; n++)
                                                    for (var i in (t = arguments[n]))
                                                        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                                                return e;
                                            }).apply(this, arguments);
                                    },
                                r =
                                    (this && this.__awaiter) ||
                                    function (e, s, a, c) {
                                        return new (a = a || Promise)(function (n, t) {
                                            function r(e) {
                                                try {
                                                    o(c.next(e));
                                                } catch (e) {
                                                    t(e);
                                                }
                                            }
                                            function i(e) {
                                                try {
                                                    o(c.throw(e));
                                                } catch (e) {
                                                    t(e);
                                                }
                                            }
                                            function o(e) {
                                                var t;
                                                e.done
                                                    ? n(e.value)
                                                    : ((t = e.value) instanceof a
                                                          ? t
                                                          : new a(function (e) {
                                                                e(t);
                                                            })
                                                      ).then(r, i);
                                            }
                                            o((c = c.apply(e, s || [])).next());
                                        });
                                    },
                                c =
                                    (this && this.__generator) ||
                                    function (n, r) {
                                        var i,
                                            o,
                                            s,
                                            a = {
                                                label: 0,
                                                sent: function () {
                                                    if (1 & s[0]) throw s[1];
                                                    return s[1];
                                                },
                                                trys: [],
                                                ops: [],
                                            },
                                            e = { next: t(0), throw: t(1), return: t(2) };
                                        return (
                                            'function' == typeof Symbol &&
                                                (e[Symbol.iterator] = function () {
                                                    return this;
                                                }),
                                            e
                                        );
                                        function t(t) {
                                            return function (e) {
                                                return (function (t) {
                                                    if (i) throw new TypeError('Generator is already executing.');
                                                    for (; a; )
                                                        try {
                                                            if (
                                                                ((i = 1),
                                                                o &&
                                                                    (s =
                                                                        2 & t[0]
                                                                            ? o.return
                                                                            : t[0]
                                                                            ? o.throw ||
                                                                              ((s = o.return) && s.call(o), 0)
                                                                            : o.next) &&
                                                                    !(s = s.call(o, t[1])).done)
                                                            )
                                                                return s;
                                                            switch (((o = 0), (t = s ? [2 & t[0], s.value] : t)[0])) {
                                                                case 0:
                                                                case 1:
                                                                    s = t;
                                                                    break;
                                                                case 4:
                                                                    return a.label++, { value: t[1], done: !1 };
                                                                case 5:
                                                                    a.label++, (o = t[1]), (t = [0]);
                                                                    continue;
                                                                case 7:
                                                                    (t = a.ops.pop()), a.trys.pop();
                                                                    continue;
                                                                default:
                                                                    if (
                                                                        !(s =
                                                                            0 < (s = a.trys).length &&
                                                                            s[s.length - 1]) &&
                                                                        (6 === t[0] || 2 === t[0])
                                                                    ) {
                                                                        a = 0;
                                                                        continue;
                                                                    }
                                                                    if (
                                                                        3 === t[0] &&
                                                                        (!s || (t[1] > s[0] && t[1] < s[3]))
                                                                    ) {
                                                                        a.label = t[1];
                                                                        break;
                                                                    }
                                                                    if (6 === t[0] && a.label < s[1]) {
                                                                        (a.label = s[1]), (s = t);
                                                                        break;
                                                                    }
                                                                    if (s && a.label < s[2]) {
                                                                        (a.label = s[2]), a.ops.push(t);
                                                                        break;
                                                                    }
                                                                    s[2] && a.ops.pop(), a.trys.pop();
                                                                    continue;
                                                            }
                                                            t = r.call(n, a);
                                                        } catch (e) {
                                                            (t = [6, e]), (o = 0);
                                                        } finally {
                                                            i = s = 0;
                                                        }
                                                    if (5 & t[0]) throw t[1];
                                                    return { value: t[0] ? t[1] : void 0, done: !0 };
                                                })([t, e]);
                                            };
                                        }
                                    },
                                i =
                                    (this && this.__importDefault) ||
                                    function (e) {
                                        return e && e.__esModule ? e : { default: e };
                                    };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.Negotiator = void 0);
                            var u = e('./util'),
                                d = i(e('./logger')),
                                l = e('./enums'),
                                e =
                                    ((o.prototype.startConnection = function (e) {
                                        var t,
                                            n,
                                            r = this._startPeerConnection();
                                        (this.connection.peerConnection = r),
                                            this.connection.type === l.ConnectionType.Media &&
                                                e._stream &&
                                                this._addTracksToConnection(e._stream, r),
                                            e.originator
                                                ? (this.connection.type === l.ConnectionType.Data &&
                                                      ((t = this.connection),
                                                      (n = { ordered: !!e.reliable }),
                                                      (n = r.createDataChannel(t.label, n)),
                                                      t.initialize(n)),
                                                  this._makeOffer())
                                                : this.handleSDP('OFFER', e.sdp);
                                    }),
                                    (o.prototype._startPeerConnection = function () {
                                        d.default.log('Creating RTCPeerConnection.');
                                        var e = new RTCPeerConnection(this.connection.provider.options.config);
                                        return this._setupListeners(e), e;
                                    }),
                                    (o.prototype._setupListeners = function (e) {
                                        var n = this,
                                            r = this.connection.peer,
                                            i = this.connection.connectionId,
                                            t = this.connection.type,
                                            o = this.connection.provider;
                                        d.default.log('Listening for ICE candidates.'),
                                            (e.onicecandidate = function (e) {
                                                e.candidate &&
                                                    e.candidate.candidate &&
                                                    (d.default.log(
                                                        'Received ICE candidates for ' + r + ':',
                                                        e.candidate
                                                    ),
                                                    o.socket.send({
                                                        type: l.ServerMessageType.Candidate,
                                                        payload: { candidate: e.candidate, type: t, connectionId: i },
                                                        dst: r,
                                                    }));
                                            }),
                                            (e.oniceconnectionstatechange = function () {
                                                switch (e.iceConnectionState) {
                                                    case 'failed':
                                                        d.default.log(
                                                            'iceConnectionState is failed, closing connections to ' + r
                                                        ),
                                                            n.connection.emit(
                                                                l.ConnectionEventType.Error,
                                                                new Error(
                                                                    'Negotiation of connection to ' + r + ' failed.'
                                                                )
                                                            ),
                                                            n.connection.close();
                                                        break;
                                                    case 'closed':
                                                        d.default.log(
                                                            'iceConnectionState is closed, closing connections to ' + r
                                                        ),
                                                            n.connection.emit(
                                                                l.ConnectionEventType.Error,
                                                                new Error('Connection to ' + r + ' closed.')
                                                            ),
                                                            n.connection.close();
                                                        break;
                                                    case 'disconnected':
                                                        d.default.log(
                                                            'iceConnectionState changed to disconnected on the connection with ' +
                                                                r
                                                        );
                                                        break;
                                                    case 'completed':
                                                        e.onicecandidate = u.util.noop;
                                                }
                                                n.connection.emit(
                                                    l.ConnectionEventType.IceStateChanged,
                                                    e.iceConnectionState
                                                );
                                            }),
                                            d.default.log('Listening for data channel'),
                                            (e.ondatachannel = function (e) {
                                                d.default.log('Received data channel');
                                                e = e.channel;
                                                o.getConnection(r, i).initialize(e);
                                            }),
                                            d.default.log('Listening for remote stream'),
                                            (e.ontrack = function (e) {
                                                d.default.log('Received remote stream');
                                                var t = e.streams[0],
                                                    e = o.getConnection(r, i);
                                                e.type === l.ConnectionType.Media &&
                                                    n._addStreamToMediaConnection(t, e);
                                            });
                                    }),
                                    (o.prototype.cleanup = function () {
                                        d.default.log('Cleaning up PeerConnection to ' + this.connection.peer);
                                        var e,
                                            t,
                                            n,
                                            r = this.connection.peerConnection;
                                        r &&
                                            ((this.connection.peerConnection = null),
                                            (r.onicecandidate = r.oniceconnectionstatechange = r.ondatachannel = r.ontrack = function () {}),
                                            (e = 'closed' !== r.signalingState),
                                            (t = !1),
                                            this.connection.type !== l.ConnectionType.Data ||
                                                ((n = this.connection.dataChannel) &&
                                                    (t = !!n.readyState && 'closed' !== n.readyState)),
                                            (e || t) && r.close());
                                    }),
                                    (o.prototype._makeOffer = function () {
                                        return r(this, void 0, Promise, function () {
                                            var t, n, r, i, o, s;
                                            return c(this, function (e) {
                                                switch (e.label) {
                                                    case 0:
                                                        (t = this.connection.peerConnection),
                                                            (n = this.connection.provider),
                                                            (e.label = 1);
                                                    case 1:
                                                        return (
                                                            e.trys.push([1, 7, , 8]),
                                                            [4, t.createOffer(this.connection.options.constraints)]
                                                        );
                                                    case 2:
                                                        (r = e.sent()),
                                                            d.default.log('Created offer.'),
                                                            this.connection.options.sdpTransform &&
                                                                'function' ==
                                                                    typeof this.connection.options.sdpTransform &&
                                                                (r.sdp =
                                                                    this.connection.options.sdpTransform(r.sdp) ||
                                                                    r.sdp),
                                                            (e.label = 3);
                                                    case 3:
                                                        return e.trys.push([3, 5, , 6]), [4, t.setLocalDescription(r)];
                                                    case 4:
                                                        return (
                                                            e.sent(),
                                                            d.default.log(
                                                                'Set localDescription:',
                                                                r,
                                                                'for:' + this.connection.peer
                                                            ),
                                                            (i = {
                                                                sdp: r,
                                                                type: this.connection.type,
                                                                connectionId: this.connection.connectionId,
                                                                metadata: this.connection.metadata,
                                                                browser: u.util.browser,
                                                            }),
                                                            this.connection.type === l.ConnectionType.Data &&
                                                                ((o = this.connection),
                                                                (i = a(a({}, i), {
                                                                    label: o.label,
                                                                    reliable: o.reliable,
                                                                    serialization: o.serialization,
                                                                }))),
                                                            n.socket.send({
                                                                type: l.ServerMessageType.Offer,
                                                                payload: i,
                                                                dst: this.connection.peer,
                                                            }),
                                                            [3, 6]
                                                        );
                                                    case 5:
                                                        return (
                                                            'OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer' !=
                                                                (s = e.sent()) &&
                                                                (n.emitError(l.PeerErrorType.WebRTC, s),
                                                                d.default.log('Failed to setLocalDescription, ', s)),
                                                            [3, 6]
                                                        );
                                                    case 6:
                                                        return [3, 8];
                                                    case 7:
                                                        return (
                                                            (s = e.sent()),
                                                            n.emitError(l.PeerErrorType.WebRTC, s),
                                                            d.default.log('Failed to createOffer, ', s),
                                                            [3, 8]
                                                        );
                                                    case 8:
                                                        return [2];
                                                }
                                            });
                                        });
                                    }),
                                    (o.prototype._makeAnswer = function () {
                                        return r(this, void 0, Promise, function () {
                                            var t, n, r, i;
                                            return c(this, function (e) {
                                                switch (e.label) {
                                                    case 0:
                                                        (t = this.connection.peerConnection),
                                                            (n = this.connection.provider),
                                                            (e.label = 1);
                                                    case 1:
                                                        return e.trys.push([1, 7, , 8]), [4, t.createAnswer()];
                                                    case 2:
                                                        (r = e.sent()),
                                                            d.default.log('Created answer.'),
                                                            this.connection.options.sdpTransform &&
                                                                'function' ==
                                                                    typeof this.connection.options.sdpTransform &&
                                                                (r.sdp =
                                                                    this.connection.options.sdpTransform(r.sdp) ||
                                                                    r.sdp),
                                                            (e.label = 3);
                                                    case 3:
                                                        return e.trys.push([3, 5, , 6]), [4, t.setLocalDescription(r)];
                                                    case 4:
                                                        return (
                                                            e.sent(),
                                                            d.default.log(
                                                                'Set localDescription:',
                                                                r,
                                                                'for:' + this.connection.peer
                                                            ),
                                                            n.socket.send({
                                                                type: l.ServerMessageType.Answer,
                                                                payload: {
                                                                    sdp: r,
                                                                    type: this.connection.type,
                                                                    connectionId: this.connection.connectionId,
                                                                    browser: u.util.browser,
                                                                },
                                                                dst: this.connection.peer,
                                                            }),
                                                            [3, 6]
                                                        );
                                                    case 5:
                                                        return (
                                                            (i = e.sent()),
                                                            n.emitError(l.PeerErrorType.WebRTC, i),
                                                            d.default.log('Failed to setLocalDescription, ', i),
                                                            [3, 6]
                                                        );
                                                    case 6:
                                                        return [3, 8];
                                                    case 7:
                                                        return (
                                                            (i = e.sent()),
                                                            n.emitError(l.PeerErrorType.WebRTC, i),
                                                            d.default.log('Failed to create answer, ', i),
                                                            [3, 8]
                                                        );
                                                    case 8:
                                                        return [2];
                                                }
                                            });
                                        });
                                    }),
                                    (o.prototype.handleSDP = function (o, s) {
                                        return r(this, void 0, Promise, function () {
                                            var t, n, r, i;
                                            return c(this, function (e) {
                                                switch (e.label) {
                                                    case 0:
                                                        (s = new RTCSessionDescription(s)),
                                                            (t = this.connection.peerConnection),
                                                            (n = this.connection.provider),
                                                            d.default.log('Setting remote description', s),
                                                            (r = this),
                                                            (e.label = 1);
                                                    case 1:
                                                        return e.trys.push([1, 5, , 6]), [4, t.setRemoteDescription(s)];
                                                    case 2:
                                                        return (
                                                            e.sent(),
                                                            d.default.log(
                                                                'Set remoteDescription:' +
                                                                    o +
                                                                    ' for:' +
                                                                    this.connection.peer
                                                            ),
                                                            'OFFER' !== o ? [3, 4] : [4, r._makeAnswer()]
                                                        );
                                                    case 3:
                                                        e.sent(), (e.label = 4);
                                                    case 4:
                                                        return [3, 6];
                                                    case 5:
                                                        return (
                                                            (i = e.sent()),
                                                            n.emitError(l.PeerErrorType.WebRTC, i),
                                                            d.default.log('Failed to setRemoteDescription, ', i),
                                                            [3, 6]
                                                        );
                                                    case 6:
                                                        return [2];
                                                }
                                            });
                                        });
                                    }),
                                    (o.prototype.handleCandidate = function (a) {
                                        return r(this, void 0, Promise, function () {
                                            var t, n, r, i, o, s;
                                            return c(this, function (e) {
                                                switch (e.label) {
                                                    case 0:
                                                        d.default.log('handleCandidate:', a),
                                                            (t = a.candidate),
                                                            (n = a.sdpMLineIndex),
                                                            (r = a.sdpMid),
                                                            (i = this.connection.peerConnection),
                                                            (o = this.connection.provider),
                                                            (e.label = 1);
                                                    case 1:
                                                        return (
                                                            e.trys.push([1, 3, , 4]),
                                                            [
                                                                4,
                                                                i.addIceCandidate(
                                                                    new RTCIceCandidate({
                                                                        sdpMid: r,
                                                                        sdpMLineIndex: n,
                                                                        candidate: t,
                                                                    })
                                                                ),
                                                            ]
                                                        );
                                                    case 2:
                                                        return (
                                                            e.sent(),
                                                            d.default.log(
                                                                'Added ICE candidate for:' + this.connection.peer
                                                            ),
                                                            [3, 4]
                                                        );
                                                    case 3:
                                                        return (
                                                            (s = e.sent()),
                                                            o.emitError(l.PeerErrorType.WebRTC, s),
                                                            d.default.log('Failed to handleCandidate, ', s),
                                                            [3, 4]
                                                        );
                                                    case 4:
                                                        return [2];
                                                }
                                            });
                                        });
                                    }),
                                    (o.prototype._addTracksToConnection = function (t, n) {
                                        if (
                                            (d.default.log('add tracks from stream ' + t.id + ' to peer connection'),
                                            !n.addTrack)
                                        )
                                            return d.default.error(
                                                "Your browser does't support RTCPeerConnection#addTrack. Ignored."
                                            );
                                        t.getTracks().forEach(function (e) {
                                            n.addTrack(e, t);
                                        });
                                    }),
                                    (o.prototype._addStreamToMediaConnection = function (e, t) {
                                        d.default.log('add stream ' + e.id + ' to media connection ' + t.connectionId),
                                            t.addStream(e);
                                    }),
                                    o);
                            function o(e) {
                                this.connection = e;
                            }
                            n.Negotiator = e;
                        },
                        { './util': 'BHXf', './logger': 'WOs9', './enums': 'ZRYf' },
                    ],
                    tQFK: [
                        function (e, t, n) {
                            var r,
                                i =
                                    (this && this.__extends) ||
                                    ((r = function (e, t) {
                                        return (r =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (e, t) {
                                                    e.__proto__ = t;
                                                }) ||
                                            function (e, t) {
                                                for (var n in t)
                                                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                                            })(e, t);
                                    }),
                                    function (e, t) {
                                        if ('function' != typeof t && null !== t)
                                            throw new TypeError(
                                                'Class extends value ' + String(t) + ' is not a constructor or null'
                                            );
                                        function n() {
                                            this.constructor = e;
                                        }
                                        r(e, t),
                                            (e.prototype =
                                                null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
                                    });
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.BaseConnection = void 0);
                            var o,
                                e = e('eventemitter3'),
                                i =
                                    ((o = e.EventEmitter),
                                    i(s, o),
                                    Object.defineProperty(s.prototype, 'open', {
                                        get: function () {
                                            return this._open;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    s);
                            function s(e, t, n) {
                                var r = o.call(this) || this;
                                return (
                                    (r.peer = e),
                                    (r.provider = t),
                                    (r.options = n),
                                    (r._open = !1),
                                    (r.metadata = n.metadata),
                                    r
                                );
                            }
                            n.BaseConnection = i;
                        },
                        { eventemitter3: 'JJlS' },
                    ],
                    dbHP: [
                        function (e, t, n) {
                            var r,
                                i =
                                    (this && this.__extends) ||
                                    ((r = function (e, t) {
                                        return (r =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (e, t) {
                                                    e.__proto__ = t;
                                                }) ||
                                            function (e, t) {
                                                for (var n in t)
                                                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                                            })(e, t);
                                    }),
                                    function (e, t) {
                                        if ('function' != typeof t && null !== t)
                                            throw new TypeError(
                                                'Class extends value ' + String(t) + ' is not a constructor or null'
                                            );
                                        function n() {
                                            this.constructor = e;
                                        }
                                        r(e, t),
                                            (e.prototype =
                                                null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
                                    }),
                                a =
                                    (this && this.__assign) ||
                                    function () {
                                        return (a =
                                            Object.assign ||
                                            function (e) {
                                                for (var t, n = 1, r = arguments.length; n < r; n++)
                                                    for (var i in (t = arguments[n]))
                                                        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                                                return e;
                                            }).apply(this, arguments);
                                    },
                                c =
                                    (this && this.__values) ||
                                    function (e) {
                                        var t = 'function' == typeof Symbol && Symbol.iterator,
                                            n = t && e[t],
                                            r = 0;
                                        if (n) return n.call(e);
                                        if (e && 'number' == typeof e.length)
                                            return {
                                                next: function () {
                                                    return {
                                                        value: (e = e && r >= e.length ? void 0 : e) && e[r++],
                                                        done: !e,
                                                    };
                                                },
                                            };
                                        throw new TypeError(
                                            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
                                        );
                                    },
                                o =
                                    (this && this.__importDefault) ||
                                    function (e) {
                                        return e && e.__esModule ? e : { default: e };
                                    };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.MediaConnection = void 0);
                            var s,
                                u = e('./util'),
                                d = o(e('./logger')),
                                l = e('./negotiator'),
                                p = e('./enums'),
                                e = e('./baseconnection'),
                                i =
                                    ((s = e.BaseConnection),
                                    i(h, s),
                                    Object.defineProperty(h.prototype, 'type', {
                                        get: function () {
                                            return p.ConnectionType.Media;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(h.prototype, 'localStream', {
                                        get: function () {
                                            return this._localStream;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(h.prototype, 'remoteStream', {
                                        get: function () {
                                            return this._remoteStream;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    (h.prototype.addStream = function (e) {
                                        d.default.log('Receiving stream', e),
                                            (this._remoteStream = e),
                                            s.prototype.emit.call(this, p.ConnectionEventType.Stream, e);
                                    }),
                                    (h.prototype.handleMessage = function (e) {
                                        var t = e.type,
                                            n = e.payload;
                                        switch (e.type) {
                                            case p.ServerMessageType.Answer:
                                                this._negotiator.handleSDP(t, n.sdp), (this._open = !0);
                                                break;
                                            case p.ServerMessageType.Candidate:
                                                this._negotiator.handleCandidate(n.candidate);
                                                break;
                                            default:
                                                d.default.warn(
                                                    'Unrecognized message type:' + t + ' from peer:' + this.peer
                                                );
                                        }
                                    }),
                                    (h.prototype.answer = function (e, t) {
                                        var n, r;
                                        if ((void 0 === t && (t = {}), this._localStream))
                                            d.default.warn(
                                                'Local stream already exists on this MediaConnection. Are you answering a call twice?'
                                            );
                                        else {
                                            (this._localStream = e),
                                                t && t.sdpTransform && (this.options.sdpTransform = t.sdpTransform),
                                                this._negotiator.startConnection(
                                                    a(a({}, this.options._payload), { _stream: e })
                                                );
                                            e = this.provider._getMessages(this.connectionId);
                                            try {
                                                for (var i = c(e), o = i.next(); !o.done; o = i.next()) {
                                                    var s = o.value;
                                                    this.handleMessage(s);
                                                }
                                            } catch (e) {
                                                n = { error: e };
                                            } finally {
                                                try {
                                                    o && !o.done && (r = i.return) && r.call(i);
                                                } finally {
                                                    if (n) throw n.error;
                                                }
                                            }
                                            this._open = !0;
                                        }
                                    }),
                                    (h.prototype.close = function () {
                                        this._negotiator && (this._negotiator.cleanup(), (this._negotiator = null)),
                                            (this._localStream = null),
                                            (this._remoteStream = null),
                                            this.provider &&
                                                (this.provider._removeConnection(this), (this.provider = null)),
                                            this.options && this.options._stream && (this.options._stream = null),
                                            this.open &&
                                                ((this._open = !1),
                                                s.prototype.emit.call(this, p.ConnectionEventType.Close));
                                    }),
                                    (h.ID_PREFIX = 'mc_'),
                                    h);
                            function h(e, t, n) {
                                n = s.call(this, e, t, n) || this;
                                return (
                                    (n._localStream = n.options._stream),
                                    (n.connectionId = n.options.connectionId || h.ID_PREFIX + u.util.randomToken()),
                                    (n._negotiator = new l.Negotiator(n)),
                                    n._localStream &&
                                        n._negotiator.startConnection({ _stream: n._localStream, originator: !0 }),
                                    n
                                );
                            }
                            n.MediaConnection = i;
                        },
                        {
                            './util': 'BHXf',
                            './logger': 'WOs9',
                            './negotiator': 'HCdX',
                            './enums': 'ZRYf',
                            './baseconnection': 'tQFK',
                        },
                    ],
                    GGp6: [
                        function (e, t, n) {
                            var r,
                                i =
                                    (this && this.__extends) ||
                                    ((r = function (e, t) {
                                        return (r =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (e, t) {
                                                    e.__proto__ = t;
                                                }) ||
                                            function (e, t) {
                                                for (var n in t)
                                                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                                            })(e, t);
                                    }),
                                    function (e, t) {
                                        if ('function' != typeof t && null !== t)
                                            throw new TypeError(
                                                'Class extends value ' + String(t) + ' is not a constructor or null'
                                            );
                                        function n() {
                                            this.constructor = e;
                                        }
                                        r(e, t),
                                            (e.prototype =
                                                null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
                                    }),
                                o =
                                    (this && this.__importDefault) ||
                                    function (e) {
                                        return e && e.__esModule ? e : { default: e };
                                    };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.EncodingQueue = void 0);
                            var s,
                                a = e('eventemitter3'),
                                c = o(e('./logger')),
                                i =
                                    ((s = a.EventEmitter),
                                    i(u, s),
                                    Object.defineProperty(u.prototype, 'queue', {
                                        get: function () {
                                            return this._queue;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(u.prototype, 'size', {
                                        get: function () {
                                            return this.queue.length;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(u.prototype, 'processing', {
                                        get: function () {
                                            return this._processing;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    (u.prototype.enque = function (e) {
                                        this.queue.push(e), this.processing || this.doNextTask();
                                    }),
                                    (u.prototype.destroy = function () {
                                        this.fileReader.abort(), (this._queue = []);
                                    }),
                                    (u.prototype.doNextTask = function () {
                                        0 !== this.size &&
                                            (this.processing ||
                                                ((this._processing = !0),
                                                this.fileReader.readAsArrayBuffer(this.queue.shift())));
                                    }),
                                    u);
                            function u() {
                                var t = s.call(this) || this;
                                return (
                                    (t.fileReader = new FileReader()),
                                    (t._queue = []),
                                    (t._processing = !1),
                                    (t.fileReader.onload = function (e) {
                                        (t._processing = !1),
                                            e.target && t.emit('done', e.target.result),
                                            t.doNextTask();
                                    }),
                                    (t.fileReader.onerror = function (e) {
                                        c.default.error('EncodingQueue error:', e),
                                            (t._processing = !1),
                                            t.destroy(),
                                            t.emit('error', e);
                                    }),
                                    t
                                );
                            }
                            n.EncodingQueue = i;
                        },
                        { eventemitter3: 'JJlS', './logger': 'WOs9' },
                    ],
                    GBTQ: [
                        function (e, t, n) {
                            var r,
                                i =
                                    (this && this.__extends) ||
                                    ((r = function (e, t) {
                                        return (r =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (e, t) {
                                                    e.__proto__ = t;
                                                }) ||
                                            function (e, t) {
                                                for (var n in t)
                                                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                                            })(e, t);
                                    }),
                                    function (e, t) {
                                        if ('function' != typeof t && null !== t)
                                            throw new TypeError(
                                                'Class extends value ' + String(t) + ' is not a constructor or null'
                                            );
                                        function n() {
                                            this.constructor = e;
                                        }
                                        r(e, t),
                                            (e.prototype =
                                                null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
                                    }),
                                s =
                                    (this && this.__values) ||
                                    function (e) {
                                        var t = 'function' == typeof Symbol && Symbol.iterator,
                                            n = t && e[t],
                                            r = 0;
                                        if (n) return n.call(e);
                                        if (e && 'number' == typeof e.length)
                                            return {
                                                next: function () {
                                                    return {
                                                        value: (e = e && r >= e.length ? void 0 : e) && e[r++],
                                                        done: !e,
                                                    };
                                                },
                                            };
                                        throw new TypeError(
                                            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
                                        );
                                    },
                                o =
                                    (this && this.__importDefault) ||
                                    function (e) {
                                        return e && e.__esModule ? e : { default: e };
                                    };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.DataConnection = void 0);
                            var a,
                                c = e('./util'),
                                u = o(e('./logger')),
                                d = e('./negotiator'),
                                l = e('./enums'),
                                o = e('./baseconnection'),
                                p = e('./encodingQueue'),
                                i =
                                    ((a = o.BaseConnection),
                                    i(h, a),
                                    Object.defineProperty(h.prototype, 'type', {
                                        get: function () {
                                            return l.ConnectionType.Data;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(h.prototype, 'dataChannel', {
                                        get: function () {
                                            return this._dc;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(h.prototype, 'bufferSize', {
                                        get: function () {
                                            return this._bufferSize;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    (h.prototype.initialize = function (e) {
                                        (this._dc = e), this._configureDataChannel();
                                    }),
                                    (h.prototype._configureDataChannel = function () {
                                        var t = this;
                                        (c.util.supports.binaryBlob && !c.util.supports.reliable) ||
                                            (this.dataChannel.binaryType = 'arraybuffer'),
                                            (this.dataChannel.onopen = function () {
                                                u.default.log('DC#' + t.connectionId + ' dc connection success'),
                                                    (t._open = !0),
                                                    t.emit(l.ConnectionEventType.Open);
                                            }),
                                            (this.dataChannel.onmessage = function (e) {
                                                u.default.log('DC#' + t.connectionId + ' dc onmessage:', e.data),
                                                    t._handleDataMessage(e);
                                            }),
                                            (this.dataChannel.onclose = function () {
                                                u.default.log('DC#' + t.connectionId + ' dc closed for:', t.peer),
                                                    t.close();
                                            });
                                    }),
                                    (h.prototype._handleDataMessage = function (e) {
                                        var t = this,
                                            n = e.data,
                                            r = n.constructor,
                                            e = n;
                                        if (
                                            this.serialization === l.SerializationType.Binary ||
                                            this.serialization === l.SerializationType.BinaryUTF8
                                        ) {
                                            if (r === Blob)
                                                return void c.util.blobToArrayBuffer(n, function (e) {
                                                    e = c.util.unpack(e);
                                                    t.emit(l.ConnectionEventType.Data, e);
                                                });
                                            r === ArrayBuffer
                                                ? (e = c.util.unpack(n))
                                                : r === String &&
                                                  ((r = c.util.binaryStringToArrayBuffer(n)), (e = c.util.unpack(r)));
                                        } else this.serialization === l.SerializationType.JSON && (e = this.parse(n));
                                        e.__peerData
                                            ? this._handleChunk(e)
                                            : a.prototype.emit.call(this, l.ConnectionEventType.Data, e);
                                    }),
                                    (h.prototype._handleChunk = function (e) {
                                        var t = e.__peerData,
                                            n = this._chunkedData[t] || { data: [], count: 0, total: e.total };
                                        (n.data[e.n] = e.data),
                                            n.count++,
                                            (this._chunkedData[t] = n).total === n.count &&
                                                (delete this._chunkedData[t],
                                                (n = new Blob(n.data)),
                                                this._handleDataMessage({ data: n }));
                                    }),
                                    (h.prototype.close = function () {
                                        (this._buffer = []),
                                            (this._bufferSize = 0),
                                            (this._chunkedData = {}),
                                            this._negotiator && (this._negotiator.cleanup(), (this._negotiator = null)),
                                            this.provider &&
                                                (this.provider._removeConnection(this), (this.provider = null)),
                                            this.dataChannel &&
                                                ((this.dataChannel.onopen = null),
                                                (this.dataChannel.onmessage = null),
                                                (this.dataChannel.onclose = null),
                                                (this._dc = null)),
                                            this._encodingQueue &&
                                                (this._encodingQueue.destroy(),
                                                this._encodingQueue.removeAllListeners(),
                                                (this._encodingQueue = null)),
                                            this.open &&
                                                ((this._open = !1),
                                                a.prototype.emit.call(this, l.ConnectionEventType.Close));
                                    }),
                                    (h.prototype.send = function (e, t) {
                                        var n;
                                        this.open
                                            ? this.serialization === l.SerializationType.JSON
                                                ? this._bufferedSend(this.stringify(e))
                                                : this.serialization === l.SerializationType.Binary ||
                                                  this.serialization === l.SerializationType.BinaryUTF8
                                                ? ((n = c.util.pack(e)),
                                                  !t && n.size > c.util.chunkedMTU
                                                      ? this._sendChunks(n)
                                                      : c.util.supports.binaryBlob
                                                      ? this._bufferedSend(n)
                                                      : this._encodingQueue.enque(n))
                                                : this._bufferedSend(e)
                                            : a.prototype.emit.call(
                                                  this,
                                                  l.ConnectionEventType.Error,
                                                  new Error(
                                                      'Connection is not open. You should listen for the `open` event before sending messages.'
                                                  )
                                              );
                                    }),
                                    (h.prototype._bufferedSend = function (e) {
                                        (!this._buffering && this._trySend(e)) ||
                                            (this._buffer.push(e), (this._bufferSize = this._buffer.length));
                                    }),
                                    (h.prototype._trySend = function (e) {
                                        var t = this;
                                        if (!this.open) return !1;
                                        if (this.dataChannel.bufferedAmount > h.MAX_BUFFERED_AMOUNT)
                                            return (
                                                (this._buffering = !0),
                                                setTimeout(function () {
                                                    (t._buffering = !1), t._tryBuffer();
                                                }, 50),
                                                !1
                                            );
                                        try {
                                            this.dataChannel.send(e);
                                        } catch (e) {
                                            return (
                                                u.default.error('DC#:' + this.connectionId + ' Error when sending:', e),
                                                (this._buffering = !0),
                                                this.close(),
                                                !1
                                            );
                                        }
                                        return !0;
                                    }),
                                    (h.prototype._tryBuffer = function () {
                                        var e;
                                        this.open &&
                                            0 !== this._buffer.length &&
                                            ((e = this._buffer[0]),
                                            this._trySend(e) &&
                                                (this._buffer.shift(),
                                                (this._bufferSize = this._buffer.length),
                                                this._tryBuffer()));
                                    }),
                                    (h.prototype._sendChunks = function (e) {
                                        var t,
                                            n,
                                            e = c.util.chunk(e);
                                        u.default.log(
                                            'DC#' + this.connectionId + ' Try to send ' + e.length + ' chunks...'
                                        );
                                        try {
                                            for (var r = s(e), i = r.next(); !i.done; i = r.next()) {
                                                var o = i.value;
                                                this.send(o, !0);
                                            }
                                        } catch (e) {
                                            t = { error: e };
                                        } finally {
                                            try {
                                                i && !i.done && (n = r.return) && n.call(r);
                                            } finally {
                                                if (t) throw t.error;
                                            }
                                        }
                                    }),
                                    (h.prototype.handleMessage = function (e) {
                                        var t = e.payload;
                                        switch (e.type) {
                                            case l.ServerMessageType.Answer:
                                                this._negotiator.handleSDP(e.type, t.sdp);
                                                break;
                                            case l.ServerMessageType.Candidate:
                                                this._negotiator.handleCandidate(t.candidate);
                                                break;
                                            default:
                                                u.default.warn(
                                                    'Unrecognized message type:',
                                                    e.type,
                                                    'from peer:',
                                                    this.peer
                                                );
                                        }
                                    }),
                                    (h.ID_PREFIX = 'dc_'),
                                    (h.MAX_BUFFERED_AMOUNT = 8388608),
                                    h);
                            function h(e, t, n) {
                                var r = a.call(this, e, t, n) || this;
                                return (
                                    (r.stringify = JSON.stringify),
                                    (r.parse = JSON.parse),
                                    (r._buffer = []),
                                    (r._bufferSize = 0),
                                    (r._buffering = !1),
                                    (r._chunkedData = {}),
                                    (r._encodingQueue = new p.EncodingQueue()),
                                    (r.connectionId = r.options.connectionId || h.ID_PREFIX + c.util.randomToken()),
                                    (r.label = r.options.label || r.connectionId),
                                    (r.serialization = r.options.serialization || l.SerializationType.Binary),
                                    (r.reliable = !!r.options.reliable),
                                    r._encodingQueue.on('done', function (e) {
                                        r._bufferedSend(e);
                                    }),
                                    r._encodingQueue.on('error', function () {
                                        u.default.error(
                                            'DC#' +
                                                r.connectionId +
                                                ': Error occured in encoding from blob to arraybuffer, close DC'
                                        ),
                                            r.close();
                                    }),
                                    (r._negotiator = new d.Negotiator(r)),
                                    r._negotiator.startConnection(r.options._payload || { originator: !0 }),
                                    r
                                );
                            }
                            n.DataConnection = i;
                        },
                        {
                            './util': 'BHXf',
                            './logger': 'WOs9',
                            './negotiator': 'HCdX',
                            './enums': 'ZRYf',
                            './baseconnection': 'tQFK',
                            './encodingQueue': 'GGp6',
                        },
                    ],
                    in7L: [
                        function (e, t, n) {
                            var r =
                                    (this && this.__awaiter) ||
                                    function (e, s, a, c) {
                                        return new (a = a || Promise)(function (n, t) {
                                            function r(e) {
                                                try {
                                                    o(c.next(e));
                                                } catch (e) {
                                                    t(e);
                                                }
                                            }
                                            function i(e) {
                                                try {
                                                    o(c.throw(e));
                                                } catch (e) {
                                                    t(e);
                                                }
                                            }
                                            function o(e) {
                                                var t;
                                                e.done
                                                    ? n(e.value)
                                                    : ((t = e.value) instanceof a
                                                          ? t
                                                          : new a(function (e) {
                                                                e(t);
                                                            })
                                                      ).then(r, i);
                                            }
                                            o((c = c.apply(e, s || [])).next());
                                        });
                                    },
                                i =
                                    (this && this.__generator) ||
                                    function (n, r) {
                                        var i,
                                            o,
                                            s,
                                            a = {
                                                label: 0,
                                                sent: function () {
                                                    if (1 & s[0]) throw s[1];
                                                    return s[1];
                                                },
                                                trys: [],
                                                ops: [],
                                            },
                                            e = { next: t(0), throw: t(1), return: t(2) };
                                        return (
                                            'function' == typeof Symbol &&
                                                (e[Symbol.iterator] = function () {
                                                    return this;
                                                }),
                                            e
                                        );
                                        function t(t) {
                                            return function (e) {
                                                return (function (t) {
                                                    if (i) throw new TypeError('Generator is already executing.');
                                                    for (; a; )
                                                        try {
                                                            if (
                                                                ((i = 1),
                                                                o &&
                                                                    (s =
                                                                        2 & t[0]
                                                                            ? o.return
                                                                            : t[0]
                                                                            ? o.throw ||
                                                                              ((s = o.return) && s.call(o), 0)
                                                                            : o.next) &&
                                                                    !(s = s.call(o, t[1])).done)
                                                            )
                                                                return s;
                                                            switch (((o = 0), (t = s ? [2 & t[0], s.value] : t)[0])) {
                                                                case 0:
                                                                case 1:
                                                                    s = t;
                                                                    break;
                                                                case 4:
                                                                    return a.label++, { value: t[1], done: !1 };
                                                                case 5:
                                                                    a.label++, (o = t[1]), (t = [0]);
                                                                    continue;
                                                                case 7:
                                                                    (t = a.ops.pop()), a.trys.pop();
                                                                    continue;
                                                                default:
                                                                    if (
                                                                        !(s =
                                                                            0 < (s = a.trys).length &&
                                                                            s[s.length - 1]) &&
                                                                        (6 === t[0] || 2 === t[0])
                                                                    ) {
                                                                        a = 0;
                                                                        continue;
                                                                    }
                                                                    if (
                                                                        3 === t[0] &&
                                                                        (!s || (t[1] > s[0] && t[1] < s[3]))
                                                                    ) {
                                                                        a.label = t[1];
                                                                        break;
                                                                    }
                                                                    if (6 === t[0] && a.label < s[1]) {
                                                                        (a.label = s[1]), (s = t);
                                                                        break;
                                                                    }
                                                                    if (s && a.label < s[2]) {
                                                                        (a.label = s[2]), a.ops.push(t);
                                                                        break;
                                                                    }
                                                                    s[2] && a.ops.pop(), a.trys.pop();
                                                                    continue;
                                                            }
                                                            t = r.call(n, a);
                                                        } catch (e) {
                                                            (t = [6, e]), (o = 0);
                                                        } finally {
                                                            i = s = 0;
                                                        }
                                                    if (5 & t[0]) throw t[1];
                                                    return { value: t[0] ? t[1] : void 0, done: !0 };
                                                })([t, e]);
                                            };
                                        }
                                    },
                                o =
                                    (this && this.__importDefault) ||
                                    function (e) {
                                        return e && e.__esModule ? e : { default: e };
                                    };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.API = void 0);
                            var s = e('./util'),
                                a = o(e('./logger')),
                                e =
                                    ((c.prototype._buildUrl = function (e) {
                                        return (
                                            (this._options.secure ? 'https://' : 'http://') +
                                            this._options.host +
                                            ':' +
                                            this._options.port +
                                            this._options.path +
                                            this._options.key +
                                            '/' +
                                            e +
                                            ('?ts=' + new Date().getTime() + Math.random())
                                        );
                                    }),
                                    (c.prototype.retrieveId = function () {
                                        return r(this, void 0, Promise, function () {
                                            var t, n;
                                            return i(this, function (e) {
                                                switch (e.label) {
                                                    case 0:
                                                        (t = this._buildUrl('id')), (e.label = 1);
                                                    case 1:
                                                        return e.trys.push([1, 3, , 4]), [4, fetch(t)];
                                                    case 2:
                                                        if (200 !== (n = e.sent()).status)
                                                            throw new Error('Error. Status:' + n.status);
                                                        return [2, n.text()];
                                                    case 3:
                                                        throw (
                                                            ((n = e.sent()),
                                                            a.default.error('Error retrieving ID', n),
                                                            (n = ''),
                                                            '/' === this._options.path &&
                                                                this._options.host !== s.util.CLOUD_HOST &&
                                                                (n =
                                                                    " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),
                                                            new Error('Could not get an ID from the server.' + n))
                                                        );
                                                    case 4:
                                                        return [2];
                                                }
                                            });
                                        });
                                    }),
                                    (c.prototype.listAllPeers = function () {
                                        return r(this, void 0, Promise, function () {
                                            var t, n, r;
                                            return i(this, function (e) {
                                                switch (e.label) {
                                                    case 0:
                                                        (t = this._buildUrl('peers')), (e.label = 1);
                                                    case 1:
                                                        return e.trys.push([1, 3, , 4]), [4, fetch(t)];
                                                    case 2:
                                                        if (200 === (r = e.sent()).status) return [2, r.json()];
                                                        if (401 === r.status)
                                                            throw (
                                                                ((n =
                                                                    this._options.host === s.util.CLOUD_HOST
                                                                        ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key."
                                                                        : 'You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.'),
                                                                new Error(
                                                                    "It doesn't look like you have permission to list peers IDs. " +
                                                                        n
                                                                ))
                                                            );
                                                        throw new Error('Error. Status:' + r.status);
                                                    case 3:
                                                        throw (
                                                            ((r = e.sent()),
                                                            a.default.error('Error retrieving list peers', r),
                                                            new Error('Could not get list peers from the server.' + r))
                                                        );
                                                    case 4:
                                                        return [2];
                                                }
                                            });
                                        });
                                    }),
                                    c);
                            function c(e) {
                                this._options = e;
                            }
                            n.API = e;
                        },
                        { './util': 'BHXf', './logger': 'WOs9' },
                    ],
                    Hxpd: [
                        function (e, t, n) {
                            var r,
                                i =
                                    (this && this.__extends) ||
                                    ((r = function (e, t) {
                                        return (r =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (e, t) {
                                                    e.__proto__ = t;
                                                }) ||
                                            function (e, t) {
                                                for (var n in t)
                                                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                                            })(e, t);
                                    }),
                                    function (e, t) {
                                        if ('function' != typeof t && null !== t)
                                            throw new TypeError(
                                                'Class extends value ' + String(t) + ' is not a constructor or null'
                                            );
                                        function n() {
                                            this.constructor = e;
                                        }
                                        r(e, t),
                                            (e.prototype =
                                                null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
                                    }),
                                o =
                                    (this && this.__assign) ||
                                    function () {
                                        return (o =
                                            Object.assign ||
                                            function (e) {
                                                for (var t, n = 1, r = arguments.length; n < r; n++)
                                                    for (var i in (t = arguments[n]))
                                                        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                                                return e;
                                            }).apply(this, arguments);
                                    },
                                p =
                                    (this && this.__values) ||
                                    function (e) {
                                        var t = 'function' == typeof Symbol && Symbol.iterator,
                                            n = t && e[t],
                                            r = 0;
                                        if (n) return n.call(e);
                                        if (e && 'number' == typeof e.length)
                                            return {
                                                next: function () {
                                                    return {
                                                        value: (e = e && r >= e.length ? void 0 : e) && e[r++],
                                                        done: !e,
                                                    };
                                                },
                                            };
                                        throw new TypeError(
                                            t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
                                        );
                                    },
                                c =
                                    (this && this.__read) ||
                                    function (e, t) {
                                        var n = 'function' == typeof Symbol && e[Symbol.iterator];
                                        if (!n) return e;
                                        var r,
                                            i,
                                            o = n.call(e),
                                            s = [];
                                        try {
                                            for (; (void 0 === t || 0 < t--) && !(r = o.next()).done; ) s.push(r.value);
                                        } catch (e) {
                                            i = { error: e };
                                        } finally {
                                            try {
                                                r && !r.done && (n = o.return) && n.call(o);
                                            } finally {
                                                if (i) throw i.error;
                                            }
                                        }
                                        return s;
                                    },
                                s =
                                    (this && this.__importDefault) ||
                                    function (e) {
                                        return e && e.__esModule ? e : { default: e };
                                    };
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.Peer = void 0);
                            var a,
                                u = e('eventemitter3'),
                                d = e('./util'),
                                h = s(e('./logger')),
                                l = e('./socket'),
                                f = e('./mediaconnection'),
                                m = e('./dataconnection'),
                                v = e('./enums'),
                                y = e('./api'),
                                i =
                                    ((a = u.EventEmitter),
                                    i(g, a),
                                    Object.defineProperty(g.prototype, 'id', {
                                        get: function () {
                                            return this._id;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(g.prototype, 'options', {
                                        get: function () {
                                            return this._options;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(g.prototype, 'open', {
                                        get: function () {
                                            return this._open;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(g.prototype, 'socket', {
                                        get: function () {
                                            return this._socket;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(g.prototype, 'connections', {
                                        get: function () {
                                            var t,
                                                e,
                                                n = Object.create(null);
                                            try {
                                                for (
                                                    var r = p(this._connections), i = r.next();
                                                    !i.done;
                                                    i = r.next()
                                                ) {
                                                    var o = c(i.value, 2),
                                                        s = o[0],
                                                        a = o[1];
                                                    n[s] = a;
                                                }
                                            } catch (e) {
                                                t = { error: e };
                                            } finally {
                                                try {
                                                    i && !i.done && (e = r.return) && e.call(r);
                                                } finally {
                                                    if (t) throw t.error;
                                                }
                                            }
                                            return n;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(g.prototype, 'destroyed', {
                                        get: function () {
                                            return this._destroyed;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(g.prototype, 'disconnected', {
                                        get: function () {
                                            return this._disconnected;
                                        },
                                        enumerable: !1,
                                        configurable: !0,
                                    }),
                                    (g.prototype._createServerConnection = function () {
                                        var t = this,
                                            e = new l.Socket(
                                                this._options.secure,
                                                this._options.host,
                                                this._options.port,
                                                this._options.path,
                                                this._options.key,
                                                this._options.pingInterval
                                            );
                                        return (
                                            e.on(v.SocketEventType.Message, function (e) {
                                                t._handleMessage(e);
                                            }),
                                            e.on(v.SocketEventType.Error, function (e) {
                                                t._abort(v.PeerErrorType.SocketError, e);
                                            }),
                                            e.on(v.SocketEventType.Disconnected, function () {
                                                t.disconnected ||
                                                    (t.emitError(v.PeerErrorType.Network, 'Lost connection to server.'),
                                                    t.disconnect());
                                            }),
                                            e.on(v.SocketEventType.Close, function () {
                                                t.disconnected ||
                                                    t._abort(
                                                        v.PeerErrorType.SocketClosed,
                                                        'Underlying socket is already closed.'
                                                    );
                                            }),
                                            e
                                        );
                                    }),
                                    (g.prototype._initialize = function (e) {
                                        (this._id = e), this.socket.start(e, this._options.token);
                                    }),
                                    (g.prototype._handleMessage = function (e) {
                                        var t,
                                            n,
                                            r = e.type,
                                            i = e.payload,
                                            o = e.src;
                                        switch (r) {
                                            case v.ServerMessageType.Open:
                                                (this._lastServerId = this.id),
                                                    (this._open = !0),
                                                    this.emit(v.PeerEventType.Open, this.id);
                                                break;
                                            case v.ServerMessageType.Error:
                                                this._abort(v.PeerErrorType.ServerError, i.msg);
                                                break;
                                            case v.ServerMessageType.IdTaken:
                                                this._abort(
                                                    v.PeerErrorType.UnavailableID,
                                                    'ID "' + this.id + '" is taken'
                                                );
                                                break;
                                            case v.ServerMessageType.InvalidKey:
                                                this._abort(
                                                    v.PeerErrorType.InvalidKey,
                                                    'API KEY "' + this._options.key + '" is invalid'
                                                );
                                                break;
                                            case v.ServerMessageType.Leave:
                                                h.default.log('Received leave message from ' + o),
                                                    this._cleanupPeer(o),
                                                    this._connections.delete(o);
                                                break;
                                            case v.ServerMessageType.Expire:
                                                this.emitError(
                                                    v.PeerErrorType.PeerUnavailable,
                                                    'Could not connect to peer ' + o
                                                );
                                                break;
                                            case v.ServerMessageType.Offer:
                                                var s = i.connectionId;
                                                if (
                                                    ((l = this.getConnection(o, s)) &&
                                                        (l.close(),
                                                        h.default.warn(
                                                            'Offer received for existing Connection ID:' + s
                                                        )),
                                                    i.type === v.ConnectionType.Media)
                                                )
                                                    (l = new f.MediaConnection(o, this, {
                                                        connectionId: s,
                                                        _payload: i,
                                                        metadata: i.metadata,
                                                    })),
                                                        this._addConnection(o, l),
                                                        this.emit(v.PeerEventType.Call, l);
                                                else {
                                                    if (i.type !== v.ConnectionType.Data)
                                                        return void h.default.warn(
                                                            'Received malformed connection type:' + i.type
                                                        );
                                                    (l = new m.DataConnection(o, this, {
                                                        connectionId: s,
                                                        _payload: i,
                                                        metadata: i.metadata,
                                                        label: i.label,
                                                        serialization: i.serialization,
                                                        reliable: i.reliable,
                                                    })),
                                                        this._addConnection(o, l),
                                                        this.emit(v.PeerEventType.Connection, l);
                                                }
                                                var a = this._getMessages(s);
                                                try {
                                                    for (var c = p(a), u = c.next(); !u.done; u = c.next()) {
                                                        var d = u.value;
                                                        l.handleMessage(d);
                                                    }
                                                } catch (e) {
                                                    t = { error: e };
                                                } finally {
                                                    try {
                                                        u && !u.done && (n = c.return) && n.call(c);
                                                    } finally {
                                                        if (t) throw t.error;
                                                    }
                                                }
                                                break;
                                            default:
                                                if (!i)
                                                    return void h.default.warn(
                                                        'You received a malformed message from ' + o + ' of type ' + r
                                                    );
                                                var l,
                                                    s = i.connectionId;
                                                (l = this.getConnection(o, s)) && l.peerConnection
                                                    ? l.handleMessage(e)
                                                    : s
                                                    ? this._storeMessage(s, e)
                                                    : h.default.warn('You received an unrecognized message:', e);
                                        }
                                    }),
                                    (g.prototype._storeMessage = function (e, t) {
                                        this._lostMessages.has(e) || this._lostMessages.set(e, []),
                                            this._lostMessages.get(e).push(t);
                                    }),
                                    (g.prototype._getMessages = function (e) {
                                        var t = this._lostMessages.get(e);
                                        return t ? (this._lostMessages.delete(e), t) : [];
                                    }),
                                    (g.prototype.connect = function (e, t) {
                                        if ((void 0 === t && (t = {}), this.disconnected))
                                            return (
                                                h.default.warn(
                                                    'You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.'
                                                ),
                                                void this.emitError(
                                                    v.PeerErrorType.Disconnected,
                                                    'Cannot connect to new Peer after disconnecting from server.'
                                                )
                                            );
                                        t = new m.DataConnection(e, this, t);
                                        return this._addConnection(e, t), t;
                                    }),
                                    (g.prototype.call = function (e, t, n) {
                                        if ((void 0 === n && (n = {}), this.disconnected))
                                            return (
                                                h.default.warn(
                                                    'You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.'
                                                ),
                                                void this.emitError(
                                                    v.PeerErrorType.Disconnected,
                                                    'Cannot connect to new Peer after disconnecting from server.'
                                                )
                                            );
                                        if (t) {
                                            n._stream = t;
                                            n = new f.MediaConnection(e, this, n);
                                            return this._addConnection(e, n), n;
                                        }
                                        h.default.error(
                                            "To call a peer, you must provide a stream from your browser's `getUserMedia`."
                                        );
                                    }),
                                    (g.prototype._addConnection = function (e, t) {
                                        h.default.log(
                                            'add connection ' + t.type + ':' + t.connectionId + ' to peerId:' + e
                                        ),
                                            this._connections.has(e) || this._connections.set(e, []),
                                            this._connections.get(e).push(t);
                                    }),
                                    (g.prototype._removeConnection = function (e) {
                                        var t,
                                            n = this._connections.get(e.peer);
                                        !n || (-1 !== (t = n.indexOf(e)) && n.splice(t, 1)),
                                            this._lostMessages.delete(e.connectionId);
                                    }),
                                    (g.prototype.getConnection = function (e, t) {
                                        var n,
                                            r,
                                            e = this._connections.get(e);
                                        if (!e) return null;
                                        try {
                                            for (var i = p(e), o = i.next(); !o.done; o = i.next()) {
                                                var s = o.value;
                                                if (s.connectionId === t) return s;
                                            }
                                        } catch (e) {
                                            n = { error: e };
                                        } finally {
                                            try {
                                                o && !o.done && (r = i.return) && r.call(i);
                                            } finally {
                                                if (n) throw n.error;
                                            }
                                        }
                                        return null;
                                    }),
                                    (g.prototype._delayedAbort = function (e, t) {
                                        var n = this;
                                        setTimeout(function () {
                                            n._abort(e, t);
                                        }, 0);
                                    }),
                                    (g.prototype._abort = function (e, t) {
                                        h.default.error('Aborting!'),
                                            this.emitError(e, t),
                                            this._lastServerId ? this.disconnect() : this.destroy();
                                    }),
                                    (g.prototype.emitError = function (e, t) {
                                        h.default.error('Error:', t),
                                            ((t = 'string' == typeof t ? new Error(t) : t).type = e),
                                            this.emit(v.PeerEventType.Error, t);
                                    }),
                                    (g.prototype.destroy = function () {
                                        this.destroyed ||
                                            (h.default.log('Destroy peer with ID:' + this.id),
                                            this.disconnect(),
                                            this._cleanup(),
                                            (this._destroyed = !0),
                                            this.emit(v.PeerEventType.Close));
                                    }),
                                    (g.prototype._cleanup = function () {
                                        var t, e;
                                        try {
                                            for (
                                                var n = p(this._connections.keys()), r = n.next();
                                                !r.done;
                                                r = n.next()
                                            ) {
                                                var i = r.value;
                                                this._cleanupPeer(i), this._connections.delete(i);
                                            }
                                        } catch (e) {
                                            t = { error: e };
                                        } finally {
                                            try {
                                                r && !r.done && (e = n.return) && e.call(n);
                                            } finally {
                                                if (t) throw t.error;
                                            }
                                        }
                                        this.socket.removeAllListeners();
                                    }),
                                    (g.prototype._cleanupPeer = function (e) {
                                        var t,
                                            n,
                                            e = this._connections.get(e);
                                        if (e)
                                            try {
                                                for (var r = p(e), i = r.next(); !i.done; i = r.next()) i.value.close();
                                            } catch (e) {
                                                t = { error: e };
                                            } finally {
                                                try {
                                                    i && !i.done && (n = r.return) && n.call(r);
                                                } finally {
                                                    if (t) throw t.error;
                                                }
                                            }
                                    }),
                                    (g.prototype.disconnect = function () {
                                        var e;
                                        this.disconnected ||
                                            ((e = this.id),
                                            h.default.log('Disconnect peer with ID:' + e),
                                            (this._disconnected = !0),
                                            (this._open = !1),
                                            this.socket.close(),
                                            (this._lastServerId = e),
                                            (this._id = null),
                                            this.emit(v.PeerEventType.Disconnected, e));
                                    }),
                                    (g.prototype.reconnect = function () {
                                        if (this.disconnected && !this.destroyed)
                                            h.default.log(
                                                'Attempting reconnection to server with ID ' + this._lastServerId
                                            ),
                                                (this._disconnected = !1),
                                                this._initialize(this._lastServerId);
                                        else {
                                            if (this.destroyed)
                                                throw new Error(
                                                    'This peer cannot reconnect to the server. It has already been destroyed.'
                                                );
                                            if (this.disconnected || this.open)
                                                throw new Error(
                                                    'Peer ' +
                                                        this.id +
                                                        ' cannot reconnect because it is not disconnected from the server!'
                                                );
                                            h.default.error(
                                                "In a hurry? We're still trying to make the initial connection!"
                                            );
                                        }
                                    }),
                                    (g.prototype.listAllPeers = function (t) {
                                        var n = this;
                                        void 0 === t && (t = function (e) {}),
                                            this._api
                                                .listAllPeers()
                                                .then(function (e) {
                                                    return t(e);
                                                })
                                                .catch(function (e) {
                                                    return n._abort(v.PeerErrorType.ServerError, e);
                                                });
                                    }),
                                    (g.DEFAULT_KEY = 'peerjs'),
                                    g);
                            function g(e, t) {
                                var n,
                                    r = a.call(this) || this;
                                return (
                                    (r._id = null),
                                    (r._lastServerId = null),
                                    (r._destroyed = !1),
                                    (r._disconnected = !1),
                                    (r._open = !1),
                                    (r._connections = new Map()),
                                    (r._lostMessages = new Map()),
                                    e && e.constructor == Object ? (t = e) : e && (n = e.toString()),
                                    (t = o(
                                        {
                                            debug: 0,
                                            host: d.util.CLOUD_HOST,
                                            port: d.util.CLOUD_PORT,
                                            path: '/',
                                            key: g.DEFAULT_KEY,
                                            token: d.util.randomToken(),
                                            config: d.util.defaultConfig,
                                        },
                                        t
                                    )),
                                    (r._options = t),
                                    '/' === r._options.host && (r._options.host = window.location.hostname),
                                    r._options.path &&
                                        ('/' !== r._options.path[0] && (r._options.path = '/' + r._options.path),
                                        '/' !== r._options.path[r._options.path.length - 1] &&
                                            (r._options.path += '/')),
                                    void 0 === r._options.secure && r._options.host !== d.util.CLOUD_HOST
                                        ? (r._options.secure = d.util.isSecure())
                                        : r._options.host == d.util.CLOUD_HOST && (r._options.secure = !0),
                                    r._options.logFunction && h.default.setLogFunction(r._options.logFunction),
                                    (h.default.logLevel = r._options.debug || 0),
                                    (r._api = new y.API(t)),
                                    (r._socket = r._createServerConnection()),
                                    d.util.supports.audioVideo || d.util.supports.data
                                        ? n && !d.util.validateId(n)
                                            ? r._delayedAbort(v.PeerErrorType.InvalidID, 'ID "' + n + '" is invalid')
                                            : n
                                            ? r._initialize(n)
                                            : r._api
                                                  .retrieveId()
                                                  .then(function (e) {
                                                      return r._initialize(e);
                                                  })
                                                  .catch(function (e) {
                                                      return r._abort(v.PeerErrorType.ServerError, e);
                                                  })
                                        : r._delayedAbort(
                                              v.PeerErrorType.BrowserIncompatible,
                                              'The current browser does not support WebRTC'
                                          ),
                                    r
                                );
                            }
                            n.Peer = i;
                        },
                        {
                            eventemitter3: 'JJlS',
                            './util': 'BHXf',
                            './logger': 'WOs9',
                            './socket': 'wJlv',
                            './mediaconnection': 'dbHP',
                            './dataconnection': 'GBTQ',
                            './enums': 'ZRYf',
                            './api': 'in7L',
                        },
                    ],
                    iTK6: [
                        function (e, t, n) {
                            Object.defineProperty(n, '__esModule', { value: !0 }), (n.peerjs = void 0);
                            var r = e('./util'),
                                e = e('./peer');
                            (n.peerjs = { Peer: e.Peer, util: r.util }),
                                (n.default = e.Peer),
                                (window.peerjs = n.peerjs),
                                (window.Peer = e.Peer);
                        },
                        { './util': 'BHXf', './peer': 'Hxpd' },
                    ],
                },
                {},
                ['iTK6']
            );
        }),
        g = (t = y) && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t,
        b =
            'undefined' != typeof navigator &&
            (-1 !== navigator.userAgent.indexOf('Chrom') || -1 !== navigator.userAgent.indexOf('Firefox'))
                ? 500
                : 100,
        _ = (function () {
            function n(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : b;
                H(this, n), (this.conn = e), (this.msgsPerSend = t), (this.buffer = []), (this.buffering = !1);
            }
            return (
                s(n, [
                    {
                        key: 'sendNext',
                        value: function () {
                            var e = this;
                            this.buffer.length
                                ? setTimeout(function () {
                                      e.conn.send(e.buffer.shift()), e.sendNext();
                                  }, 15)
                                : (this.buffering = !1);
                        },
                    },
                    {
                        key: 'send',
                        value: function (e) {
                            if (this.conn.open) {
                                for (var t = 0; t < e.length; ) this.buffer.push(e.slice(t, (t += this.msgsPerSend)));
                                this.buffering || ((this.buffering = !0), this.sendNext());
                            }
                        },
                    },
                ]),
                n
            );
        })(),
        S = (function () {
            function e() {
                H(this, e),
                    (this.position = [0, 0]),
                    (this.mouse = document.createElement('div')),
                    Object.assign(this.mouse.style, {
                        width: '20px',
                        height: '20px',
                        opacity: '.4',
                        borderRadius: '50%',
                        position: 'absolute',
                        zIndex: '999998',
                        background: 'radial-gradient(red, transparent)',
                    }),
                    document.body.appendChild(this.mouse);
            }
            return (
                s(e, [
                    {
                        key: 'move',
                        value: function (e) {
                            var t = e.x,
                                e = e.y;
                            (this.position = [t, e]),
                                Object.assign(this.mouse.style, {
                                    left: ''.concat(t || 0, 'px'),
                                    top: ''.concat(e || 0, 'px'),
                                });
                        },
                    },
                    {
                        key: 'getPosition',
                        value: function () {
                            return this.position;
                        },
                    },
                    {
                        key: 'remove',
                        value: function () {
                            this.mouse.parentElement && document.body.removeChild(this.mouse);
                        },
                    },
                ]),
                e
            );
        })(),
        C = '__openreplay_assist_call_start_ts',
        w = (function () {
            function e() {
                var t = this;
                H(this, e),
                    (this.vRemote = null),
                    (this.vLocal = null),
                    (this.audioBtn = null),
                    (this.videoBtn = null),
                    (this.endCallBtn = null),
                    (this.agentNameElem = null),
                    (this.videoContainer = null),
                    (this.vPlaceholder = null),
                    (this.aRemote = null),
                    (this.localStream = null),
                    (this.videoRequested = !1);
                var i = (this.iframe = document.createElement('iframe'));
                Object.assign(i.style, {
                    position: 'fixed',
                    zIndex: 2147483646,
                    border: 'none',
                    bottom: '10px',
                    right: '10px',
                    background: 'white',
                    height: '200px',
                    width: '200px',
                }),
                    document.body.appendChild(i);
                var o,
                    s = i.contentDocument;
                s
                    ? ((o = 'https://static.openreplay.com/tracker-assist/3.4.4'),
                      (this.load = fetch(o + '/index.html')
                          .then(function (e) {
                              return e.text();
                          })
                          .then(function (e) {
                              (i.onload = function () {
                                  var e = s.getElementById('or-assist');
                                  null != e && e.classList.remove('status-connecting'),
                                      t.adjustIframeSize(),
                                      (i.onload = null);
                              }),
                                  (e = e.replace(/href="css/g, 'href="'.concat(o, '/css'))),
                                  s.open(),
                                  s.write(e),
                                  s.close(),
                                  (t.vLocal = s.getElementById('video-local')),
                                  (t.vRemote = s.getElementById('video-remote')),
                                  (t.videoContainer = s.getElementById('video-container')),
                                  (t.audioBtn = s.getElementById('audio-btn')),
                                  t.audioBtn &&
                                      (t.audioBtn.onclick = function () {
                                          return t.toggleAudio();
                                      }),
                                  (t.videoBtn = s.getElementById('video-btn')),
                                  t.videoBtn &&
                                      (t.videoBtn.onclick = function () {
                                          return t.toggleVideo();
                                      }),
                                  (t.endCallBtn = s.getElementById('end-call-btn')),
                                  (t.agentNameElem = s.getElementById('agent-name')),
                                  (t.vPlaceholder = s.querySelector('#remote-stream p'));
                              var n,
                                  r = s.getElementById('duration');
                              r &&
                                  ((n = Number(sessionStorage.getItem(C)) || Date.now()),
                                  sessionStorage.setItem(C, n.toString()),
                                  (t.tsInterval = setInterval(function () {
                                      var e = ~~((Date.now() - n) / 1e3),
                                          t = ~~(e / 60),
                                          e = e - 60 * t;
                                      r.innerText = ''
                                          .concat(t, ':')
                                          .concat(e < 10 ? 0 : '')
                                          .concat(e);
                                  }, 500))),
                                  s.body.setAttribute('draggable', 'true'),
                                  (s.body.ondragstart = function (e) {
                                      e.dataTransfer &&
                                          e.target &&
                                          e.target.classList &&
                                          e.target.classList.contains('drag-area') &&
                                          e.dataTransfer.setDragImage(s.body, e.clientX, e.clientY);
                                  }),
                                  (s.body.ondragend = function (e) {
                                      Object.assign(i.style, {
                                          left: ''.concat(e.clientX, 'px'),
                                          top: ''.concat(e.clientY, 'px'),
                                          bottom: 'auto',
                                          right: 'auto',
                                      });
                                  });
                          })))
                    : console.error('OpenReplay: CallWindow iframe document is not reachable.');
            }
            return (
                s(e, [
                    {
                        key: 'adjustIframeSize',
                        value: function () {
                            var e = this.iframe.contentDocument;
                            e &&
                                ((this.iframe.style.height = e.body.scrollHeight + 'px'),
                                (this.iframe.style.width = e.body.scrollWidth + 'px'));
                        },
                    },
                    {
                        key: 'setCallEndAction',
                        value: function (e) {
                            var t = this;
                            this.load.then(function () {
                                t.endCallBtn && (t.endCallBtn.onclick = e);
                            });
                        },
                    },
                    {
                        key: 'setRemoteStream',
                        value: function (n) {
                            var r = this;
                            this.load.then(function () {
                                r.vRemote &&
                                    !r.vRemote.srcObject &&
                                    ((r.vRemote.srcObject = n),
                                    r.vPlaceholder &&
                                        (r.vPlaceholder.innerText = 'Video has been paused. Click anywhere to resume.'),
                                    (r.aRemote = document.createElement('audio')),
                                    (r.aRemote.autoplay = !0),
                                    (r.aRemote.style.display = 'none'),
                                    (r.aRemote.srcObject = n),
                                    document.body.appendChild(r.aRemote)),
                                    r.checkRemoteVideoInterval && clearInterval(r.checkRemoteVideoInterval);
                                var t = !1;
                                r.checkRemoteVideoInterval = setInterval(function () {
                                    var e =
                                            null === (e = n.getVideoTracks()[0]) || void 0 === e
                                                ? void 0
                                                : e.getSettings(),
                                        e = !(!!e && (2 === e.width || 0 === e.frameRate));
                                    t !== e && r.toggleRemoteVideoUI((t = e));
                                }, 1e3);
                            });
                        },
                    },
                    {
                        key: 'toggleRemoteVideoUI',
                        value: function (e) {
                            var t = this;
                            this.load.then(function () {
                                t.videoContainer &&
                                    (e
                                        ? t.videoContainer.classList.add('remote')
                                        : t.videoContainer.classList.remove('remote'),
                                    t.adjustIframeSize());
                            });
                        },
                    },
                    {
                        key: 'setLocalStream',
                        value: function (e) {
                            this.localStream = e;
                        },
                    },
                    {
                        key: 'playRemote',
                        value: function () {
                            this.vRemote && this.vRemote.play();
                        },
                    },
                    {
                        key: 'setAssistentName',
                        value: function (e) {
                            var t = this;
                            this.load.then(function () {
                                t.agentNameElem && (t.agentNameElem.innerText = e);
                            });
                        },
                    },
                    {
                        key: 'toggleAudioUI',
                        value: function (e) {
                            this.audioBtn &&
                                (e ? this.audioBtn.classList.remove('muted') : this.audioBtn.classList.add('muted'));
                        },
                    },
                    {
                        key: 'toggleAudio',
                        value: function () {
                            var e = (null === (e = this.localStream) || void 0 === e ? void 0 : e.toggleAudio()) || !1;
                            this.toggleAudioUI(e);
                        },
                    },
                    {
                        key: 'toggleVideoUI',
                        value: function (e) {
                            this.videoBtn &&
                                this.videoContainer &&
                                (e
                                    ? (this.videoContainer.classList.add('local'),
                                      this.videoBtn.classList.remove('off'))
                                    : (this.videoContainer.classList.remove('local'),
                                      this.videoBtn.classList.add('off')),
                                this.adjustIframeSize());
                        },
                    },
                    {
                        key: 'toggleVideo',
                        value: function () {
                            var e,
                                t = this;
                            null !== (e = this.localStream) &&
                                void 0 !== e &&
                                e.toggleVideo().then(function (e) {
                                    t.toggleVideoUI(e),
                                        t.load.then(function () {
                                            t.vLocal &&
                                                t.localStream &&
                                                !t.vLocal.srcObject &&
                                                (t.vLocal.srcObject = t.localStream.stream);
                                        });
                                });
                        },
                    },
                    {
                        key: 'remove',
                        value: function () {
                            var e;
                            null !== (e = this.localStream) && void 0 !== e && e.stop(),
                                clearInterval(this.tsInterval),
                                clearInterval(this.checkRemoteVideoInterval),
                                this.iframe.parentElement && document.body.removeChild(this.iframe),
                                this.aRemote && this.aRemote.parentElement && document.body.removeChild(this.aRemote),
                                sessionStorage.removeItem(C);
                        },
                    },
                ]),
                e
            );
        })(),
        k =
            '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 128 128" ><g id="Circle_Grid" data-name="Circle Grid"><circle cx="64" cy="64" fill="#ef5261" r="64"/></g><g id="icon"><path d="m57.831 70.1c8.79 8.79 17.405 12.356 20.508 9.253l4.261-4.26a7.516 7.516 0 0 1 10.629 0l9.566 9.566a7.516 7.516 0 0 1 0 10.629l-7.453 7.453c-7.042 7.042-27.87-2.358-47.832-22.319-9.976-9.981-16.519-19.382-20.748-28.222s-5.086-16.091-1.567-19.61l7.453-7.453a7.516 7.516 0 0 1 10.629 0l9.566 9.563a7.516 7.516 0 0 1 0 10.629l-4.264 4.271c-3.103 3.1.462 11.714 9.252 20.5z" fill="#eeefee"/></g></svg>',
        T = (function () {
            function c(e, t) {
                var n = this;
                H(this, c), (this.resolve = function () {}), (this.reject = function () {});
                var r = document.createElement('div'),
                    i = document.createElement('div'),
                    o = document.createElement('p');
                o.innerText = e;
                var s = document.createElement('div'),
                    a = document.createElement('button');
                a.innerHTML = k.replace('fill="#ef5261"', 'fill="green"');
                e = document.createElement('button');
                (e.innerHTML = k), s.appendChild(a), s.appendChild(e), i.appendChild(o), i.appendChild(s);
                o = {
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    background: 'transparent',
                    padding: 0,
                    margin: 0,
                    border: 0,
                    cursor: 'pointer',
                };
                Object.assign(a.style, o),
                    Object.assign(e.style, o),
                    Object.assign(s.style, {
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }),
                    Object.assign(
                        i.style,
                        {
                            position: 'relative',
                            pointerEvents: 'auto',
                            margin: '4em auto',
                            width: '90%',
                            maxWidth: '400px',
                            padding: '25px 30px',
                            background: 'black',
                            opacity: '.75',
                            color: 'white',
                            textAlign: 'center',
                            borderRadius: '.25em .25em .4em .4em',
                            boxShadow: '0 0 20px rgb(0 0 0 / 20%)',
                        },
                        t
                    ),
                    Object.assign(r.style, {
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '100%',
                        pointerEvents: 'none',
                        zIndex: 2147483646,
                    }),
                    r.appendChild(i),
                    (this.wrapper = r),
                    (a.onclick = function () {
                        n._remove(), n.resolve(!0);
                    }),
                    (e.onclick = function () {
                        n._remove(), n.resolve(!1);
                    });
            }
            return (
                s(c, [
                    {
                        key: 'mount',
                        value: function () {
                            var n = this;
                            return (
                                document.body.appendChild(this.wrapper),
                                new Promise(function (e, t) {
                                    (n.resolve = e), (n.reject = t);
                                })
                            );
                        },
                    },
                    {
                        key: '_remove',
                        value: function () {
                            this.wrapper.parentElement && document.body.removeChild(this.wrapper);
                        },
                    },
                    {
                        key: 'remove',
                        value: function () {
                            this._remove(), this.reject();
                        },
                    },
                ]),
                c
            );
        })();
    var E,
        P = (function () {
            function t(e) {
                H(this, t),
                    (this.mediaRequested = !1),
                    (this.onVideoTrackCb = null),
                    (this.vdTrack = (function () {
                        var t = document.createElement('canvas');
                        t.width = t.height = 2;
                        var n = t.getContext('2d');
                        return (
                            null != n && n.fillRect(0, 0, t.width, t.height),
                            requestAnimationFrame(function e() {
                                null != n && n.fillRect(0, 0, t.width, t.height), requestAnimationFrame(e);
                            }),
                            t.captureStream(60).getTracks()[0]
                        );
                    })()),
                    (this.stream = new MediaStream([e, this.vdTrack]));
            }
            return (
                s(t, [
                    {
                        key: 'toggleVideo',
                        value: function () {
                            var t = this;
                            if (!this.mediaRequested)
                                return navigator.mediaDevices
                                    .getUserMedia({ video: !0 })
                                    .then(function (e) {
                                        e = e.getVideoTracks()[0];
                                        if (!e) throw new Error('No video track provided');
                                        return (
                                            t.stream.addTrack(e),
                                            t.stream.removeTrack(t.vdTrack),
                                            (t.mediaRequested = !0),
                                            t.onVideoTrackCb && t.onVideoTrackCb(e),
                                            !0
                                        );
                                    })
                                    .catch(function (e) {
                                        return !1;
                                    });
                            var n = !0;
                            return (
                                this.stream.getVideoTracks().forEach(function (e) {
                                    e.enabled = n = n && !e.enabled;
                                }),
                                Promise.resolve(n)
                            );
                        },
                    },
                    {
                        key: 'toggleAudio',
                        value: function () {
                            var t = !0;
                            return (
                                this.stream.getAudioTracks().forEach(function (e) {
                                    e.enabled = t = t && !e.enabled;
                                }),
                                t
                            );
                        },
                    },
                    {
                        key: 'onVideoTrack',
                        value: function (e) {
                            this.onVideoTrackCb = e;
                        },
                    },
                    {
                        key: 'stop',
                        value: function () {
                            this.stream.getTracks().forEach(function (e) {
                                return e.stop();
                            });
                        },
                    },
                ]),
                t
            );
        })();
    function W() {
        return Math.round(performance.now()) + performance.timing.navigationStart;
    }
    ((A = E = E || {})[(A.Requesting = 0)] = 'Requesting'), (A[(A.True = 1)] = 'True'), (A[(A.False = 2)] = 'False');
    var R =
        'repeat' in String.prototype
            ? function (e) {
                  return '*'.repeat(e.length);
              }
            : function (e) {
                  return e.replace(/./g, '*');
              };
    function O(e) {
        return e.trim().replace(/\s+/g, ' ');
    }
    function J(e) {
        return 'https://' === e.substr(0, 8) || 'http://' === e.substr(0, 7);
    }
    var K = !('undefined' == typeof window),
        x = console.log,
        I = console.warn,
        q = 'https://docs.openreplay.com',
        M = {};
    function Y(e, t, n) {
        n = 2 < arguments.length && void 0 !== n ? n : '/';
        M[e] ||
            (I(
                'OpenReplay: '
                    .concat(e, ' is deprecated. ')
                    .concat(t ? 'Please, use '.concat(t, ' instead.') : '', ' Visit ')
                    .concat(q)
                    .concat(n, ' for more information.')
            ),
            (M[e] = !0));
    }
    function D(e) {
        var t = e.getAttribute('data-openreplay-label');
        return (
            null !== t ||
                (null !== (t = e.getAttribute('data-asayer-label')) &&
                    Y('"data-asayer-label" attribute', '"data-openreplay-label" attribute', '/')),
            t
        );
    }
    function j(e, t) {
        var n = 'data-openreplay-'.concat(t);
        if (e.hasAttribute(n)) return 1;
        t = 'data-asayer-'.concat(t);
        return (
            e.hasAttribute(t) &&
            (Y('"'.concat(t, '" attribute'), '"'.concat(n, '" attribute'), '/installation/sanitize-data'), 1)
        );
    }
    function L(r) {
        function e() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return c(r, t);
        }
        return (e.prototype = r.prototype), e;
    }
    var N = new Map(),
        A = L(
            (function () {
                function r(e, t, n) {
                    H(this, r), (this.pageNo = e), (this.firstIndex = t), (this.timestamp = n), (this._id = 80);
                }
                return (
                    s(r, [
                        {
                            key: 'encode',
                            value: function (e) {
                                return (
                                    e.uint(80) &&
                                    e.uint(this.pageNo) &&
                                    e.uint(this.firstIndex) &&
                                    e.int(this.timestamp)
                                );
                            },
                        },
                    ]),
                    r
                );
            })()
        );
    N.set(80, A);
    var B = L(
        (function () {
            function t(e) {
                H(this, t), (this.timestamp = e), (this._id = 0);
            }
            return (
                s(t, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(0) && e.uint(this.timestamp);
                        },
                    },
                ]),
                t
            );
        })()
    );
    N.set(0, B);
    var X = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.url = e), (this.referrer = t), (this.navigationStart = n), (this._id = 4);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(4) &&
                                e.string(this.url) &&
                                e.string(this.referrer) &&
                                e.uint(this.navigationStart)
                            );
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(4, X);
    var Q = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.width = e), (this.height = t), (this._id = 5);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(5) && e.uint(this.width) && e.uint(this.height);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(5, Q);
    var $ = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.x = e), (this.y = t), (this._id = 6);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(6) && e.int(this.x) && e.int(this.y);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(6, $);
    var U = L(
        (function () {
            function e() {
                H(this, e), (this._id = 7);
            }
            return (
                s(e, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(7);
                        },
                    },
                ]),
                e
            );
        })()
    );
    N.set(7, U);
    var F = L(
        (function () {
            function o(e, t, n, r, i) {
                H(this, o),
                    (this.id = e),
                    (this.parentID = t),
                    (this.index = n),
                    (this.tag = r),
                    (this.svg = i),
                    (this._id = 8);
            }
            return (
                s(o, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(8) &&
                                e.uint(this.id) &&
                                e.uint(this.parentID) &&
                                e.uint(this.index) &&
                                e.string(this.tag) &&
                                e.boolean(this.svg)
                            );
                        },
                    },
                ]),
                o
            );
        })()
    );
    N.set(8, F);
    var z = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.id = e), (this.parentID = t), (this.index = n), (this._id = 9);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(9) && e.uint(this.id) && e.uint(this.parentID) && e.uint(this.index);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(9, z);
    var G = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.id = e), (this.parentID = t), (this.index = n), (this._id = 10);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(10) && e.uint(this.id) && e.uint(this.parentID) && e.uint(this.index);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(10, G);
    var Z = L(
        (function () {
            function t(e) {
                H(this, t), (this.id = e), (this._id = 11);
            }
            return (
                s(t, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(11) && e.uint(this.id);
                        },
                    },
                ]),
                t
            );
        })()
    );
    N.set(11, Z);
    var ee = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.id = e), (this.name = t), (this.value = n), (this._id = 12);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(12) && e.uint(this.id) && e.string(this.name) && e.string(this.value);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(12, ee);
    var te = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.id = e), (this.name = t), (this._id = 13);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(13) && e.uint(this.id) && e.string(this.name);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(13, te);
    var ne = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.id = e), (this.data = t), (this._id = 14);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(14) && e.uint(this.id) && e.string(this.data);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(14, ne);
    var re = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.id = e), (this.x = t), (this.y = n), (this._id = 16);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(16) && e.uint(this.id) && e.int(this.x) && e.int(this.y);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(16, re);
    var ie = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.id = e), (this.label = t), (this._id = 17);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(17) && e.uint(this.id) && e.string(this.label);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(17, ie);
    var oe = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.id = e), (this.value = t), (this.mask = n), (this._id = 18);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(18) && e.uint(this.id) && e.string(this.value) && e.int(this.mask);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(18, oe);
    var se = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.id = e), (this.checked = t), (this._id = 19);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(19) && e.uint(this.id) && e.boolean(this.checked);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(19, se);
    var ae = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.x = e), (this.y = t), (this._id = 20);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(20) && e.uint(this.x) && e.uint(this.y);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(20, ae);
    var ce = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.level = e), (this.value = t), (this._id = 22);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(22) && e.string(this.level) && e.string(this.value);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(22, ce);
    var ue = L(
        (function () {
            function u(e, t, n, r, i, o, s, a, c) {
                H(this, u),
                    (this.requestStart = e),
                    (this.responseStart = t),
                    (this.responseEnd = n),
                    (this.domContentLoadedEventStart = r),
                    (this.domContentLoadedEventEnd = i),
                    (this.loadEventStart = o),
                    (this.loadEventEnd = s),
                    (this.firstPaint = a),
                    (this.firstContentfulPaint = c),
                    (this._id = 23);
            }
            return (
                s(u, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(23) &&
                                e.uint(this.requestStart) &&
                                e.uint(this.responseStart) &&
                                e.uint(this.responseEnd) &&
                                e.uint(this.domContentLoadedEventStart) &&
                                e.uint(this.domContentLoadedEventEnd) &&
                                e.uint(this.loadEventStart) &&
                                e.uint(this.loadEventEnd) &&
                                e.uint(this.firstPaint) &&
                                e.uint(this.firstContentfulPaint)
                            );
                        },
                    },
                ]),
                u
            );
        })()
    );
    N.set(23, ue);
    var de = L(
        (function () {
            function r(e, t, n) {
                H(this, r),
                    (this.speedIndex = e),
                    (this.visuallyComplete = t),
                    (this.timeToInteractive = n),
                    (this._id = 24);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(24) &&
                                e.uint(this.speedIndex) &&
                                e.uint(this.visuallyComplete) &&
                                e.uint(this.timeToInteractive)
                            );
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(24, de);
    var le = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.name = e), (this.message = t), (this.payload = n), (this._id = 25);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(25) && e.string(this.name) && e.string(this.message) && e.string(this.payload)
                            );
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(25, le);
    var pe = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.name = e), (this.payload = t), (this._id = 27);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(27) && e.string(this.name) && e.string(this.payload);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(27, pe);
    var he = L(
        (function () {
            function t(e) {
                H(this, t), (this.id = e), (this._id = 28);
            }
            return (
                s(t, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(28) && e.string(this.id);
                        },
                    },
                ]),
                t
            );
        })()
    );
    N.set(28, he);
    var fe = L(
        (function () {
            function t(e) {
                H(this, t), (this.id = e), (this._id = 29);
            }
            return (
                s(t, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(29) && e.string(this.id);
                        },
                    },
                ]),
                t
            );
        })()
    );
    N.set(29, fe);
    var me = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.key = e), (this.value = t), (this._id = 30);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(30) && e.string(this.key) && e.string(this.value);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(30, me);
    A = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.id = e), (this.rule = t), (this.index = n), (this._id = 37);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(37) && e.uint(this.id) && e.string(this.rule) && e.uint(this.index);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(37, A);
    var ve = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.id = e), (this.index = t), (this._id = 38);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(38) && e.uint(this.id) && e.uint(this.index);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(38, ve);
    A = L(
        (function () {
            function a(e, t, n, r, i, o, s) {
                H(this, a),
                    (this.method = e),
                    (this.url = t),
                    (this.request = n),
                    (this.response = r),
                    (this.status = i),
                    (this.timestamp = o),
                    (this.duration = s),
                    (this._id = 39);
            }
            return (
                s(a, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(39) &&
                                e.string(this.method) &&
                                e.string(this.url) &&
                                e.string(this.request) &&
                                e.string(this.response) &&
                                e.uint(this.status) &&
                                e.uint(this.timestamp) &&
                                e.uint(this.duration)
                            );
                        },
                    },
                ]),
                a
            );
        })()
    );
    N.set(39, A);
    A = L(
        (function () {
            function i(e, t, n, r) {
                H(this, i), (this.name = e), (this.duration = t), (this.args = n), (this.result = r), (this._id = 40);
            }
            return (
                s(i, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(40) &&
                                e.string(this.name) &&
                                e.uint(this.duration) &&
                                e.string(this.args) &&
                                e.string(this.result)
                            );
                        },
                    },
                ]),
                i
            );
        })()
    );
    N.set(40, A);
    A = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.key = e), (this.value = t), (this._id = 41);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(41) && e.string(this.key) && e.string(this.value);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(41, A);
    A = L(
        (function () {
            function t(e) {
                H(this, t), (this.type = e), (this._id = 42);
            }
            return (
                s(t, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(42) && e.string(this.type);
                        },
                    },
                ]),
                t
            );
        })()
    );
    N.set(42, A);
    A = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.action = e), (this.state = t), (this.duration = n), (this._id = 44);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(44) && e.string(this.action) && e.string(this.state) && e.uint(this.duration);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(44, A);
    A = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.mutation = e), (this.state = t), (this._id = 45);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(45) && e.string(this.mutation) && e.string(this.state);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(45, A);
    A = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.type = e), (this.payload = t), (this._id = 46);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(46) && e.string(this.type) && e.string(this.payload);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(46, A);
    A = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.action = e), (this.state = t), (this.duration = n), (this._id = 47);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(47) && e.string(this.action) && e.string(this.state) && e.uint(this.duration);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(47, A);
    A = L(
        (function () {
            function i(e, t, n, r) {
                H(this, i),
                    (this.operationKind = e),
                    (this.operationName = t),
                    (this.variables = n),
                    (this.response = r),
                    (this._id = 48);
            }
            return (
                s(i, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(48) &&
                                e.string(this.operationKind) &&
                                e.string(this.operationName) &&
                                e.string(this.variables) &&
                                e.string(this.response)
                            );
                        },
                    },
                ]),
                i
            );
        })()
    );
    N.set(48, A);
    var ye = L(
        (function () {
            function i(e, t, n, r) {
                H(this, i),
                    (this.frames = e),
                    (this.ticks = t),
                    (this.totalJSHeapSize = n),
                    (this.usedJSHeapSize = r),
                    (this._id = 49);
            }
            return (
                s(i, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(49) &&
                                e.int(this.frames) &&
                                e.int(this.ticks) &&
                                e.uint(this.totalJSHeapSize) &&
                                e.uint(this.usedJSHeapSize)
                            );
                        },
                    },
                ]),
                i
            );
        })()
    );
    N.set(49, ye);
    var ge = L(
        (function () {
            function c(e, t, n, r, i, o, s, a) {
                H(this, c),
                    (this.timestamp = e),
                    (this.duration = t),
                    (this.ttfb = n),
                    (this.headerSize = r),
                    (this.encodedBodySize = i),
                    (this.decodedBodySize = o),
                    (this.url = s),
                    (this.initiator = a),
                    (this._id = 53);
            }
            return (
                s(c, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(53) &&
                                e.uint(this.timestamp) &&
                                e.uint(this.duration) &&
                                e.uint(this.ttfb) &&
                                e.uint(this.headerSize) &&
                                e.uint(this.encodedBodySize) &&
                                e.uint(this.decodedBodySize) &&
                                e.string(this.url) &&
                                e.string(this.initiator)
                            );
                        },
                    },
                ]),
                c
            );
        })()
    );
    N.set(53, ge);
    var be = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.downlink = e), (this.type = t), (this._id = 54);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(54) && e.uint(this.downlink) && e.string(this.type);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(54, be);
    var _e = L(
        (function () {
            function t(e) {
                H(this, t), (this.hidden = e), (this._id = 55);
            }
            return (
                s(t, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(55) && e.boolean(this.hidden);
                        },
                    },
                ]),
                t
            );
        })()
    );
    N.set(55, _e);
    var Se = L(
        (function () {
            function a(e, t, n, r, i, o, s) {
                H(this, a),
                    (this.timestamp = e),
                    (this.duration = t),
                    (this.context = n),
                    (this.containerType = r),
                    (this.containerSrc = i),
                    (this.containerId = o),
                    (this.containerName = s),
                    (this._id = 59);
            }
            return (
                s(a, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(59) &&
                                e.uint(this.timestamp) &&
                                e.uint(this.duration) &&
                                e.uint(this.context) &&
                                e.uint(this.containerType) &&
                                e.string(this.containerSrc) &&
                                e.string(this.containerId) &&
                                e.string(this.containerName)
                            );
                        },
                    },
                ]),
                a
            );
        })()
    );
    N.set(59, Se);
    var Ce = L(
        (function () {
            function i(e, t, n, r) {
                H(this, i), (this.id = e), (this.name = t), (this.value = n), (this.baseURL = r), (this._id = 60);
            }
            return (
                s(i, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(60) &&
                                e.uint(this.id) &&
                                e.string(this.name) &&
                                e.string(this.value) &&
                                e.string(this.baseURL)
                            );
                        },
                    },
                ]),
                i
            );
        })()
    );
    N.set(60, Ce);
    var we = L(
        (function () {
            function r(e, t, n) {
                H(this, r), (this.id = e), (this.data = t), (this.baseURL = n), (this._id = 61);
            }
            return (
                s(r, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(61) && e.uint(this.id) && e.string(this.data) && e.string(this.baseURL);
                        },
                    },
                ]),
                r
            );
        })()
    );
    N.set(61, we);
    var ke = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.type = e), (this.value = t), (this._id = 63);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(63) && e.string(this.type) && e.string(this.value);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(63, ke);
    var Te = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.name = e), (this.payload = t), (this._id = 64);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(64) && e.string(this.name) && e.string(this.payload);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(64, Te);
    A = L(
        (function () {
            function e() {
                H(this, e), (this._id = 65);
            }
            return (
                s(e, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(65);
                        },
                    },
                ]),
                e
            );
        })()
    );
    N.set(65, A);
    var Ee = L(
        (function () {
            function i(e, t, n, r) {
                H(this, i), (this.id = e), (this.rule = t), (this.index = n), (this.baseURL = r), (this._id = 67);
            }
            return (
                s(i, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(67) &&
                                e.uint(this.id) &&
                                e.string(this.rule) &&
                                e.uint(this.index) &&
                                e.string(this.baseURL)
                            );
                        },
                    },
                ]),
                i
            );
        })()
    );
    N.set(67, Ee);
    var Pe = L(
        (function () {
            function i(e, t, n, r) {
                H(this, i),
                    (this.id = e),
                    (this.hesitationTime = t),
                    (this.label = n),
                    (this.selector = r),
                    (this._id = 69);
            }
            return (
                s(i, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return (
                                e.uint(69) &&
                                e.uint(this.id) &&
                                e.uint(this.hesitationTime) &&
                                e.string(this.label) &&
                                e.string(this.selector)
                            );
                        },
                    },
                ]),
                i
            );
        })()
    );
    N.set(69, Pe);
    var Re = L(
        (function () {
            function n(e, t) {
                H(this, n), (this.frameID = e), (this.id = t), (this._id = 70);
            }
            return (
                s(n, [
                    {
                        key: 'encode',
                        value: function (e) {
                            return e.uint(70) && e.uint(this.frameID) && e.uint(this.id);
                        },
                    },
                ]),
                n
            );
        })()
    );
    N.set(70, Re);
    var Oe = (function () {
        function t(e) {
            H(this, t),
                (this.node_id = e),
                (this.nodes = []),
                (this.nodeCallbacks = []),
                (this.elementListeners = new Map());
        }
        return (
            s(t, [
                {
                    key: 'attachNodeCallback',
                    value: function (e) {
                        this.nodeCallbacks.push(e);
                    },
                },
                {
                    key: 'attachElementListener',
                    value: function (e, t, n) {
                        var r = this.getID(t);
                        void 0 !== r &&
                            (t.addEventListener(e, n),
                            void 0 !== (t = this.elementListeners.get(r))
                                ? t.push([e, n])
                                : this.elementListeners.set(r, (t = [])));
                    },
                },
                {
                    key: 'registerNode',
                    value: function (e) {
                        var t = e[this.node_id],
                            n = void 0 === t;
                        return n && ((t = this.nodes.length), ((this.nodes[t] = e)[this.node_id] = t)), [t, n];
                    },
                },
                {
                    key: 'unregisterNode',
                    value: function (t) {
                        var e,
                            n = t[this.node_id];
                        return (
                            void 0 !== n &&
                                (delete t[this.node_id],
                                (this.nodes[n] = void 0) !== (e = this.elementListeners.get(n)) &&
                                    (this.elementListeners.delete(n),
                                    e.forEach(function (e) {
                                        return t.removeEventListener(e[0], e[1]);
                                    }))),
                            n
                        );
                    },
                },
                {
                    key: 'callNodeCallbacks',
                    value: function (t) {
                        this.nodeCallbacks.forEach(function (e) {
                            return e(t);
                        });
                    },
                },
                {
                    key: 'getID',
                    value: function (e) {
                        return e[this.node_id];
                    },
                },
                {
                    key: 'getNode',
                    value: function (e) {
                        return this.nodes[e];
                    },
                },
                {
                    key: 'clear',
                    value: function () {
                        for (var e = 0; e < this.nodes.length; e++) {
                            var t = this.nodes[e];
                            void 0 !== t && this.unregisterNode(t);
                        }
                        this.nodes.length = 0;
                    },
                },
            ]),
            t
        );
    })();
    function xe(e) {
        return 'http://www.w3.org/2000/svg' === e.namespaceURI;
    }
    function Ie(e, t) {
        var n = e.ownerDocument;
        if (!n) return 'Document' === t.name;
        for (var r = n.parentWindow || n.defaultView; r.parent && r.parent !== r; ) {
            if (e instanceof r[t.name]) return !0;
            r = r.parent;
        }
        return e instanceof r[t.name];
    }
    function Me(e) {
        if (!Ie(e, Text)) {
            if (!Ie(e, Element)) return 1;
            var t = e.tagName.toUpperCase();
            if ('LINK' !== t)
                return 'SCRIPT' === t || 'NOSCRIPT' === t || 'META' === t || 'TITLE' === t || 'BASE' === t;
            (t = e.getAttribute('rel')), (e = e.getAttribute('as'));
            return !((null != t && t.includes('stylesheet')) || 'style' === e || 'font' === e);
        }
    }
    function De(e) {
        return Ie(e, Document) || Ie(e, ShadowRoot);
    }
    function je(e) {
        return De(e) || !Me(e);
    }
    var Le = (function () {
            function n(e, t) {
                var l = this,
                    p = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : window;
                H(this, n),
                    (this.app = e),
                    (this.context = p),
                    (this.commited = []),
                    (this.recents = []),
                    (this.myNodes = []),
                    (this.indexes = []),
                    (this.attributesList = []),
                    (this.textSet = new Set()),
                    (this.textMasked = new Set()),
                    (this.options = Object.assign({ obscureTextEmails: !0, obscureTextNumbers: !1 }, t)),
                    (this.inUpperContext = p.parent === p),
                    (this.observer = new MutationObserver(
                        this.app.safe(function (e) {
                            var t,
                                n = V(e);
                            try {
                                for (n.s(); !(t = n.n()).done; ) {
                                    var r = t.value,
                                        i = r.target,
                                        o = r.type;
                                    if (je(i) && p.document.contains(i))
                                        if ('childList' !== o) {
                                            var s,
                                                a,
                                                c = l.app.nodes.getID(i);
                                            void 0 !== c &&
                                                (c >= l.recents.length && (l.recents[c] = void 0),
                                                'attributes' !== o
                                                    ? 'characterData' !== o || l.textSet.add(c)
                                                    : null !== (s = r.attributeName) &&
                                                      (void 0 === (a = l.attributesList[c]) &&
                                                          (l.attributesList[c] = a = new Set()),
                                                      a.add(s)));
                                        } else {
                                            for (var u = 0; u < r.removedNodes.length; u++)
                                                l.bindTree(r.removedNodes[u]);
                                            for (var d = 0; d < r.addedNodes.length; d++) l.bindTree(r.addedNodes[d]);
                                        }
                                }
                            } catch (e) {
                                n.e(e);
                            } finally {
                                n.f();
                            }
                            l.commitNodes();
                        })
                    ));
            }
            return (
                s(n, [
                    {
                        key: 'clear',
                        value: function () {
                            (this.commited.length = 0),
                                (this.recents.length = 0),
                                (this.indexes.length = 1),
                                (this.attributesList.length = 0),
                                this.textSet.clear();
                        },
                    },
                    {
                        key: 'sendNodeAttribute',
                        value: function (e, t, n, r) {
                            if (xe(t))
                                return (
                                    'xlink:' === n.substr(0, 6) && (n = n.substr(6)),
                                    void (null === r
                                        ? this.app.send(new te(e, n))
                                        : 'href' === n
                                        ? (1e5 < r.length && (r = ''),
                                          this.app.send(new Ce(e, n, r, this.app.getBaseHref())))
                                        : this.app.send(new ee(e, n, r)))
                                );
                            'src' !== n &&
                                'srcset' !== n &&
                                'integrity' !== n &&
                                'crossorigin' !== n &&
                                'autocomplete' !== n &&
                                'on' !== n.substr(0, 2) &&
                                (('value' === n &&
                                    Ie(t, HTMLInputElement) &&
                                    'button' !== t.type &&
                                    'reset' !== t.type &&
                                    'submit' !== t.type) ||
                                    (null !== r
                                        ? 'style' === n || ('href' === n && Ie(t, HTMLLinkElement))
                                            ? this.app.send(new Ce(e, n, r, this.app.getBaseHref()))
                                            : (('href' === n || 1e5 < r.length) && (r = ''),
                                              this.app.send(new ee(e, n, r)))
                                        : this.app.send(new te(e, n))));
                        },
                    },
                    {
                        key: 'getInnerTextSecure',
                        value: function (e) {
                            var t = this.app.nodes.getID(e);
                            return t ? this.checkObscure(t, e.innerText) : '';
                        },
                    },
                    {
                        key: 'checkObscure',
                        value: function (e, t) {
                            return this.textMasked.has(e)
                                ? t.replace(
                                      /[^\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/g,
                                      '鈻�'
                                  )
                                : (this.options.obscureTextNumbers && (t = t.replace(/\d/g, '0')),
                                  this.options.obscureTextEmails
                                      ? t.replace(/([^\s]+)@([^\s]+)\.([^\s]+)/g, function () {
                                            return (
                                                R(arguments.length <= 1 ? void 0 : arguments[1]) +
                                                '@' +
                                                R(arguments.length <= 2 ? void 0 : arguments[2]) +
                                                '.' +
                                                R(arguments.length <= 3 ? void 0 : arguments[3])
                                            );
                                        })
                                      : t);
                        },
                    },
                    {
                        key: 'sendNodeData',
                        value: function (e, t, n) {
                            Ie(t, HTMLStyleElement) || Ie(t, SVGStyleElement)
                                ? this.app.send(new we(e, n, this.app.getBaseHref()))
                                : ((n = this.checkObscure(e, n)), this.app.send(new ne(e, n)));
                        },
                    },
                    {
                        key: 'bindNode',
                        value: function (e) {
                            var t = this.app.nodes.registerNode(e),
                                e = t[0];
                            (this.recents[e] = t[1] || this.recents[e] || !1), (this.myNodes[e] = !0);
                        },
                    },
                    {
                        key: 'bindTree',
                        value: function (e) {
                            var t = this;
                            if (je(e)) {
                                this.bindNode(e);
                                for (
                                    var n = document.createTreeWalker(
                                        e,
                                        NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_TEXT,
                                        {
                                            acceptNode: function (e) {
                                                return Me(e) || void 0 !== t.app.nodes.getID(e)
                                                    ? NodeFilter.FILTER_REJECT
                                                    : NodeFilter.FILTER_ACCEPT;
                                            },
                                        },
                                        !1
                                    );
                                    n.nextNode();

                                )
                                    this.bindNode(n.currentNode);
                            }
                        },
                    },
                    {
                        key: 'unbindNode',
                        value: function (e) {
                            e = this.app.nodes.unregisterNode(e);
                            void 0 !== e && !1 === this.recents[e] && this.app.send(new Z(e));
                        },
                    },
                    {
                        key: '_commitNode',
                        value: function (e, t) {
                            if (De(t)) return !0;
                            var n,
                                r = t.parentNode;
                            if (!Ie(t, HTMLHtmlElement) || !this.inUpperContext) {
                                if (null === r) return this.unbindNode(t), !1;
                                if (void 0 === (n = this.app.nodes.getID(r))) return this.unbindNode(t), !1;
                                if (!this.commitNode(n)) return this.unbindNode(t), !1;
                                (this.textMasked.has(n) || (Ie(t, Element) && j(t, 'masked'))) &&
                                    this.textMasked.add(e);
                            }
                            for (var i = t.previousSibling; null !== i; ) {
                                var o = this.app.nodes.getID(i);
                                if (void 0 !== o) {
                                    this.commitNode(o), (this.indexes[e] = this.indexes[o] + 1);
                                    break;
                                }
                                i = i.previousSibling;
                            }
                            null === i && (this.indexes[e] = 0);
                            var s = this.recents[e],
                                a = this.indexes[e];
                            if (void 0 === a) throw 'commitNode: missing node index';
                            if (!0 === s) {
                                if (Ie(t, Element)) {
                                    void 0 !== n && this.app.send(new F(e, n, a, t.tagName, xe(t)));
                                    for (var c = 0; c < t.attributes.length; c++) {
                                        var u = t.attributes[c];
                                        this.sendNodeAttribute(e, t, u.nodeName, u.value);
                                    }
                                } else Ie(t, Text) && (this.app.send(new z(e, n, a)), this.sendNodeData(e, r, t.data));
                                return !0;
                            }
                            !1 === s && void 0 !== n && this.app.send(new G(e, n, a));
                            a = this.attributesList[e];
                            if (void 0 !== a) {
                                if (!Ie(t, Element)) throw 'commitNode: node is not an element';
                                var d,
                                    l = V(a);
                                try {
                                    for (l.s(); !(d = l.n()).done; ) {
                                        var p = d.value;
                                        this.sendNodeAttribute(e, t, p, t.getAttribute(p));
                                    }
                                } catch (e) {
                                    l.e(e);
                                } finally {
                                    l.f();
                                }
                            }
                            if (this.textSet.has(e)) {
                                if (!Ie(t, Text)) throw 'commitNode: node is not a text';
                                this.sendNodeData(e, r, t.data);
                            }
                            return !0;
                        },
                    },
                    {
                        key: 'commitNode',
                        value: function (e) {
                            var t = this.app.nodes.getNode(e);
                            if (void 0 === t) return !1;
                            var n = this.commited[e];
                            return void 0 !== n ? n : (this.commited[e] = this._commitNode(e, t));
                        },
                    },
                    {
                        key: 'commitNodes',
                        value: function () {
                            for (var e, t = 0; t < this.recents.length; t++)
                                this.myNodes[t] &&
                                    (this.commitNode(t),
                                    !0 === this.recents[t] &&
                                        (e = this.app.nodes.getNode(t)) &&
                                        this.app.nodes.callNodeCallbacks(e));
                            this.clear();
                        },
                    },
                    {
                        key: 'observeRoot',
                        value: function (e, t) {
                            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : e;
                            this.observer.observe(e, {
                                childList: !0,
                                attributes: !0,
                                characterData: !0,
                                subtree: !0,
                                attributeOldValue: !1,
                                characterDataOldValue: !1,
                            }),
                                this.bindTree(n),
                                t(this.app.nodes.getID(e)),
                                this.commitNodes();
                        },
                    },
                    {
                        key: 'disconnect',
                        value: function () {
                            this.observer.disconnect(),
                                this.clear(),
                                this.textMasked.clear(),
                                (this.myNodes.length = 0);
                        },
                    },
                ]),
                n
            );
        })(),
        Ne = (function () {
            n(t, Le);
            var e = d(t);
            function t() {
                return H(this, t), e.apply(this, arguments);
            }
            return (
                s(t, [
                    {
                        key: 'observe',
                        value: function (e) {
                            var t = this,
                                n = e.contentDocument,
                                r = this.app.nodes.getID(e);
                            n &&
                                void 0 !== r &&
                                this.observeRoot(n, function (e) {
                                    void 0 !== e
                                        ? t.app.send(Re(r, e))
                                        : console.log('OpenReplay: Iframe document not bound');
                                });
                        },
                    },
                ]),
                t
            );
        })(),
        Ae = (function () {
            n(t, Le);
            var e = d(t);
            function t() {
                return H(this, t), e.apply(this, arguments);
            }
            return (
                s(t, [
                    {
                        key: 'observe',
                        value: function (e) {
                            var t = this,
                                n = e.shadowRoot,
                                r = this.app.nodes.getID(e);
                            n &&
                                void 0 !== r &&
                                this.observeRoot(n, function (e) {
                                    void 0 !== e
                                        ? t.app.send(Re(r, e))
                                        : console.log('OpenReplay: Shadow Root was not bound');
                                });
                        },
                    },
                ]),
                t
            );
        })(),
        Be = Element.prototype.attachShadow,
        Ue = (function () {
            n(i, Le);
            var r = d(i);
            function i(e, t) {
                var n;
                return (
                    H(this, i),
                    ((n = r.call(this, e, Object.assign({ captureIFrames: !1 }, t))).iframeObservers = []),
                    (n.shadowRootObservers = []),
                    n.app.nodes.attachNodeCallback(function (e) {
                        Ie(e, HTMLIFrameElement) &&
                            (n.options.captureIFrames || e.getAttribute('data-openreplay-capture')) &&
                            n.handleIframe(e);
                    }),
                    n.app.nodes.attachNodeCallback(function (e) {
                        Ie(e, Element) && null !== e.shadowRoot && n.handleShadowRoot(e.shadowRoot);
                    }),
                    n
                );
            }
            return (
                s(i, [
                    {
                        key: 'handleIframe',
                        value: function (t) {
                            var n = this,
                                r = null,
                                e = this.app.safe(function () {
                                    var e;
                                    void 0 !== n.app.nodes.getID(t) &&
                                        t.contentWindow !== r &&
                                        (r = t.contentWindow) &&
                                        ((e = new Ne(n.app, n.options, r)), n.iframeObservers.push(e), e.observe(t));
                                });
                            this.app.attachEventListener(t, 'load', e), e();
                        },
                    },
                    {
                        key: 'handleShadowRoot',
                        value: function (e) {
                            var t = new Ae(this.app, this.options, this.context);
                            this.shadowRootObservers.push(t), t.observe(e.host);
                        },
                    },
                    {
                        key: 'observe',
                        value: function () {
                            var e = this,
                                t = this;
                            (Element.prototype.attachShadow = function () {
                                var e = Be.apply(this, arguments);
                                return t.handleShadowRoot(e), e;
                            }),
                                this.observeRoot(
                                    this.context.document,
                                    function () {
                                        e.app.send(new U());
                                    },
                                    this.context.document.documentElement
                                );
                        },
                    },
                    {
                        key: 'disconnect',
                        value: function () {
                            (Element.prototype.attachShadow = Be),
                                this.iframeObservers.forEach(function (e) {
                                    return e.disconnect();
                                }),
                                (this.iframeObservers = []),
                                this.shadowRootObservers.forEach(function (e) {
                                    return e.disconnect();
                                }),
                                (this.shadowRootObservers = []),
                                p(o(i.prototype), 'disconnect', this).call(this);
                        },
                    },
                ]),
                i
            );
        })();
    var Fe = (function () {
            function t(e) {
                H(this, t), (this.app = e), (this.timer = null), (this.callbacks = []);
            }
            return (
                s(t, [
                    {
                        key: 'attach',
                        value: function (e) {
                            var t,
                                n,
                                r,
                                i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                                o = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2],
                                s = 3 < arguments.length ? arguments[3] : void 0;
                            s && (e = e.bind(s)),
                                o && (e = this.app.safe(e)),
                                this.callbacks.unshift(
                                    i
                                        ? ((t = e),
                                          (n = i),
                                          (r = 0),
                                          function () {
                                              r++ >= n && ((r = 0), t());
                                          })
                                        : e
                                );
                        },
                    },
                    {
                        key: 'start',
                        value: function () {
                            var e = this;
                            null === this.timer &&
                                (this.timer = setInterval(function () {
                                    return e.callbacks.forEach(function (e) {
                                        e && e();
                                    });
                                }, 30));
                        },
                    },
                    {
                        key: 'stop',
                        value: function () {
                            null !== this.timer && (clearInterval(this.timer), (this.timer = null));
                        },
                    },
                ]),
                t
            );
        })(),
        ze = K && 'performance' in window && 'memory' in performance ? performance : { memory: {} },
        Ge = K ? 1024 * (navigator.deviceMemory || 0) : 0,
        He = ze.memory.jsHeapSizeLimit || 0;
    var Ve = 'https://api.openreplay.com/ingest',
        We = (function () {
            function o(e, t, n) {
                var r = this;
                H(this, o),
                    (this.messages = []),
                    (this.startCallbacks = []),
                    (this.stopCallbacks = []),
                    (this.commitCallbacks = []),
                    (this._sessionID = null),
                    (this.isActive = !1),
                    (this.version = '3.4.16'),
                    (this.projectKey = e),
                    (this.options = Object.assign(
                        {
                            revID: '',
                            node_id: '__openreplay_id',
                            session_token_key: '__openreplay_token',
                            session_pageno_key: '__openreplay_pageno',
                            local_uuid_key: '__openreplay_uuid',
                            ingestPoint: Ve,
                            resourceBaseHref: null,
                            __is_snippet: !1,
                            __debug_report_edp: null,
                            __debug_log: !1,
                            obscureTextEmails: !0,
                            obscureTextNumbers: !1,
                            captureIFrames: !1,
                        },
                        n
                    )),
                    null != t && sessionStorage.setItem(this.options.session_token_key, t),
                    (this.revID = this.options.revID),
                    (this.nodes = new Oe(this.options.node_id)),
                    (this.observer = new Ue(this, this.options)),
                    (this.ticker = new Fe(this)),
                    this.ticker.attach(function () {
                        return r.commit();
                    });
                try {
                    (this.worker = new Worker(
                        URL.createObjectURL(
                            new Blob(
                                [
                                    '"use strict";function t(t){function s(...s){return new t(...s)}return s.prototype=t.prototype,s}const s=new Map;const i=t(class{constructor(t,s,i){this.pageNo=t,this.firstIndex=s,this.timestamp=i,this._id=80}encode(t){return t.uint(80)&&t.uint(this.pageNo)&&t.uint(this.firstIndex)&&t.int(this.timestamp)}});s.set(80,i);const n=t(class{constructor(t){this.timestamp=t,this._id=0}encode(t){return t.uint(0)&&t.uint(this.timestamp)}});s.set(0,n);const e=t(class{constructor(t,s,i){this.url=t,this.referrer=s,this.navigationStart=i,this._id=4}encode(t){return t.uint(4)&&t.string(this.url)&&t.string(this.referrer)&&t.uint(this.navigationStart)}});s.set(4,e);const r=t(class{constructor(t,s){this.width=t,this.height=s,this._id=5}encode(t){return t.uint(5)&&t.uint(this.width)&&t.uint(this.height)}});s.set(5,r);const o=t(class{constructor(t,s){this.x=t,this.y=s,this._id=6}encode(t){return t.uint(6)&&t.int(this.x)&&t.int(this.y)}});s.set(6,o);const h=t(class{constructor(){this._id=7}encode(t){return t.uint(7)}});s.set(7,h);const c=t(class{constructor(t,s,i,n,e){this.id=t,this.parentID=s,this.index=i,this.tag=n,this.svg=e,this._id=8}encode(t){return t.uint(8)&&t.uint(this.id)&&t.uint(this.parentID)&&t.uint(this.index)&&t.string(this.tag)&&t.boolean(this.svg)}});s.set(8,c);const u=t(class{constructor(t,s,i){this.id=t,this.parentID=s,this.index=i,this._id=9}encode(t){return t.uint(9)&&t.uint(this.id)&&t.uint(this.parentID)&&t.uint(this.index)}});s.set(9,u);const a=t(class{constructor(t,s,i){this.id=t,this.parentID=s,this.index=i,this._id=10}encode(t){return t.uint(10)&&t.uint(this.id)&&t.uint(this.parentID)&&t.uint(this.index)}});s.set(10,a);const d=t(class{constructor(t){this.id=t,this._id=11}encode(t){return t.uint(11)&&t.uint(this.id)}});s.set(11,d);const l=t(class{constructor(t,s,i){this.id=t,this.name=s,this.value=i,this._id=12}encode(t){return t.uint(12)&&t.uint(this.id)&&t.string(this.name)&&t.string(this.value)}});s.set(12,l);const g=t(class{constructor(t,s){this.id=t,this.name=s,this._id=13}encode(t){return t.uint(13)&&t.uint(this.id)&&t.string(this.name)}});s.set(13,g);const f=t(class{constructor(t,s){this.id=t,this.data=s,this._id=14}encode(t){return t.uint(14)&&t.uint(this.id)&&t.string(this.data)}});s.set(14,f);const p=t(class{constructor(t,s,i){this.id=t,this.x=s,this.y=i,this._id=16}encode(t){return t.uint(16)&&t.uint(this.id)&&t.int(this.x)&&t.int(this.y)}});s.set(16,p);const m=t(class{constructor(t,s){this.id=t,this.label=s,this._id=17}encode(t){return t.uint(17)&&t.uint(this.id)&&t.string(this.label)}});s.set(17,m);const _=t(class{constructor(t,s,i){this.id=t,this.value=s,this.mask=i,this._id=18}encode(t){return t.uint(18)&&t.uint(this.id)&&t.string(this.value)&&t.int(this.mask)}});s.set(18,_);const y=t(class{constructor(t,s){this.id=t,this.checked=s,this._id=19}encode(t){return t.uint(19)&&t.uint(this.id)&&t.boolean(this.checked)}});s.set(19,y);const v=t(class{constructor(t,s){this.x=t,this.y=s,this._id=20}encode(t){return t.uint(20)&&t.uint(this.x)&&t.uint(this.y)}});s.set(20,v);const S=t(class{constructor(t,s){this.level=t,this.value=s,this._id=22}encode(t){return t.uint(22)&&t.string(this.level)&&t.string(this.value)}});s.set(22,S);const b=t(class{constructor(t,s,i,n,e,r,o,h,c){this.requestStart=t,this.responseStart=s,this.responseEnd=i,this.domContentLoadedEventStart=n,this.domContentLoadedEventEnd=e,this.loadEventStart=r,this.loadEventEnd=o,this.firstPaint=h,this.firstContentfulPaint=c,this._id=23}encode(t){return t.uint(23)&&t.uint(this.requestStart)&&t.uint(this.responseStart)&&t.uint(this.responseEnd)&&t.uint(this.domContentLoadedEventStart)&&t.uint(this.domContentLoadedEventEnd)&&t.uint(this.loadEventStart)&&t.uint(this.loadEventEnd)&&t.uint(this.firstPaint)&&t.uint(this.firstContentfulPaint)}});s.set(23,b);const x=t(class{constructor(t,s,i){this.speedIndex=t,this.visuallyComplete=s,this.timeToInteractive=i,this._id=24}encode(t){return t.uint(24)&&t.uint(this.speedIndex)&&t.uint(this.visuallyComplete)&&t.uint(this.timeToInteractive)}});s.set(24,x);const E=t(class{constructor(t,s,i){this.name=t,this.message=s,this.payload=i,this._id=25}encode(t){return t.uint(25)&&t.string(this.name)&&t.string(this.message)&&t.string(this.payload)}});s.set(25,E);const k=t(class{constructor(t,s){this.name=t,this.payload=s,this._id=27}encode(t){return t.uint(27)&&t.string(this.name)&&t.string(this.payload)}});s.set(27,k);const I=t(class{constructor(t){this.id=t,this._id=28}encode(t){return t.uint(28)&&t.string(this.id)}});s.set(28,I);const z=t(class{constructor(t){this.id=t,this._id=29}encode(t){return t.uint(29)&&t.string(this.id)}});s.set(29,z);const w=t(class{constructor(t,s){this.key=t,this.value=s,this._id=30}encode(t){return t.uint(30)&&t.string(this.key)&&t.string(this.value)}});s.set(30,w);const T=t(class{constructor(t,s,i){this.id=t,this.rule=s,this.index=i,this._id=37}encode(t){return t.uint(37)&&t.uint(this.id)&&t.string(this.rule)&&t.uint(this.index)}});s.set(37,T);const L=t(class{constructor(t,s){this.id=t,this.index=s,this._id=38}encode(t){return t.uint(38)&&t.uint(this.id)&&t.uint(this.index)}});s.set(38,L);const A=t(class{constructor(t,s,i,n,e,r,o){this.method=t,this.url=s,this.request=i,this.response=n,this.status=e,this.timestamp=r,this.duration=o,this._id=39}encode(t){return t.uint(39)&&t.string(this.method)&&t.string(this.url)&&t.string(this.request)&&t.string(this.response)&&t.uint(this.status)&&t.uint(this.timestamp)&&t.uint(this.duration)}});s.set(39,A);const C=t(class{constructor(t,s,i,n){this.name=t,this.duration=s,this.args=i,this.result=n,this._id=40}encode(t){return t.uint(40)&&t.string(this.name)&&t.uint(this.duration)&&t.string(this.args)&&t.string(this.result)}});s.set(40,C);const M=t(class{constructor(t,s){this.key=t,this.value=s,this._id=41}encode(t){return t.uint(41)&&t.string(this.key)&&t.string(this.value)}});s.set(41,M);const R=t(class{constructor(t){this.type=t,this._id=42}encode(t){return t.uint(42)&&t.string(this.type)}});s.set(42,R);const N=t(class{constructor(t,s,i){this.action=t,this.state=s,this.duration=i,this._id=44}encode(t){return t.uint(44)&&t.string(this.action)&&t.string(this.state)&&t.uint(this.duration)}});s.set(44,N);const D=t(class{constructor(t,s){this.mutation=t,this.state=s,this._id=45}encode(t){return t.uint(45)&&t.string(this.mutation)&&t.string(this.state)}});s.set(45,D);const U=t(class{constructor(t,s){this.type=t,this.payload=s,this._id=46}encode(t){return t.uint(46)&&t.string(this.type)&&t.string(this.payload)}});s.set(46,U);const O=t(class{constructor(t,s,i){this.action=t,this.state=s,this.duration=i,this._id=47}encode(t){return t.uint(47)&&t.string(this.action)&&t.string(this.state)&&t.uint(this.duration)}});s.set(47,O);const q=t(class{constructor(t,s,i,n){this.operationKind=t,this.operationName=s,this.variables=i,this.response=n,this._id=48}encode(t){return t.uint(48)&&t.string(this.operationKind)&&t.string(this.operationName)&&t.string(this.variables)&&t.string(this.response)}});s.set(48,q);const H=t(class{constructor(t,s,i,n){this.frames=t,this.ticks=s,this.totalJSHeapSize=i,this.usedJSHeapSize=n,this._id=49}encode(t){return t.uint(49)&&t.int(this.frames)&&t.int(this.ticks)&&t.uint(this.totalJSHeapSize)&&t.uint(this.usedJSHeapSize)}});s.set(49,H);const P=t(class{constructor(t,s,i,n,e,r,o,h){this.timestamp=t,this.duration=s,this.ttfb=i,this.headerSize=n,this.encodedBodySize=e,this.decodedBodySize=r,this.url=o,this.initiator=h,this._id=53}encode(t){return t.uint(53)&&t.uint(this.timestamp)&&t.uint(this.duration)&&t.uint(this.ttfb)&&t.uint(this.headerSize)&&t.uint(this.encodedBodySize)&&t.uint(this.decodedBodySize)&&t.string(this.url)&&t.string(this.initiator)}});s.set(53,P);const B=t(class{constructor(t,s){this.downlink=t,this.type=s,this._id=54}encode(t){return t.uint(54)&&t.uint(this.downlink)&&t.string(this.type)}});s.set(54,B);const J=t(class{constructor(t){this.hidden=t,this._id=55}encode(t){return t.uint(55)&&t.boolean(this.hidden)}});s.set(55,J);const j=t(class{constructor(t,s,i,n,e,r,o){this.timestamp=t,this.duration=s,this.context=i,this.containerType=n,this.containerSrc=e,this.containerId=r,this.containerName=o,this._id=59}encode(t){return t.uint(59)&&t.uint(this.timestamp)&&t.uint(this.duration)&&t.uint(this.context)&&t.uint(this.containerType)&&t.string(this.containerSrc)&&t.string(this.containerId)&&t.string(this.containerName)}});s.set(59,j);const G=t(class{constructor(t,s,i,n){this.id=t,this.name=s,this.value=i,this.baseURL=n,this._id=60}encode(t){return t.uint(60)&&t.uint(this.id)&&t.string(this.name)&&t.string(this.value)&&t.string(this.baseURL)}});s.set(60,G);const K=t(class{constructor(t,s,i){this.id=t,this.data=s,this.baseURL=i,this._id=61}encode(t){return t.uint(61)&&t.uint(this.id)&&t.string(this.data)&&t.string(this.baseURL)}});s.set(61,K);const X=t(class{constructor(t,s){this.type=t,this.value=s,this._id=63}encode(t){return t.uint(63)&&t.string(this.type)&&t.string(this.value)}});s.set(63,X);const F=t(class{constructor(t,s){this.name=t,this.payload=s,this._id=64}encode(t){return t.uint(64)&&t.string(this.name)&&t.string(this.payload)}});s.set(64,F);const Q=t(class{constructor(){this._id=65}encode(t){return t.uint(65)}});s.set(65,Q);const V=t(class{constructor(t,s,i,n){this.id=t,this.rule=s,this.index=i,this.baseURL=n,this._id=67}encode(t){return t.uint(67)&&t.uint(this.id)&&t.string(this.rule)&&t.uint(this.index)&&t.string(this.baseURL)}});s.set(67,V);const W=t(class{constructor(t,s,i,n){this.id=t,this.hesitationTime=s,this.label=i,this.selector=n,this._id=69}encode(t){return t.uint(69)&&t.uint(this.id)&&t.uint(this.hesitationTime)&&t.string(this.label)&&t.string(this.selector)}});s.set(69,W);const Y=t(class{constructor(t,s){this.frameID=t,this.id=s,this._id=70}encode(t){return t.uint(70)&&t.uint(this.frameID)&&t.uint(this.id)}});s.set(70,Y);const Z="function"==typeof TextEncoder?new TextEncoder:{encode(t){const s=t.length,i=new Uint8Array(3*s);let n=-1;for(var e=0,r=0,o=0;o!==s;){if(e=t.charCodeAt(o),o+=1,e>=55296&&e<=56319){if(o===s){i[n+=1]=239,i[n+=1]=191,i[n+=1]=189;break}if(!((r=t.charCodeAt(o))>=56320&&r<=57343)){i[n+=1]=239,i[n+=1]=191,i[n+=1]=189;continue}if(o+=1,(e=1024*(e-55296)+r-56320+65536)>65535){i[n+=1]=240|e>>>18,i[n+=1]=128|e>>>12&63,i[n+=1]=128|e>>>6&63,i[n+=1]=128|63&e;continue}}e<=127?i[n+=1]=0|e:e<=2047?(i[n+=1]=192|e>>>6,i[n+=1]=128|63&e):(i[n+=1]=224|e>>>12,i[n+=1]=128|e>>>6&63,i[n+=1]=128|63&e)}return i.subarray(0,n+1)}};class tt{constructor(t){this.size=t,this.offset=0,this.checkpointOffset=0,this.data=new Uint8Array(t)}checkpoint(){this.checkpointOffset=this.offset}isEmpty(){return 0===this.offset}boolean(t){return this.data[this.offset++]=+t,this.offset<=this.size}uint(t){for((t<0||t>Number.MAX_SAFE_INTEGER)&&(t=0);t>=128;)this.data[this.offset++]=t%256|128,t=Math.floor(t/128);return this.data[this.offset++]=t,this.offset<=this.size}int(t){return t=Math.round(t),this.uint(t>=0?2*t:-2*t-1)}string(t){const s=Z.encode(t),i=s.byteLength;return!(!this.uint(i)||this.offset+i>this.size)&&(this.data.set(s,this.offset),this.offset+=i,!0)}reset(){this.offset=0,this.checkpointOffset=0}flush(){const t=this.data.slice(0,this.checkpointOffset);return this.reset(),t}}let st=1e6,it=2e5,nt=new tt(it),et="",rt="",ot=0,ht=0,ct=0,ut=0,at=!0;function dt(){return new i(ot,ut,ht).encode(nt)}let lt=null;const gt=[];let ft,pt=!1,mt=0,_t=8e3,yt=10;function vt(){if(at||""===rt||""===et)return;const t=nt.flush();pt?gt.push(t):(pt=!0,function t(s){const i=new XMLHttpRequest;i.open("POST",et+"/v1/web/i",!1),i.setRequestHeader("Authorization","Bearer "+rt),i.onreadystatechange=function(){if(4===this.readyState){if(0==this.status)return;if(this.status>=400)return St(),gt.length=0,401===this.status?void self.postMessage("restart"):void self.postMessage(null);const s=gt.shift();s?t(s):pt=!1}},i.onerror=function(i){if(mt>=yt)return St(),void self.postMessage(null);mt++,setTimeout(()=>t(s),_t)},i.send(s.buffer)}(t)),at=!0,dt()}function St(){et="",rt="",null!==lt&&(clearInterval(lt),lt=null),nt.reset()}self.onmessage=({data:t})=>{if(null!==t)return"stop"===t?(vt(),void St()):Array.isArray(t)?void t.forEach(t=>{const i=new(s.get(t._id));if(Object.assign(i,t),i instanceof n?ht=i.timestamp:i instanceof J&&(i.hidden?ft=setTimeout(()=>self.postMessage("restart"),18e5):clearTimeout(ft)),nt.checkpoint(),!i.encode(nt)&&(vt(),!i.encode(nt)))for(;!i.encode(nt);){if(it===st)return console.warn("OpenReplay: beacon size overflow."),nt.reset(),void dt();it=Math.min(2*it,st),nt=new tt(it),dt()}ut++,at=!1}):(et=t.ingestPoint||et,rt=t.token||rt,ot=t.pageNo||ot,ht=t.startTimestamp||ht,ct=t.timeAdjustment||ct,yt=t.connAttemptCount||yt,_t=t.connAttemptGap||_t,st=t.beaconSizeLimit||st,it=Math.min(st,t.beaconSize||it),nt.isEmpty()&&dt(),void(null===lt&&(lt=setInterval(vt,1e4))));vt()};\n',
                                ],
                                { type: 'text/javascript' }
                            )
                        )
                    )),
                        (this.worker.onerror = function (e) {
                            r._debug('webworker_error', e);
                        });
                    W();
                    this.worker.onmessage = function (e) {
                        e = e.data;
                        null === e ? r.stop() : 'restart' === e && (r.stop(), r.start(!0));
                    };
                    var i = function () {
                        r.worker && r.worker.postMessage(null);
                    };
                    this.attachEventListener(window, 'beforeunload', i, !1),
                        this.attachEventListener(document, 'mouseleave', i, !1, !1),
                        this.attachEventListener(document, 'visibilitychange', i, !1);
                } catch (e) {
                    this._debug('worker_start', e);
                }
            }
            return (
                s(o, [
                    {
                        key: '_debug',
                        value: function (e, t) {
                            null !== this.options.__debug_report_edp &&
                                fetch(this.options.__debug_report_edp, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ context: e, error: ''.concat(t) }),
                                }),
                                this.options.__debug_log && I('OpenReplay error: ', e, t);
                        },
                    },
                    {
                        key: 'send',
                        value: function (e) {
                            var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
                            this.isActive && (this.messages.push(e), t && this.commit());
                        },
                    },
                    {
                        key: 'commit',
                        value: function () {
                            var t = this;
                            this.worker &&
                                this.messages.length &&
                                (this.messages.unshift(new B(W())),
                                this.worker.postMessage(this.messages),
                                this.commitCallbacks.forEach(function (e) {
                                    return e(t.messages);
                                }),
                                (this.messages.length = 0));
                        },
                    },
                    {
                        key: 'attachCommitCallback',
                        value: function (e) {
                            this.commitCallbacks.push(e);
                        },
                    },
                    {
                        key: 'addCommitCallback',
                        value: function (e) {
                            this.attachCommitCallback(e);
                        },
                    },
                    {
                        key: 'safe',
                        value: function (r) {
                            var i = this;
                            return function () {
                                try {
                                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                                        t[n] = arguments[n];
                                    r.apply(this, t);
                                } catch (e) {
                                    i._debug('safe_fn_call', e);
                                }
                            };
                        },
                    },
                    {
                        key: 'attachStartCallback',
                        value: function (e) {
                            this.startCallbacks.push(e);
                        },
                    },
                    {
                        key: 'attachStopCallback',
                        value: function (e) {
                            this.stopCallbacks.push(e);
                        },
                    },
                    {
                        key: 'attachEventListener',
                        value: function (e, t, n) {
                            var r = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3],
                                i = !(4 < arguments.length && void 0 !== arguments[4]) || arguments[4];
                            r && (n = this.safe(n)),
                                this.attachStartCallback(function () {
                                    return e.addEventListener(t, n, i);
                                }),
                                this.attachStopCallback(function () {
                                    return e.removeEventListener(t, n, i);
                                });
                        },
                    },
                    {
                        key: 'getSessionToken',
                        value: function () {
                            var e = sessionStorage.getItem(this.options.session_token_key);
                            if (null !== e) return e;
                        },
                    },
                    {
                        key: 'getSessionID',
                        value: function () {
                            return this._sessionID || void 0;
                        },
                    },
                    {
                        key: 'getHost',
                        value: function () {
                            return new URL(this.options.ingestPoint).hostname;
                        },
                    },
                    {
                        key: 'getProjectKey',
                        value: function () {
                            return this.projectKey;
                        },
                    },
                    {
                        key: 'getBaseHref',
                        value: function () {
                            var e;
                            return 'string' == typeof this.options.resourceBaseHref
                                ? this.options.resourceBaseHref
                                : (l(this.options.resourceBaseHref),
                                  document.baseURI ||
                                      (null ===
                                          (e =
                                              null === (e = document.head) || void 0 === e
                                                  ? void 0
                                                  : e.getElementsByTagName('base')[0]) || void 0 === e
                                          ? void 0
                                          : e.getAttribute('href')) ||
                                      location.origin + location.pathname);
                        },
                    },
                    {
                        key: 'resolveResourceURL',
                        value: function (e) {
                            var t = new URL(this.getBaseHref());
                            return (
                                (t.pathname += '/' + new URL(e).pathname), t.pathname.replace(/\/+/g, '/'), t.toString()
                            );
                        },
                    },
                    {
                        key: 'isServiceURL',
                        value: function (e) {
                            return e.startsWith(this.options.ingestPoint);
                        },
                    },
                    {
                        key: 'active',
                        value: function () {
                            return this.isActive;
                        },
                    },
                    {
                        key: '_start',
                        value: function (e) {
                            var o = this;
                            if (this.isActive) return Promise.reject('Player is already active');
                            if (!this.worker) return Promise.reject('No worker found: perhaps, CSP is not set.');
                            this.isActive = !0;
                            var t = 0,
                                n = sessionStorage.getItem(this.options.session_pageno_key);
                            null != n && ((t = parseInt(n)), t++),
                                sessionStorage.setItem(this.options.session_pageno_key, t.toString());
                            (n = W()),
                                (t = {
                                    ingestPoint: this.options.ingestPoint,
                                    pageNo: t,
                                    startTimestamp: n,
                                    connAttemptCount: this.options.connAttemptCount,
                                    connAttemptGap: this.options.connAttemptGap,
                                });
                            return (
                                this.worker.postMessage(t),
                                window
                                    .fetch(this.options.ingestPoint + '/v1/web/start', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            token: sessionStorage.getItem(this.options.session_token_key),
                                            userUUID: localStorage.getItem(this.options.local_uuid_key),
                                            projectKey: this.projectKey,
                                            revID: this.revID,
                                            timestamp: n,
                                            trackerVersion: this.version,
                                            isSnippet: this.options.__is_snippet,
                                            deviceMemory: Ge,
                                            jsHeapSizeLimit: He,
                                            reset: e,
                                        }),
                                    })
                                    .then(function (t) {
                                        return 200 === t.status
                                            ? t.json()
                                            : t.text().then(function (e) {
                                                  throw new Error('Server error: '.concat(t.status, '. ').concat(e));
                                              });
                                    })
                                    .then(function (e) {
                                        var t = e.token,
                                            n = e.userUUID,
                                            r = e.sessionID,
                                            i = e.beaconSizeLimit;
                                        if (
                                            'string' != typeof t ||
                                            'string' != typeof n ||
                                            ('number' != typeof i && void 0 !== i)
                                        )
                                            throw new Error('Incorrect server response: '.concat(JSON.stringify(e)));
                                        if (
                                            (sessionStorage.setItem(o.options.session_token_key, t),
                                            localStorage.setItem(o.options.local_uuid_key, n),
                                            'string' == typeof r && (o._sessionID = r),
                                            !o.worker)
                                        )
                                            throw new Error(
                                                'no worker found after start request (this might not happen)'
                                            );
                                        o.worker.postMessage({ token: t, beaconSizeLimit: i }),
                                            o.startCallbacks.forEach(function (e) {
                                                return e();
                                            }),
                                            o.observer.observe(),
                                            o.ticker.start(),
                                            x('OpenReplay tracking started.');
                                        r = { sessionToken: t, userUUID: n, sessionID: r };
                                        return 'function' == typeof o.options.onStart && o.options.onStart(r), r;
                                    })
                                    .catch(function (e) {
                                        throw (
                                            (sessionStorage.removeItem(o.options.session_token_key),
                                            o.stop(),
                                            I('OpenReplay was unable to start. ', e),
                                            o._debug('session_start', e),
                                            e)
                                        );
                                    })
                            );
                        },
                    },
                    {
                        key: 'start',
                        value: function () {
                            var n = this,
                                r = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
                            return document.hidden
                                ? new Promise(function (e) {
                                      function t() {
                                          document.hidden ||
                                              (document.removeEventListener('visibilitychange', t), e(n._start(r)));
                                      }
                                      document.addEventListener('visibilitychange', t);
                                  })
                                : this._start(r);
                        },
                    },
                    {
                        key: 'stop',
                        value: function () {
                            if (this.isActive)
                                try {
                                    this.worker && this.worker.postMessage('stop'),
                                        this.observer.disconnect(),
                                        this.nodes.clear(),
                                        this.ticker.stop(),
                                        this.stopCallbacks.forEach(function (e) {
                                            return e();
                                        }),
                                        x('OpenReplay tracking stopped.');
                                } finally {
                                    this.isActive = !1;
                                }
                        },
                    },
                ]),
                o
            );
        })();
    var Je =
        K && 'InstallTrigger' in window
            ? function (e) {
                  return e.message + '\n' + e.stack;
              }
            : function (e) {
                  return e.stack || e.message;
              };
    function Ke(e) {
        return void 0 === e
            ? 'undefined'
            : null === e
            ? 'null'
            : e instanceof Error
            ? Je(e)
            : Array.isArray(e)
            ? 'Array('.concat(e.length, ')')
            : e.toString();
    }
    function qe(e) {
        if (void 0 === e) return 'undefined';
        if (null === e) return 'null';
        if (e instanceof Error) return Je(e);
        if (Array.isArray(e)) {
            var t = e.length,
                n = e.slice(0, 10).map(Ke).join(', ');
            return 'Array('.concat(t, ')[').concat(n, ']');
        }
        if ('object' !== l(e)) return e.toString();
        var r,
            i = [],
            o = 0;
        for (r in e) {
            if (10 == ++o) break;
            var s = e[r];
            i.push(r + ': ' + Ke(s));
        }
        return '{' + i.join(', ') + '}';
    }
    function Ye(i) {
        return (
            'string' == typeof i[0] &&
                i.unshift(
                    i.shift().replace(/%(o|s|f|d|i)/g, function (e, t) {
                        var n,
                            r = i.shift();
                        if (void 0 === r) return e;
                        switch (t) {
                            case 'o':
                                return qe(r);
                            case 's':
                                return Ke(r);
                            case 'f':
                                return 'number' != typeof (n = r) ? 'NaN' : n.toString();
                            case 'd':
                            case 'i':
                                return 'number' != typeof (n = r) ? 'NaN' : Math.floor(n).toString();
                            default:
                                return e;
                        }
                    })
                ),
            i.map(qe).join(' ')
        );
    }
    var Xe = ['log', 'info', 'warn', 'error', 'debug', 'assert'];
    var Qe = e(function (e, t) {
            e.exports = (function () {
                function n(e) {
                    return !isNaN(parseFloat(e)) && isFinite(e);
                }
                function r(e) {
                    return e.charAt(0).toUpperCase() + e.substring(1);
                }
                function e(e) {
                    return function () {
                        return this[e];
                    };
                }
                var t = ['isConstructor', 'isEval', 'isNative', 'isToplevel'],
                    i = ['columnNumber', 'lineNumber'],
                    o = ['fileName', 'functionName', 'source'],
                    s,
                    a,
                    c = t.concat(i, o, ['args'], ['evalOrigin']);
                function l(e) {
                    if (!e) return;
                    for (var t = 0; t < c.length; t++) if (e[c[t]] !== undefined) this['set' + r(c[t])](e[c[t]]);
                }
                (l.prototype = {
                    getArgs: function () {
                        return this.args;
                    },
                    setArgs: function (e) {
                        if (Object.prototype.toString.call(e) !== '[object Array]')
                            throw new TypeError('Args must be an Array');
                        this.args = e;
                    },
                    getEvalOrigin: function () {
                        return this.evalOrigin;
                    },
                    setEvalOrigin: function (e) {
                        if (e instanceof l) this.evalOrigin = e;
                        else if (e instanceof Object) this.evalOrigin = new l(e);
                        else throw new TypeError('Eval Origin must be an Object or StackFrame');
                    },
                    toString: function () {
                        var e = this.getFileName() || '';
                        var t = this.getLineNumber() || '';
                        var n = this.getColumnNumber() || '';
                        var r = this.getFunctionName() || '';
                        if (this.getIsEval()) {
                            if (e) return '[eval] (' + e + ':' + t + ':' + n + ')';
                            return '[eval]:' + t + ':' + n;
                        }
                        if (r) return r + ' (' + e + ':' + t + ':' + n + ')';
                        return e + ':' + t + ':' + n;
                    },
                }),
                    (l.fromString = function e(t) {
                        var n = t.indexOf('(');
                        var r = t.lastIndexOf(')');
                        var i = t.substring(0, n);
                        var o = t.substring(n + 1, r).split(',');
                        var s = t.substring(r + 1);
                        if (s.indexOf('@') === 0) {
                            var a = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(s, '');
                            var c = a[1];
                            var u = a[2];
                            var d = a[3];
                        }
                        return new l({
                            functionName: i,
                            args: o || undefined,
                            fileName: c,
                            lineNumber: u || undefined,
                            columnNumber: d || undefined,
                        });
                    });
                for (var u = 0; u < t.length; u++) {
                    l.prototype['get' + r(t[u])] = e(t[u]);
                    l.prototype['set' + r(t[u])] = (function (t) {
                        return function (e) {
                            this[t] = Boolean(e);
                        };
                    })(t[u]);
                }
                for (var d = 0; d < i.length; d++) {
                    l.prototype['get' + r(i[d])] = e(i[d]);
                    l.prototype['set' + r(i[d])] = (function (t) {
                        return function (e) {
                            if (!n(e)) throw new TypeError(t + ' must be a Number');
                            this[t] = Number(e);
                        };
                    })(i[d]);
                }
                for (var p = 0; p < o.length; p++) {
                    l.prototype['get' + r(o[p])] = e(o[p]);
                    l.prototype['set' + r(o[p])] = (function (t) {
                        return function (e) {
                            this[t] = String(e);
                        };
                    })(o[p]);
                }
                return l;
            })();
        }),
        $e = e(function (e, t) {
            e.exports = (function (c) {
                var r = /(^|@)\S+:\d+/;
                var i = /^\s*at .*(\S+:\d+|\(native\))/m;
                var o = /^(eval@)?(\[native code])?$/;
                return {
                    parse: function e(t) {
                        if (typeof t.stacktrace !== 'undefined' || typeof t['opera#sourceloc'] !== 'undefined')
                            return this.parseOpera(t);
                        else if (t.stack && t.stack.match(i)) return this.parseV8OrIE(t);
                        else if (t.stack) return this.parseFFOrSafari(t);
                        else throw new Error('Cannot parse given Error object');
                    },
                    extractLocation: function e(t) {
                        if (t.indexOf(':') === -1) return [t];
                        var n = /(.+?)(?::(\d+))?(?::(\d+))?$/;
                        var r = n.exec(t.replace(/[()]/g, ''));
                        return [r[1], r[2] || undefined, r[3] || undefined];
                    },
                    parseV8OrIE: function e(t) {
                        var n = t.stack.split('\n').filter(function (e) {
                            return !!e.match(i);
                        }, this);
                        return n.map(function (e) {
                            if (e.indexOf('(eval ') > -1)
                                e = e.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
                            var t = e.replace(/^\s+/, '').replace(/\(eval code/g, '(');
                            var n = t.match(/ (\((.+):(\d+):(\d+)\)$)/);
                            t = n ? t.replace(n[0], '') : t;
                            var r = t.split(/\s+/).slice(1);
                            var i = this.extractLocation(n ? n[1] : r.pop());
                            var o = r.join(' ') || undefined;
                            var s = ['eval', '<anonymous>'].indexOf(i[0]) > -1 ? undefined : i[0];
                            return new c({
                                functionName: o,
                                fileName: s,
                                lineNumber: i[1],
                                columnNumber: i[2],
                                source: e,
                            });
                        }, this);
                    },
                    parseFFOrSafari: function e(t) {
                        var n = t.stack.split('\n').filter(function (e) {
                            return !e.match(o);
                        }, this);
                        return n.map(function (e) {
                            if (e.indexOf(' > eval') > -1)
                                e = e.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
                            if (e.indexOf('@') === -1 && e.indexOf(':') === -1) return new c({ functionName: e });
                            else {
                                var t = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                                var n = e.match(t);
                                var r = n && n[1] ? n[1] : undefined;
                                var i = this.extractLocation(e.replace(t, ''));
                                return new c({
                                    functionName: r,
                                    fileName: i[0],
                                    lineNumber: i[1],
                                    columnNumber: i[2],
                                    source: e,
                                });
                            }
                        }, this);
                    },
                    parseOpera: function e(t) {
                        if (
                            !t.stacktrace ||
                            (t.message.indexOf('\n') > -1 &&
                                t.message.split('\n').length > t.stacktrace.split('\n').length)
                        )
                            return this.parseOpera9(t);
                        else if (!t.stack) return this.parseOpera10(t);
                        else return this.parseOpera11(t);
                    },
                    parseOpera9: function e(t) {
                        var n = /Line (\d+).*script (?:in )?(\S+)/i;
                        var r = t.message.split('\n');
                        var i = [];
                        for (var o = 2, s = r.length; o < s; o += 2) {
                            var a = n.exec(r[o]);
                            if (a) i.push(new c({ fileName: a[2], lineNumber: a[1], source: r[o] }));
                        }
                        return i;
                    },
                    parseOpera10: function e(t) {
                        var n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
                        var r = t.stacktrace.split('\n');
                        var i = [];
                        for (var o = 0, s = r.length; o < s; o += 2) {
                            var a = n.exec(r[o]);
                            if (a)
                                i.push(
                                    new c({
                                        functionName: a[3] || undefined,
                                        fileName: a[2],
                                        lineNumber: a[1],
                                        source: r[o],
                                    })
                                );
                        }
                        return i;
                    },
                    parseOpera11: function e(t) {
                        var n = t.stack.split('\n').filter(function (e) {
                            return !!e.match(r) && !e.match(/^Error created at/);
                        }, this);
                        return n.map(function (e) {
                            var t = e.split('@');
                            var n = this.extractLocation(t.pop());
                            var r = t.shift() || '';
                            var i =
                                r.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^)]*\)/g, '') ||
                                undefined;
                            var o;
                            if (r.match(/\(([^)]*)\)/)) o = r.replace(/^[^(]+\(([^)]*)\)$/, '$1');
                            var s = o === undefined || o === '[arguments not available]' ? undefined : o.split(',');
                            return new c({
                                functionName: i,
                                args: s,
                                fileName: n[0],
                                lineNumber: n[1],
                                columnNumber: n[2],
                                source: e,
                            });
                        }, this);
                    },
                };
            })(Qe);
        });
    function Ze(e) {
        return [{ columnNumber: e.colno, lineNumber: e.lineno, fileName: e.filename, functionName: '', source: '' }];
    }
    function et(e, t) {
        try {
            t = $e.parse(e);
        } catch (e) {}
        return new le(e.name, e.message, JSON.stringify(t));
    }
    function tt(t) {
        if (t instanceof ErrorEvent) {
            if (t.error instanceof Error) return et(t.error, Ze(t));
            var e = h(t.message.split(':'), 2),
                n = e[0],
                e = e[1];
            return e || ((n = 'Error'), (e = t.message)), new le(n, e, JSON.stringify(Ze(t)));
        }
        if ('PromiseRejectionEvent' in window && t instanceof PromiseRejectionEvent) {
            if (t.reason instanceof Error) return et(t.reason, []);
            var r;
            try {
                r = JSON.stringify(t.reason);
            } catch (e) {
                r = String(t.reason);
            }
            return new le('Unhandled Promise Rejection', r, '[]');
        }
        return null;
    }
    function nt(e) {
        if (e instanceof HTMLInputElement) {
            e = e.type;
            return (
                'text' === e || 'password' === e || 'email' === e || 'search' === e || 'number' === e || 'range' === e
            );
        }
    }
    function rt(e) {
        if (e instanceof HTMLInputElement) {
            e = e.type;
            return 'checkbox' === e || 'radio' === e;
        }
    }
    var it =
        K && 'labels' in HTMLInputElement.prototype
            ? function (e) {
                  for (var t = e; null !== (t = t.parentNode); ) if ('LABEL' === t.nodeName) return t;
                  e = e.labels;
                  if (null !== e && 1 === e.length) return e[0];
              }
            : function (e) {
                  for (var t = e; null !== (t = t.parentNode); ) if ('LABEL' === t.nodeName) return t;
                  e = e.id;
                  if (e) {
                      e = document.querySelectorAll('label[for="' + e + '"]');
                      if (null !== e && 1 === e.length) return e[0];
                  }
              };
    function ot(e) {
        var t,
            n = D(e);
        return O((n = null === n ? (void 0 === (t = it(e)) ? e.placeholder || e.name : t.innerText) : n)).slice(0, 100);
    }
    function st(o, e) {
        var s = Object.assign({ obscureInputNumbers: !0, obscureInputEmails: !0, defaultInputMode: 0 }, e);
        function i(e, t) {
            var n = t.value,
                r = s.defaultInputMode;
            'password' === t.type || j(t, 'hidden')
                ? (r = 2)
                : (j(t, 'obscured') ||
                      (0 === r &&
                          ((s.obscureInputNumbers && /\d\d\d\d/.test(n)) ||
                              (s.obscureInputEmails && ('email' === t.type || ~n.indexOf('@')))))) &&
                  (r = 1);
            var i = 0;
            switch (r) {
                case 2:
                    (i = -1), (n = '');
                    break;
                case 1:
                    (i = n.length), (n = '');
            }
            o.send(new oe(e, n, i));
        }
        var a = new Map(),
            r = new Map(),
            c = new Set();
        o.attachStopCallback(function () {
            a.clear(), r.clear(), c.clear();
        }),
            o.ticker.attach(function () {
                a.forEach(function (e, t) {
                    var n,
                        r = o.nodes.getNode(t);
                    nt(r)
                        ? e !== r.value &&
                          (a.set(t, r.value),
                          c.has(t) || (c.add(t), (n = t), '' !== (e = ot((e = r))) && o.send(new ie(n, e))),
                          i(t, r))
                        : a.delete(t);
                }),
                    r.forEach(function (e, t) {
                        var n = o.nodes.getNode(t);
                        rt(n) ? e !== n.checked && (r.set(t, n.checked), o.send(new se(t, n.checked))) : r.delete(t);
                    });
            }),
            o.ticker.attach(Set.prototype.clear, 100, !1, c),
            o.nodes.attachNodeCallback(
                o.safe(function (e) {
                    var t = o.nodes.getID(e);
                    if (void 0 !== t)
                        return nt(e)
                            ? (a.set(t, e.value), void i(t, e))
                            : void (rt(e) && (r.set(t, e.checked), o.send(new se(t, e.checked))));
                })
            );
    }
    function at(e) {
        return e instanceof Element
            ? (function (e) {
                  var t = e;
                  for (; null !== t && t !== document.documentElement; ) {
                      if (j(t, 'masked')) return null;
                      t = t.parentElement;
                  }
                  if (e instanceof SVGElement)
                      for (var n = e.ownerSVGElement; null !== n; ) n = (e = n).ownerSVGElement;
                  t = e;
                  for (; null !== t && t !== document.documentElement; ) {
                      var r = t.tagName.toUpperCase();
                      if ('LABEL' === r) return null;
                      if ('INPUT' === r) return t;
                      if (
                          'BUTTON' === r ||
                          'A' === r ||
                          'LI' === r ||
                          null != t.onclick ||
                          'button' === t.getAttribute('role') ||
                          null !== D(t)
                      )
                          return t;
                      t = t.parentElement;
                  }
                  return e === document.documentElement ? null : e;
              })(e)
            : null;
    }
    function ct(i) {
        var t = -1,
            n = -1,
            r = !1,
            o = null,
            s = 0;
        i.attachStopCallback(function () {
            (r = !(n = t = -1)), (o = null);
        });
        function a() {
            r && (i.send(new ae(t, n)), (r = !1));
        }
        var c = {};
        function u(e, t) {
            return (c[e] =
                c[e] ||
                (function (e) {
                    var t = e,
                        n = null;
                    do {
                        if (t.id) return '#'.concat(t.id) + (n ? ' > '.concat(n) : '');
                        if (
                            ((n =
                                t.className
                                    .split(' ')
                                    .map(function (e) {
                                        return e.trim();
                                    })
                                    .filter(function (e) {
                                        return '' !== e;
                                    })
                                    .reduce(function (e, t) {
                                        return ''.concat(e, '.').concat(t);
                                    }, t.tagName.toLowerCase()) + (n ? ' > '.concat(n) : '')),
                            t === document.body)
                        )
                            return n;
                    } while ((t = t.parentElement) !== document.body && null !== t);
                    return n;
                })(t));
        }
        i.attachEventListener(document.documentElement, 'mouseover', function (e) {
            e = at(e.target);
            e !== o && ((o = e), (s = performance.now()));
        }),
            i.attachEventListener(
                document,
                'mousemove',
                function (e) {
                    (t = e.clientX), (n = e.clientY), (r = !0);
                },
                !1
            ),
            i.attachEventListener(document, 'click', function (e) {
                var t,
                    n,
                    r = at(e.target);
                (e.clientX || e.clientY) &&
                    null !== r &&
                    (void 0 !== (t = i.nodes.getID(r)) &&
                        (a(),
                        i.send(
                            new Pe(
                                t,
                                o === r ? Math.round(performance.now() - s) : 0,
                                null !== (e = D((n = r)))
                                    ? e
                                    : 'INPUT' === (e = n.tagName.toUpperCase())
                                    ? ot(n)
                                    : 'BUTTON' !== e &&
                                      'A' !== e &&
                                      'LI' !== e &&
                                      null == n.onclick &&
                                      'button' !== n.getAttribute('role')
                                    ? ''
                                    : O(i.observer.getInnerTextSecure(n)).slice(0, 100),
                                u(t, r)
                            ),
                            !0
                        )),
                    (o = null));
            }),
            i.ticker.attach(a, 10);
    }
    function ut(c, e) {
        var t,
            n,
            u,
            d,
            l,
            r,
            i,
            o,
            s,
            a,
            p = Object.assign(
                { captureResourceTimings: !0, capturePageLoadTimings: !0, capturePageRenderTimings: !0 },
                e
            );
        function h(e) {
            e.duration < 0 ||
                !J(e.name) ||
                c.isServiceURL(e.name) ||
                (null !== n && (n[e.name] = e.startTime + e.duration),
                (e = new ge(
                    e.startTime + performance.timing.navigationStart,
                    e.duration,
                    e.responseStart && e.startTime ? e.responseStart - e.startTime : 0,
                    e.transferSize > e.encodedBodySize ? e.transferSize - e.encodedBodySize : 0,
                    e.encodedBodySize || 0,
                    e.decodedBodySize || 0,
                    e.name,
                    e.initiatorType
                )),
                c.active() ? c.send(e) : t.push(e));
        }
        'PerformanceObserver' in window || (p.captureResourceTimings = !1),
            p.captureResourceTimings &&
                ((t = []),
                c.attachStartCallback(function () {
                    t.forEach(function (e) {
                        return c.send(e);
                    });
                }),
                (n = {}),
                (e = new PerformanceObserver(function (e) {
                    return e.getEntries().forEach(h);
                })),
                performance.getEntriesByType('resource').forEach(h),
                e.observe({ entryTypes: ['resource'] }),
                (d = u = 0),
                p.capturePageLoadTimings &&
                    ((l = !1),
                    c.ticker.attach(function () {
                        var e, t, n, r, i, o, s, a;
                        l ||
                            ((0 !== u && 0 !== d) ||
                                performance.getEntriesByType('paint').forEach(function (e) {
                                    var t = e.name,
                                        n = e.startTime;
                                    switch (t) {
                                        case 'first-paint':
                                            u = n;
                                            break;
                                        case 'first-contentful-paint':
                                            d = n;
                                    }
                                }),
                            (performance.timing.loadEventEnd || 3e4 < performance.now()) &&
                                ((l = !0),
                                (e = (a = performance.timing).navigationStart),
                                (t = a.requestStart),
                                (n = a.responseStart),
                                (r = a.responseEnd),
                                (i = a.domContentLoadedEventStart),
                                (o = a.domContentLoadedEventEnd),
                                (s = a.loadEventStart),
                                (a = a.loadEventEnd),
                                c.send(
                                    new ue(
                                        t - e || 0,
                                        n - e || 0,
                                        r - e || 0,
                                        i - e || 0,
                                        o - e || 0,
                                        s - e || 0,
                                        a - e || 0,
                                        u,
                                        d
                                    )
                                )));
                    }, 30)),
                p.capturePageRenderTimings &&
                    ((o = i = r = 0),
                    (s = null),
                    (a = !1),
                    c.ticker.attach(function () {
                        var e, t;
                        a ||
                            ((t = performance.now()),
                            null !== n &&
                                1e3 <
                                    t -
                                        (r = Math.max.apply(
                                            null,
                                            Object.keys(n).map(function (e) {
                                                return n[e];
                                            })
                                        )) &&
                                ((s = (function (e) {
                                    for (
                                        var t = [],
                                            n = document.getElementsByTagName('*'),
                                            r = /url\(("[^"]*"|'[^']*'|[^)]*)\)/i,
                                            i = 0;
                                        i < n.length;
                                        i++
                                    ) {
                                        var o,
                                            s,
                                            a,
                                            c = n[i],
                                            u = '';
                                        (u = c instanceof HTMLImageElement ? c.currentSrc || c.src : u) ||
                                            !(a = getComputedStyle(c).getPropertyValue('background-image')) ||
                                            (null !== (s = r.exec(a)) &&
                                                ((u = s[1]).startsWith('"') || u.startsWith("'")) &&
                                                (u = u.substr(1, u.length - 2))),
                                            !u ||
                                                (void 0 !== (o = 'data:image' === u.substr(0, 10) ? 0 : e[u]) &&
                                                    ((a = c.getBoundingClientRect()),
                                                    (s = Math.max(a.top, 0)),
                                                    (u = Math.max(a.left, 0)),
                                                    (c = Math.min(
                                                        a.bottom,
                                                        window.innerHeight ||
                                                            (document.documentElement &&
                                                                document.documentElement.clientHeight) ||
                                                            0
                                                    )),
                                                    (a = Math.min(
                                                        a.right,
                                                        window.innerWidth ||
                                                            (document.documentElement &&
                                                                document.documentElement.clientWidth) ||
                                                            0
                                                    )),
                                                    c <= s || a <= u || t.push({ time: o, area: (c - s) * (a - u) })));
                                    }
                                    return t;
                                })(n)),
                                (n = null)),
                            null !== o && (o = 5e3 < t - (i = 50 < t - o ? t : i) ? null : t),
                            ((null !== s && null === o) || 3e4 < t) &&
                                ((a = !0),
                                (e =
                                    (n = null) === s
                                        ? 0
                                        : (function (e, t) {
                                              for (
                                                  var n =
                                                          (Math.max(
                                                              (document.documentElement &&
                                                                  document.documentElement.clientWidth) ||
                                                                  0,
                                                              window.innerWidth || 0
                                                          ) *
                                                              Math.max(
                                                                  (document.documentElement &&
                                                                      document.documentElement.clientHeight) ||
                                                                      0,
                                                                  window.innerHeight || 0
                                                              )) /
                                                          10,
                                                      r = n * e,
                                                      i = 0;
                                                  i < t.length;
                                                  i++
                                              ) {
                                                  var o = t[i],
                                                      s = o.time,
                                                      o = o.area;
                                                  (n += o), (r += o * (e < s ? s : e));
                                              }
                                              return 0 === n ? 0 : r / n;
                                          })(d || u, s)),
                                (t =
                                    null === o
                                        ? Math.max(
                                              i,
                                              d,
                                              performance.timing.domContentLoadedEventEnd -
                                                  performance.timing.navigationStart || 0
                                          )
                                        : 0),
                                c.send(new de(e, r < d ? d : r, t))));
                    })));
    }
    var dt = '/installation/setup-or';
    var lt,
        pt,
        ht = (function () {
            function G(e) {
                var t,
                    s,
                    a,
                    c,
                    n,
                    r,
                    i,
                    o,
                    u,
                    d,
                    l,
                    p,
                    h,
                    f,
                    m,
                    v,
                    y,
                    g,
                    b,
                    _,
                    S,
                    C,
                    w,
                    k,
                    T,
                    E,
                    P,
                    R,
                    O,
                    x,
                    I,
                    M,
                    D,
                    j,
                    L,
                    N,
                    A,
                    B,
                    U,
                    F = this;
                function z(e) {
                    var t = '',
                        n = '',
                        r = '',
                        i = '',
                        o = e.attribution[0];
                    null != o &&
                        ((t = o.containerType), (i = o.containerName), (r = o.containerId), (n = o.containerSrc)),
                        s.send(
                            new Se(
                                e.startTime + performance.timing.navigationStart,
                                e.duration,
                                Math.max(a.indexOf(e.name), 0),
                                Math.max(c.indexOf(t), 0),
                                i,
                                r,
                                n
                            )
                        );
                }
                H(this, G),
                    (this.options = e),
                    (this.app = null),
                    (this.handleError = function (e) {
                        null !== F.app &&
                            (e instanceof Error
                                ? F.app.send(et(e, []))
                                : !(
                                      e instanceof ErrorEvent ||
                                      ('PromiseRejectionEvent' in window && e instanceof PromiseRejectionEvent)
                                  ) ||
                                  (null != (e = tt(e)) && F.app.send(e)));
                    }),
                    K &&
                        (function (e) {
                            if (null != e) {
                                if ('string' != typeof e.projectKey)
                                    if ('number' != typeof e.projectKey) {
                                        if ('number' != typeof e.projectID)
                                            return void console.error(
                                                'OpenReplay: projectKey is missing or wrong type (string is expected). Please, check '
                                                    .concat(q)
                                                    .concat(dt, ' for more information.')
                                            );
                                        (e.projectKey = e.projectID.toString()),
                                            Y('`projectID` option', '`projectKey` option', dt);
                                    } else
                                        console.warn('OpenReplay: projectKey is expected to have a string type.'),
                                            (e.projectKey = e.projectKey.toString());
                                return (
                                    'string' != typeof e.sessionToken &&
                                        null != e.sessionToken &&
                                        console.warn(
                                            'OpenReplay: invalid options argument type. Please, check documentation on '
                                                .concat(q)
                                                .concat(dt)
                                        ),
                                    1
                                );
                            }
                            console.error(
                                'OpenReplay: invalid options argument type. Please, check documentation on '
                                    .concat(q)
                                    .concat(dt)
                            );
                        })(e) &&
                        (window.__OPENREPLAY__
                            ? console.error('OpenReplay: one tracker instance has been initialised already')
                            : e.__DISABLE_SECURE_MODE || 'https:' === location.protocol
                            ? ((t = e.respectDoNotTrack && ('1' == navigator.doNotTrack || '1' == window.doNotTrack)),
                              (this.app =
                                  !t &&
                                  'Map' in window &&
                                  'Set' in window &&
                                  'MutationObserver' in window &&
                                  'performance' in window &&
                                  'timing' in performance &&
                                  'startsWith' in String.prototype &&
                                  'Blob' in window &&
                                  'Worker' in window
                                      ? new We(e.projectKey, e.sessionToken, e)
                                      : null),
                              null !== this.app
                                  ? ((M = this.app),
                                    (N = performance.timing.navigationStart),
                                    (A = M.safe(function () {
                                        var e = document.URL;
                                        e !== D && ((D = e), M.send(new X(D, document.referrer, N)), (N = 0));
                                    })),
                                    (B = M.safe(function () {
                                        var e = window,
                                            t = e.innerWidth,
                                            e = e.innerHeight;
                                        (t === j && e === L) || ((j = t), (L = e), M.send(new Q(j, L)));
                                    })),
                                    (U =
                                        void 0 === document.hidden
                                            ? Function.prototype
                                            : M.safe(function () {
                                                  return M.send(new _e(document.hidden));
                                              })),
                                    M.attachStartCallback(function () {
                                        (D = ''), (j = L = -1), A(), B(), U();
                                    }),
                                    void 0 !== document.hidden &&
                                        M.attachEventListener(document, 'visibilitychange', U, !1, !1),
                                    M.ticker.attach(A, 1, !1),
                                    M.ticker.attach(B, 5, !1),
                                    null !== (P = this.app) &&
                                        (window.CSSStyleSheet
                                            ? ((R = P.safe(function (e, t, n) {
                                                  var r =
                                                      'string' == typeof n
                                                          ? function (e) {
                                                                return P.send(new Ee(e, n, t, P.getBaseHref()));
                                                            }
                                                          : function (e) {
                                                                return P.send(new ve(e, t));
                                                            };
                                                  if (null == e.ownerNode) throw new Error('Owner Node not found');
                                                  e = P.nodes.getID(e.ownerNode);
                                                  void 0 !== e && r(e);
                                              })),
                                              (O = CSSStyleSheet.prototype),
                                              (x = O.insertRule),
                                              (I = O.deleteRule),
                                              (CSSStyleSheet.prototype.insertRule = function (e) {
                                                  var t =
                                                      1 < arguments.length && void 0 !== arguments[1]
                                                          ? arguments[1]
                                                          : 0;
                                                  return R(this, t, e), x.call(this, e, t);
                                              }),
                                              (CSSStyleSheet.prototype.deleteRule = function (e) {
                                                  return R(this, e), I.call(this, e);
                                              }),
                                              P.nodes.attachNodeCallback(function (e) {
                                                  if (
                                                      e instanceof HTMLStyleElement &&
                                                      e.sheet instanceof CSSStyleSheet &&
                                                      !(null !== e.textContent && 0 < e.textContent.trim().length)
                                                  )
                                                      for (var t = e.sheet.cssRules, n = 0; n < t.length; n++)
                                                          R(e.sheet, n, t[n].cssText);
                                              }))
                                            : P.send(new ke('no_stylesheet_prototype_in_window', ''))),
                                    (k = this.app),
                                    void 0 !==
                                        (E =
                                            navigator.connection ||
                                            navigator.mozConnection ||
                                            navigator.webkitConnection) &&
                                        ((T = function () {
                                            return k.send(new be(Math.round(1e3 * E.downlink), E.type || 'unknown'));
                                        })(),
                                        E.addEventListener('change', T)),
                                    (b = this.app),
                                    (O = e),
                                    (w = Object.assign({ consoleMethods: Xe, consoleThrottling: 30 }, O)),
                                    Array.isArray(w.consoleMethods) &&
                                        0 !== w.consoleMethods.length &&
                                        ((_ = b.safe(function (e, t) {
                                            return b.send(new ce(e, Ye(t)));
                                        })),
                                        (O = function () {
                                            S = 0;
                                        }),
                                        b.attachStartCallback(O),
                                        b.ticker.attach(O, 33, !1),
                                        (C = function (e) {
                                            return w.consoleMethods.forEach(function (r) {
                                                var i;
                                                -1 !== Xe.indexOf(r)
                                                    ? ((i = e[r]),
                                                      (e[r] = function () {
                                                          for (
                                                              var e = arguments.length, t = new Array(e), n = 0;
                                                              n < e;
                                                              n++
                                                          )
                                                              t[n] = arguments[n];
                                                          i.apply(this, t), S++ > w.consoleThrottling || _(r, t);
                                                      }))
                                                    : e.error(
                                                          'OpenReplay: unsupported console method "'.concat(r, '"')
                                                      );
                                            });
                                        })(window.console),
                                        b.nodes.attachNodeCallback(
                                            b.safe(function (e) {
                                                var t;
                                                e instanceof HTMLIFrameElement &&
                                                    ((t = e.contentWindow) && C(t.console),
                                                    b.attachEventListener(e, 'load', function () {
                                                        e.contentWindow !== t && ((t = e.contentWindow), C(t.console));
                                                    }));
                                            })
                                        )),
                                    (g = this.app),
                                    (T = e),
                                    Object.assign({ captureExceptions: !0 }, T).captureExceptions &&
                                        ((T = function (e) {
                                            e = tt(e);
                                            null != e && g.send(e);
                                        }),
                                        g.attachEventListener(window, 'unhandledrejection', T),
                                        g.attachEventListener(window, 'error', T)),
                                    (m = this.app),
                                    (v = m.safe(function () {
                                        var e,
                                            t,
                                            n,
                                            r,
                                            i = m.nodes.getID(this);
                                        void 0 !== i &&
                                            ((e = this.src),
                                            (t = this.complete),
                                            (n = this.naturalWidth),
                                            (r = this.naturalHeight),
                                            t &&
                                                (0 === n && 0 === r
                                                    ? null != e && J(e) && m.send(new ge(W(), 0, 0, 0, 0, 0, e, 'img'))
                                                    : e.length < 1e5 && m.send(new Ce(i, 'src', e, m.getBaseHref()))));
                                    })),
                                    (y = new MutationObserver(function (e) {
                                        var t,
                                            n = V(e);
                                        try {
                                            for (n.s(); !(t = n.n()).done; ) {
                                                var r = t.value;
                                                if ('attributes' === r.type && 'src' === r.attributeName) {
                                                    var i = r.target,
                                                        o = m.nodes.getID(i);
                                                    if (void 0 === o) return;
                                                    var s = i.src;
                                                    m.send(new Ce(o, 'src', s, m.getBaseHref()));
                                                }
                                            }
                                        } catch (e) {
                                            n.e(e);
                                        } finally {
                                            n.f();
                                        }
                                    })),
                                    m.nodes.attachNodeCallback(function (e) {
                                        e instanceof HTMLImageElement &&
                                            (m.nodes.attachElementListener('error', e, v),
                                            m.nodes.attachElementListener('load', e, v),
                                            v.call(e),
                                            y.observe(e, { attributes: !0 }));
                                    }),
                                    st(this.app, e),
                                    ct(this.app),
                                    ut(this.app, e),
                                    (d = this.app),
                                    Object.assign({ capturePerformance: !0 }, e).capturePerformance &&
                                        ((h = function e() {
                                            void 0 !== l && -1 !== l && (l++, requestAnimationFrame(e));
                                        }),
                                        d.ticker.attach(
                                            function () {
                                                void 0 !== p && -1 !== p && p++;
                                            },
                                            0,
                                            !1
                                        ),
                                        (f = function () {
                                            void 0 !== l &&
                                                void 0 !== p &&
                                                (d.send(
                                                    new ye(
                                                        l,
                                                        p,
                                                        ze.memory.totalJSHeapSize || 0,
                                                        ze.memory.usedJSHeapSize || 0
                                                    )
                                                ),
                                                (p = l = document.hidden ? -1 : 0));
                                        }),
                                        d.attachStartCallback(function () {
                                            (p = l = -1), f(), h();
                                        }),
                                        d.attachStopCallback(function () {
                                            p = l = void 0;
                                        }),
                                        d.ticker.attach(f, 40, !1),
                                        void 0 !== document.hidden &&
                                            d.attachEventListener(document, 'visibilitychange', f, !1, !1)),
                                    (n = this.app),
                                    (r = !1),
                                    (i = new Map()),
                                    (o = n.safe(function () {
                                        return n.send(
                                            new $(
                                                window.pageXOffset ||
                                                    (document.documentElement && document.documentElement.scrollLeft) ||
                                                    (document.body && document.body.scrollLeft) ||
                                                    0,
                                                window.pageYOffset ||
                                                    (document.documentElement && document.documentElement.scrollTop) ||
                                                    (document.body && document.body.scrollTop) ||
                                                    0
                                            )
                                        );
                                    })),
                                    (u = n.safe(function (e, t) {
                                        t = n.nodes.getID(t);
                                        void 0 !== t && n.send(new re(t, e[0], e[1]));
                                    })),
                                    n.attachStartCallback(o),
                                    n.attachStopCallback(function () {
                                        (r = !1), i.clear();
                                    }),
                                    n.attachEventListener(window, 'scroll', function (e) {
                                        e = e.target;
                                        e !== document
                                            ? e instanceof Element && i.set(e, [e.scrollLeft, e.scrollTop])
                                            : (r = !0);
                                    }),
                                    n.ticker.attach(
                                        function () {
                                            r && (o(), (r = !1)), i.forEach(u), i.clear();
                                        },
                                        5,
                                        !1
                                    ),
                                    (s = this.app),
                                    'PerformanceObserver' in window &&
                                        'PerformanceLongTaskTiming' in window &&
                                        ((a = [
                                            'unknown',
                                            'self',
                                            'same-origin-ancestor',
                                            'same-origin-descendant',
                                            'same-origin',
                                            'cross-origin-ancestor',
                                            'cross-origin-descendant',
                                            'cross-origin-unreachable',
                                            'multiple-contexts',
                                        ]),
                                        (c = ['window', 'iframe', 'embed', 'object']),
                                        new PerformanceObserver(function (e) {
                                            return e.getEntries().forEach(z);
                                        }).observe({ entryTypes: ['longtask'] })),
                                    (window.__OPENREPLAY__ = this))
                                  : (console.log(
                                        "OpenReplay: browser doesn't support API required for tracking or doNotTrack is set to 1."
                                    ),
                                    (O = new XMLHttpRequest()),
                                    (T = e.ingestPoint || Ve),
                                    O.open('POST', T + '/v1/web/not-started'),
                                    O.send(
                                        JSON.stringify({
                                            trackerVersion: '3.4.16',
                                            projectKey: e.projectKey,
                                            doNotTrack: t,
                                        })
                                    )))
                            : console.error(
                                  'OpenReplay: Your website must be publicly accessible and running on SSL in order for OpenReplay to properly capture and replay the user session. You can disable this check by setting `__DISABLE_SECURE_MODE` option to `true` if you are testing in localhost. Keep in mind, that asset files on a local machine are not available to the outside world. This might affect tracking if you use css files.'
                              ));
            }
            return (
                s(G, [
                    {
                        key: 'use',
                        value: function (e) {
                            return e(this.app, this.options);
                        },
                    },
                    {
                        key: 'isActive',
                        value: function () {
                            return null !== this.app && this.app.active();
                        },
                    },
                    {
                        key: 'active',
                        value: function () {
                            return Y("'active' method", "'isActive' method", '/'), this.isActive();
                        },
                    },
                    {
                        key: 'start',
                        value: function () {
                            return K
                                ? null === this.app
                                    ? Promise.reject("Browser doesn't support required api, or doNotTrack is active.")
                                    : this.app.start()
                                : (console.error(
                                      'OpenReplay: you are trying to start Tracker on a node.js environment. If you want to use OpenReplay with SSR, please, use componentDidMount or useEffect API for placing the `tracker.start()` line. Check documentation on '
                                          .concat(q)
                                          .concat(dt)
                                  ),
                                  Promise.reject('Trying to start not in browser.'));
                        },
                    },
                    {
                        key: 'stop',
                        value: function () {
                            null !== this.app && this.app.stop();
                        },
                    },
                    {
                        key: 'getSessionToken',
                        value: function () {
                            return null === this.app ? null : this.app.getSessionToken();
                        },
                    },
                    {
                        key: 'getSessionID',
                        value: function () {
                            return null === this.app ? null : this.app.getSessionID();
                        },
                    },
                    {
                        key: 'sessionID',
                        value: function () {
                            return Y("'sessionID' method", "'getSessionID' method", '/'), this.getSessionID();
                        },
                    },
                    {
                        key: 'setUserID',
                        value: function (e) {
                            'string' == typeof e && null !== this.app && this.app.send(new he(e));
                        },
                    },
                    {
                        key: 'userID',
                        value: function (e) {
                            Y("'userID' method", "'setUserID' method", '/'), this.setUserID(e);
                        },
                    },
                    {
                        key: 'setUserAnonymousID',
                        value: function (e) {
                            'string' == typeof e && null !== this.app && this.app.send(new fe(e));
                        },
                    },
                    {
                        key: 'userAnonymousID',
                        value: function (e) {
                            Y("'userAnonymousID' method", "'setUserAnonymousID' method", '/'),
                                this.setUserAnonymousID(e);
                        },
                    },
                    {
                        key: 'setMetadata',
                        value: function (e, t) {
                            'string' == typeof e &&
                                'string' == typeof t &&
                                null !== this.app &&
                                this.app.send(new me(e, t));
                        },
                    },
                    {
                        key: 'metadata',
                        value: function (e, t) {
                            Y("'metadata' method", "'setMetadata' method", '/'), this.setMetadata(e, t);
                        },
                    },
                    {
                        key: 'event',
                        value: function (e, t) {
                            if ('string' == typeof e && null !== this.app) {
                                if (2 < arguments.length && void 0 !== arguments[2] && arguments[2])
                                    return this.issue(e, t);
                                try {
                                    t = JSON.stringify(t);
                                } catch (e) {
                                    return;
                                }
                                this.app.send(new pe(e, t));
                            }
                        },
                    },
                    {
                        key: 'issue',
                        value: function (e, t) {
                            if ('string' == typeof e && null !== this.app) {
                                try {
                                    t = JSON.stringify(t);
                                } catch (e) {
                                    return;
                                }
                                this.app.send(new Te(e, t));
                            }
                        },
                    },
                ]),
                G
            );
        })();
    (function (e) {
        var t = 0 < arguments.length && void 0 !== e ? e : {},
            n = window.OpenReplay || window.asayer,
            r = n.shift(),
            i = n.shift(),
            e = n.shift(),
            t = Object.assign(
                {
                    projectKey: r,
                    sessionToken: i,
                    obscureTextEmails: !!(1 & e),
                    obscureTextNumbers: !!((e >> 1) & 1),
                    obscureInputNumbers: !!((e >> 3) & 1),
                    obscureInputEmails: !!((e >> 4) & 1),
                    defaultInputMode: e >> 5,
                    __is_snippet: !0,
                },
                t
            );
        n.i && (t.ingestPoint = n.i);
        var o = (window.OpenReplay = window.asayer = new ht(t)),
            s = o.setUserID.bind(o);
        o.setUserID = o.userID = function (e) {
            void 0 !== l(e) && null !== e && s(e.toString());
        };
        var a = o.setUserAnonymousID.bind(o);
        o.setUserAnonymousID = o.userAnonymousID = function (e) {
            void 0 !== l(e) && null !== e && a(e.toString());
        };
        var c = o.setMetadata.bind(o);
        o.setMetadata = o.metadata = function (e, t) {
            'number' == typeof t && NaN !== t && (t = t.toString()),
                'string' == typeof e && 'string' == typeof t && c(e, t);
        };
        var u = o.event.bind(o);
        for (
            o.event = function (e, t) {
                'string' == typeof e && u(e, t);
            };
            n.length;

        ) {
            var d = n.shift();
            switch (d[0]) {
                case 0:
                    o.start();
                    break;
                case 1:
                    o.stop();
                    break;
                case 2:
                    o.setUserID(d[1]);
                    break;
                case 3:
                    o.setUserAnonymousID(d[1]);
                    break;
                case 4:
                    o.setMetadata(d[1], d[2]);
                    break;
                case 5:
                    o.event(d[1], d[2], d[3]);
                    break;
                case 6:
                    o.issue(d[1], d[2]);
            }
        }
        return o;
    })().use(
        ((pt = Object.assign(
            {
                confirmText: 'You have an incoming call. Do you want to answer?',
                confirmStyle: {},
                session_calling_peer_key: '__openreplay_calling_peer',
                config: null,
                onCallStart: function () {},
                onAgentConnect: function () {},
            },
            lt
        )),
        function (n) {
            var e,
                r,
                s,
                a,
                i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            function d() {
                for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                i.__debug_log && (e = console).log.apply(e, ['OpenReplay Assist. '].concat(n));
            }
            function l() {
                for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                i.__debug_log && (e = console).warn.apply(e, ['OpenReplay Assist. '].concat(n));
            }
            null !== n &&
                null !== (e = null === navigator || void 0 === navigator ? void 0 : navigator.mediaDevices) &&
                void 0 !== e &&
                e.getUserMedia &&
                ((r = !1),
                (s = null),
                (a = {}),
                n.addCommitCallback(function (t) {
                    Object.values(a).forEach(function (e) {
                        return e.send(t);
                    });
                }),
                n.attachStopCallback(function () {
                    r || (s && (s.destroy(), d('Peer destroyed!')));
                }),
                n.attachStartCallback(function () {
                    var e, t, o;
                    r ||
                        ((e = ''.concat(n.getProjectKey(), '-').concat(n.getSessionID())),
                        (t = {
                            host: n.getHost(),
                            path: '/assist',
                            port: 'http:' === location.protocol && i.__DISABLE_SECURE_MODE ? 80 : 443,
                        }),
                        pt.config && (t.config = pt.config),
                        d('Peer created: ', (s = new g(e, t))),
                        s.on('error', function (e) {
                            return l('Peer error: ', e.type, e);
                        }),
                        s.on('connection', function (t) {
                            window.addEventListener('beforeunload', function () {
                                return t.open && t.send('unload');
                            }),
                                d('Connecting...'),
                                t.on('open', function () {
                                    d('Connection opened.'),
                                        (r = !0),
                                        n.stop(),
                                        (a[t.peer] = new _(t, pt.__messages_per_send));
                                    var e = pt.onAgentConnect();
                                    t.on('close', function () {
                                        e && e(), d('Connection close: ', t.peer), delete a[t.peer];
                                    }),
                                        n.start().then(function () {
                                            r = !1;
                                        });
                                });
                        }),
                        (o = E.False),
                        s.on('call', function (r) {
                            var e;
                            if ((d('Call: ', r), s)) {
                                var i = null === (e = a[r.peer]) || void 0 === e ? void 0 : e.conn;
                                if (o !== E.False || !i || !i.open)
                                    return r.close(), void l('Call closed instantly: ', o, i, i.open);
                                var t,
                                    n,
                                    c = function () {
                                        i.open && i.send('call_end');
                                    };
                                sessionStorage.getItem(pt.session_calling_peer_key) === r.peer
                                    ? (n = Promise.resolve(!0))
                                    : (u(E.Requesting),
                                      (n = (t = new T(pt.confirmText, pt.confirmStyle)).mount()),
                                      i.on('data', function (e) {
                                          'call_end' === e &&
                                              (d('Received call_end during confirm window opened'),
                                              t.remove(),
                                              u(E.False));
                                      })),
                                    n
                                        .then(function (e) {
                                            if (!e || !i.open)
                                                return (
                                                    i.open || l('Call cancelled because data connection is closed.'),
                                                    r.close(),
                                                    c(),
                                                    void u(E.False)
                                                );
                                            function n() {
                                                d('initiateCallEnd'), r.close(), c(), a();
                                            }
                                            var t = pt.onCallStart(),
                                                o = new S(),
                                                s = new w(),
                                                a = function () {
                                                    t && t(), o.remove(), s.remove(), u(E.False);
                                                };
                                            navigator.mediaDevices
                                                .getUserMedia({ audio: !0 })
                                                .then(function (e) {
                                                    e = e.getAudioTracks()[0];
                                                    if (!e) throw new Error('No audio tracks provided');
                                                    return new P(e);
                                                })
                                                .then(function (e) {
                                                    i.on('close', a);
                                                    var t = setInterval(function () {
                                                        i.open || (n(), clearInterval(t)),
                                                            r.open || (a(), clearInterval(t));
                                                    }, 3e3);
                                                    r.on('error', function (e) {
                                                        l('Call error:', e), n();
                                                    }),
                                                        r.on('stream', function (e) {
                                                            s.setRemoteStream(e);
                                                            e = function e() {
                                                                s.playRemote(),
                                                                    document.removeEventListener('click', e);
                                                            };
                                                            document.addEventListener('click', e);
                                                        }),
                                                        i.on('data', function (e) {
                                                            if (e) {
                                                                if ('call_end' === e)
                                                                    return d('"call_end" received'), void a();
                                                                var t, n, r, i;
                                                                'string' === e.name &&
                                                                    (d('Name received: ', e),
                                                                    s.setAssistentName(e.name)),
                                                                    'scroll' === e.type &&
                                                                        Array.isArray(e.delta) &&
                                                                        ((t =
                                                                            document.scrollingElement ||
                                                                            document.documentElement),
                                                                        (n = (i = h(o.getPosition(), 2))[0]),
                                                                        (r = i[1]),
                                                                        (i = h(e.delta, 2))[0],
                                                                        i[1],
                                                                        (i = !1),
                                                                        (r = document.elementFromPoint(
                                                                            n - t.scrollLeft,
                                                                            r - t.scrollTop
                                                                        )) &&
                                                                            (r.scrollWidth > r.clientWidth &&
                                                                                ((r.scrollLeft += e.delta[0]),
                                                                                (i = !0)),
                                                                            r &&
                                                                                r.scrollHeight > r.clientHeight &&
                                                                                ((r.scrollTop += e.delta[1]),
                                                                                (i = !0))),
                                                                        i ||
                                                                            window.scroll(
                                                                                t.scrollLeft + e.delta[0],
                                                                                t.scrollTop + e.delta[1]
                                                                            )),
                                                                    'click' !== e.type ||
                                                                    'number' != typeof e.x ||
                                                                    'number' != typeof e.y
                                                                        ? 'number' == typeof e.x &&
                                                                          'number' == typeof e.y &&
                                                                          o.move(e)
                                                                        : (e = document.elementFromPoint(
                                                                              e.x,
                                                                              e.y
                                                                          )) instanceof HTMLElement &&
                                                                          (e.click(), e.focus());
                                                            }
                                                        }),
                                                        e.onVideoTrack(function (e) {
                                                            var t = r.peerConnection.getSenders().find(function (e) {
                                                                return (
                                                                    'video' ===
                                                                    (null === (e = e.track) || void 0 === e
                                                                        ? void 0
                                                                        : e.kind)
                                                                );
                                                            });
                                                            t
                                                                ? (d('sender found:', t), t.replaceTrack(e))
                                                                : l('No video sender found');
                                                        }),
                                                        s.setCallEndAction(n),
                                                        s.setLocalStream(e),
                                                        r.answer(e.stream),
                                                        u(E.True);
                                                })
                                                .catch(function (e) {
                                                    l('Audio mediadevice request error:', e), a();
                                                });
                                        })
                                        .catch();
                            }
                            function u(e) {
                                e === E.True
                                    ? sessionStorage.setItem(pt.session_calling_peer_key, r.peer)
                                    : e === E.False && sessionStorage.removeItem(pt.session_calling_peer_key),
                                    (o = e);
                            }
                        }));
                }));
        })
    );
})();
