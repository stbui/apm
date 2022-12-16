const BOTS = [
    '\\+https:\\/\\/developers.google.com\\/\\+\\/web\\/snippet\\/',
    'ad\\smonitoring',
    'adsbot',
    'apex',
    'applebot',
    'archive.org_bot',
    'baiduspider',
    'bingbot',
    'chromeheadless',
    'cloudflare',
    'cloudinary',
    'crawler',
    'curl',
    'discordbot',
    'duckduckbot',
    'embedly',
    'exabot',
    'facebookexternalhit',
    'facebot',
    'flipboard',
    'google',
    'googlebot',
    'gsa-crawler',
    'gurujibot',
    'guzzlehttp',
    'heritrix',
    'ia_archiver',
    'insights',
    'linkedinbot',
    'ltx71',
    'mediapartners',
    'msnbot',
    'odklbot',
    'phantom\\.js',
    'phantomjs',
    'pingdom',
    'pinterest',
    'python',
    'rtlnieuws',
    'skypeuripreview',
    'slackbot',
    'slurp',
    'spbot',
    'telegrambot',
    'test\\scertificate',
    'testing',
    'tiabot',
    'tumblr ',
    'twitterbot',
    'vkshare',
    'web\\sscraper',
    'wget',
    'yandexbot',
    'whatsapp',
    'orangebot',
    'smtbot',
    'qwantify',
    'mj12bot',
    'ahrefsbot',
    'seznambot',
    'panscient.com',
    'duckduckgo-favicons-bot',
    'uptimerobot',
    'semrushbot',
    'postman',
    'dotbot',
    'zoominfobot',
    'ifttt',
    'sogou',
    'ru_bot',
    'researchscan',
    'nimbostratus-bot',
    'slack-imgproxy',
    'node-superagent',
    'go-http-client',
    'jersey',
    'dataprovider.com',
    'github-camo',
    'dispatch',
    'checkmarknetwork',
    'screaming frog',
    'whatweb',
    'daum',
    'netcraftsurveyagent',
    'mojeekbot',
    'surdotlybot',
    'springbot',
];
const IS_BOT_REGEXP = new RegExp('^.*(' + BOTS.join('|') + ').*$');

const versions = {
    Edge: /(?:edge|edga|edgios|edg)\/([\d\w\.\-]+)/i,
    Firefox: /(?:firefox|fxios)\/([\d\w\.\-]+)/i,
    IE: /msie\s([\d\.]+[\d])|trident\/\d+\.\d+;.*[rv:]+(\d+\.\d)/i,
    Chrome: /(?:chrome|crios)\/([\d\w\.\-]+)/i,
    Chromium: /chromium\/([\d\w\.\-]+)/i,
    Safari: /(version|safari)\/([\d\w\.\-]+)/i,
    Opera: /version\/([\d\w\.\-]+)|OPR\/([\d\w\.\-]+)/i,
    Ps3: /([\d\w\.\-]+)\)\s*$/i,
    Psp: /([\d\w\.\-]+)\)?\s*$/i,
    Amaya: /amaya\/([\d\w\.\-]+)/i,
    SeaMonkey: /seamonkey\/([\d\w\.\-]+)/i,
    OmniWeb: /omniweb\/v([\d\w\.\-]+)/i,
    Flock: /flock\/([\d\w\.\-]+)/i,
    Epiphany: /epiphany\/([\d\w\.\-]+)/i,
    WinJs: /msapphost\/([\d\w\.\-]+)/i,
    PhantomJS: /phantomjs\/([\d\w\.\-]+)/i,
    AlamoFire: /alamofire\/([\d\w\.\-]+)/i,
    UC: /ucbrowser\/([\d\w\.]+)/i,
    Facebook: /FBAV\/([\d\w\.]+)/i,
    WebKit: /applewebkit\/([\d\w\.]+)/i,
    Wechat: /micromessenger\/([\d\w\.]+)/i,
    Electron: /Electron\/([\d\w\.]+)/i,
};

const browsers = {
    YaBrowser: /yabrowser/i,
    Edge: /edge|edga|edgios|edg/i,
    Amaya: /amaya/i,
    Konqueror: /konqueror/i,
    Epiphany: /epiphany/i,
    SeaMonkey: /seamonkey/i,
    Flock: /flock/i,
    OmniWeb: /omniweb/i,
    Chromium: /chromium/i,
    Chrome: /chrome|crios/i,
    Safari: /safari/i,
    IE: /msie|trident/i,
    Opera: /opera|OPR\//i,
    PS3: /playstation 3/i,
    PSP: /playstation portable/i,
    Firefox: /firefox|fxios/i,
    WinJs: /msapphost/i,
    PhantomJS: /phantomjs/i,
    AlamoFire: /alamofire/i,
    UC: /UCBrowser/i,
    Facebook: /FBA[NV]/,
};

const OS = {
    Windows10: /windows nt 10\.0/i,
    Windows81: /windows nt 6\.3/i,
    Windows8: /windows nt 6\.2/i,
    Windows7: /windows nt 6\.1/i,
    UnknownWindows: /windows nt 6\.\d+/i,
    WindowsVista: /windows nt 6\.0/i,
    Windows2003: /windows nt 5\.2/i,
    WindowsXP: /windows nt 5\.1/i,
    Windows2000: /windows nt 5\.0/i,
    WindowsPhone81: /windows phone 8\.1/i,
    WindowsPhone80: /windows phone 8\.0/i,
    OSXCheetah: /os x 10[._]0/i,
    OSXPuma: /os x 10[._]1(\D|$)/i,
    OSXJaguar: /os x 10[._]2/i,
    OSXPanther: /os x 10[._]3/i,
    OSXTiger: /os x 10[._]4/i,
    OSXLeopard: /os x 10[._]5/i,
    OSXSnowLeopard: /os x 10[._]6/i,
    OSXLion: /os x 10[._]7/i,
    OSXMountainLion: /os x 10[._]8/i,
    OSXMavericks: /os x 10[._]9/i,
    OSXYosemite: /os x 10[._]10/i,
    OSXElCapitan: /os x 10[._]11/i,
    MacOSSierra: /os x 10[._]12/i,
    MacOSHighSierra: /os x 10[._]13/i,
    MacOSMojave: /os x 10[._]14/i,
    Mac: /os x/i,
    Linux: /linux/i,
    Linux64: /linux x86\_64/i,
    ChromeOS: /cros/i,
    Wii: /wii/i,
    PS3: /playstation 3/i,
    PSP: /playstation portable/i,
    iPad: /\(iPad.*os (\d+)[._](\d+)/i,
    iPhone: /\(iPhone.*os (\d+)[._](\d+)/i,
    iOS: /ios/i,
    Bada: /Bada\/(\d+)\.(\d+)/i,
    Curl: /curl\/(\d+)\.(\d+)\.(\d+)/i,
    Electron: /Electron\/(\d+)\.(\d+)\.(\d+)/i,
};

const platform = {
    Windows: /windows nt/i,
    WindowsPhone: /windows phone/i,
    Mac: /macintosh/i,
    Linux: /linux/i,
    Wii: /wii/i,
    Playstation: /playstation/i,
    iPad: /ipad/i,
    iPod: /ipod/i,
    iPhone: /iphone/i,
    Android: /android/i,
    Blackberry: /blackberry/i,
    Samsung: /samsung/i,
    Curl: /curl/i,
    Electron: /Electron/i,
    iOS: /^ios\-/i,
};

const defaultAgent = {
    isYaBrowser: false,
    isAuthoritative: true,
    isMobile: false,
    isMobileNative: false,
    isTablet: false,
    isiPad: false,
    isiPod: false,
    isiPhone: false,
    isiPhoneNative: false,
    isAndroid: false,
    isAndroidNative: false,
    isBlackberry: false,
    isOpera: false,
    isIE: false,
    isEdge: false,
    isIECompatibilityMode: false,
    isSafari: false,
    isFirefox: false,
    isWebkit: false,
    isChrome: false,
    isKonqueror: false,
    isOmniWeb: false,
    isSeaMonkey: false,
    isFlock: false,
    isAmaya: false,
    isPhantomJS: false,
    isEpiphany: false,
    isDesktop: false,
    isWindows: false,
    isLinux: false,
    isLinux64: false,
    isMac: false,
    isChromeOS: false,
    isBada: false,
    isSamsung: false,
    isRaspberry: false,
    isBot: false,
    isCurl: false,
    isAndroidTablet: false,
    isWinJs: false,
    isKindleFire: false,
    isSilk: false,
    isCaptive: false,
    isSmartTV: false,
    isUC: false,
    isFacebook: false,
    isAlamoFire: false,
    isElectron: false,
    silkAccelerated: false,
    browser: 'unknown',
    version: 'unknown',
    os: 'unknown',
    platform: 'unknown',
    geoIp: {},
    source: '',
    isWechat: false,
};

export class UserAgent {
    Agent: any = {};

    constructor() {
        this.Agent = defaultAgent;
    }

    getBrowser(string) {
        switch (true) {
            case browsers.YaBrowser.test(string):
                this.Agent.isYaBrowser = true;
                return 'YaBrowser';
            case browsers.AlamoFire.test(string):
                this.Agent.isAlamoFire = true;
                return 'AlamoFire';
            case browsers.Edge.test(string):
                this.Agent.isEdge = true;
                return 'Edge';
            case browsers.PhantomJS.test(string):
                this.Agent.isPhantomJS = true;
                return 'PhantomJS';
            case browsers.Konqueror.test(string):
                this.Agent.isKonqueror = true;
                return 'Konqueror';
            case browsers.Amaya.test(string):
                this.Agent.isAmaya = true;
                return 'Amaya';
            case browsers.Epiphany.test(string):
                this.Agent.isEpiphany = true;
                return 'Epiphany';
            case browsers.SeaMonkey.test(string):
                this.Agent.isSeaMonkey = true;
                return 'SeaMonkey';
            case browsers.Flock.test(string):
                this.Agent.isFlock = true;
                return 'Flock';
            case browsers.OmniWeb.test(string):
                this.Agent.isOmniWeb = true;
                return 'OmniWeb';
            case browsers.Opera.test(string):
                this.Agent.isOpera = true;
                return 'Opera';
            case browsers.Chromium.test(string):
                this.Agent.isChrome = true;
                return 'Chromium';
            case browsers.Facebook.test(string):
                this.Agent.isFacebook = true;
                return 'Facebook';
            case browsers.Chrome.test(string):
                this.Agent.isChrome = true;
                return 'Chrome';
            case browsers.WinJs.test(string):
                this.Agent.isWinJs = true;
                return 'WinJs';
            case browsers.IE.test(string):
                this.Agent.isIE = true;
                return 'IE';
            case browsers.Firefox.test(string):
                this.Agent.isFirefox = true;
                return 'Firefox';
            case browsers.Safari.test(string):
                this.Agent.isSafari = true;
                return 'Safari';
            case browsers.PS3.test(string):
                return 'ps3';
            case browsers.PSP.test(string):
                return 'psp';
            case browsers.UC.test(string):
                this.Agent.isUC = true;
                return 'UCBrowser';
            default:
                if (string.indexOf('Dalvik') !== -1) {
                    return 'unknown';
                }

                // If the UA does not start with Mozilla guess the user agent.
                if (string.indexOf('Mozilla') !== 0 && /^([\d\w\-\.]+)\/[\d\w\.\-]+/i.test(string)) {
                    this.Agent.isAuthoritative = false;
                    return RegExp.$1;
                }
                return 'unknown';
        }
    }

    getBrowserVersion(string) {
        var regex;
        switch (this.Agent.browser) {
            case 'Edge':
                if (versions.Edge.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'PhantomJS':
                if (versions.PhantomJS.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'Chrome':
                if (versions.Chrome.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'Chromium':
                if (versions.Chromium.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'Safari':
                if (versions.Safari.test(string)) {
                    return RegExp.$2;
                }
                break;
            case 'Opera':
                if (versions.Opera.test(string)) {
                    return RegExp.$1 ? RegExp.$1 : RegExp.$2;
                }
                break;
            case 'Firefox':
                if (versions.Firefox.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'WinJs':
                if (versions.WinJs.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'IE':
                if (versions.IE.test(string)) {
                    return RegExp.$2 ? RegExp.$2 : RegExp.$1;
                }
                break;
            case 'ps3':
                if (versions.Ps3.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'psp':
                if (versions.Psp.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'Amaya':
                if (versions.Amaya.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'Epiphany':
                if (versions.Epiphany.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'SeaMonkey':
                if (versions.SeaMonkey.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'Flock':
                if (versions.Flock.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'OmniWeb':
                if (versions.OmniWeb.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'UCBrowser':
                if (versions.UC.test(string)) {
                    return RegExp.$1;
                }
                break;
            case 'Facebook':
                if (versions.Facebook.test(string)) {
                    return RegExp.$1;
                }
                break;
            default:
                if (this.Agent.browser !== 'unknown') {
                    regex = new RegExp(this.Agent.browser + '[\\/ ]([\\d\\w\\.\\-]+)', 'i');
                    if (regex.test(string)) {
                        return RegExp.$1;
                    }
                } else {
                    this.testWebkit();
                    if (this.Agent.isWebkit && versions.WebKit.test(string)) {
                        return RegExp.$1;
                    }
                    return 'unknown';
                }
        }
    }

    getWechatVersion(string) {
        if (versions.Wechat.test(string)) {
            return RegExp.$1;
        }

        return 'unknown';
    }

    getElectronVersion(string) {
        if (versions.Electron.test(string)) {
            this.Agent.isElectron = true;
            return RegExp.$1;
        }

        return '';
    }

    getOS(string) {
        switch (true) {
            case OS.WindowsVista.test(string):
                this.Agent.isWindows = true;
                return 'Windows Vista';
            case OS.Windows7.test(string):
                this.Agent.isWindows = true;
                return 'Windows 7';
            case OS.Windows8.test(string):
                this.Agent.isWindows = true;
                return 'Windows 8';
            case OS.Windows81.test(string):
                this.Agent.isWindows = true;
                return 'Windows 8.1';
            case OS.Windows10.test(string):
                this.Agent.isWindows = true;
                return 'Windows 10.0';
            case OS.Windows2003.test(string):
                this.Agent.isWindows = true;
                return 'Windows 2003';
            case OS.WindowsXP.test(string):
                this.Agent.isWindows = true;
                return 'Windows XP';
            case OS.Windows2000.test(string):
                this.Agent.isWindows = true;
                return 'Windows 2000';
            case OS.WindowsPhone81.test(string):
                this.Agent.isWindowsPhone = true;
                return 'Windows Phone 8.1';
            case OS.WindowsPhone80.test(string):
                this.Agent.isWindowsPhone = true;
                return 'Windows Phone 8.0';
            case OS.Linux64.test(string):
                this.Agent.isLinux = true;
                this.Agent.isLinux64 = true;
                return 'Linux 64';
            case OS.Linux.test(string):
                this.Agent.isLinux = true;
                return 'Linux';
            case OS.ChromeOS.test(string):
                this.Agent.isChromeOS = true;
                return 'Chrome OS';
            case OS.Wii.test(string):
                return 'Wii';
            case OS.PS3.test(string):
                return 'Playstation';
            case OS.PSP.test(string):
                return 'Playstation';
            case OS.OSXCheetah.test(string):
                this.Agent.isMac = true;
                return 'OS X Cheetah';
            case OS.OSXPuma.test(string):
                this.Agent.isMac = true;
                return 'OS X Puma';
            case OS.OSXJaguar.test(string):
                this.Agent.isMac = true;
                return 'OS X Jaguar';
            case OS.OSXPanther.test(string):
                this.Agent.isMac = true;
                return 'OS X Panther';
            case OS.OSXTiger.test(string):
                this.Agent.isMac = true;
                return 'OS X Tiger';
            case OS.OSXLeopard.test(string):
                this.Agent.isMac = true;
                return 'OS X Leopard';
            case OS.OSXSnowLeopard.test(string):
                this.Agent.isMac = true;
                return 'OS X Snow Leopard';
            case OS.OSXLion.test(string):
                this.Agent.isMac = true;
                return 'OS X Lion';
            case OS.OSXMountainLion.test(string):
                this.Agent.isMac = true;
                return 'OS X Mountain Lion';
            case OS.OSXMavericks.test(string):
                this.Agent.isMac = true;
                return 'OS X Mavericks';
            case OS.OSXYosemite.test(string):
                this.Agent.isMac = true;
                return 'OS X Yosemite';
            case OS.OSXElCapitan.test(string):
                this.Agent.isMac = true;
                return 'OS X El Capitan';
            case OS.MacOSSierra.test(string):
                this.Agent.isMac = true;
                return 'macOS Sierra';
            case OS.MacOSHighSierra.test(string):
                this.Agent.isMac = true;
                return 'macOS High Sierra';
            case OS.MacOSMojave.test(string):
                this.Agent.isMac = true;
                return 'macOS Mojave';
            case OS.Mac.test(string):
                // !('ontouchend' in document);
                // navigator.maxTouchPoints > 1
                this.Agent.isMac = true;
                return 'OS X';
            case OS.iPad.test(string):
                // 'ontouchend' in document;
                this.Agent.isiPad = true;
                return string.match(OS.iPad)[0].replace('_', '.');
            case OS.iPhone.test(string):
                //  'ontouchend' in document;
                this.Agent.isiPhone = true;
                return string.match(OS.iPhone)[0].replace('_', '.');
            case OS.Bada.test(string):
                this.Agent.isBada = true;
                return 'Bada';
            case OS.Curl.test(string):
                this.Agent.isCurl = true;
                return 'Curl';
            case OS.iOS.test(string):
                this.Agent.isiPhone = true;
                return 'iOS';
            case OS.Electron.test(string):
                this.Agent.isElectron = true;
                return 'Electron';
            default:
                return 'unknown';
        }
    }

    getPlatform(string) {
        switch (true) {
            case platform.Windows.test(string):
                return 'Microsoft Windows';
            case platform.WindowsPhone.test(string):
                this.Agent.isWindowsPhone = true;
                return 'Microsoft Windows Phone';
            case platform.Mac.test(string):
                return 'Apple Mac';
            case platform.Curl.test(string):
                return 'Curl';
            case platform.Electron.test(string):
                this.Agent.isElectron = true;
                return 'Electron';
            case platform.Android.test(string):
                this.Agent.isAndroid = true;
                return 'Android';
            case platform.Blackberry.test(string):
                this.Agent.isBlackberry = true;
                return 'Blackberry';
            case platform.Linux.test(string):
                return 'Linux';
            case platform.Wii.test(string):
                return 'Wii';
            case platform.Playstation.test(string):
                return 'Playstation';
            case platform.iPad.test(string):
                this.Agent.isiPad = true;
                return 'iPad';
            case platform.iPod.test(string):
                this.Agent.isiPod = true;
                return 'iPod';
            case platform.iPhone.test(string):
                this.Agent.isiPhone = true;
                return 'iPhone';
            case platform.Samsung.test(string):
                this.Agent.isSamsung = true;
                return 'Samsung';
            case platform.iOS.test(string):
                return 'Apple iOS';
            default:
                return 'unknown';
        }
    }

    testCompatibilityMode() {
        var ua = this;
        if (this.Agent.isIE) {
            if (/Trident\/(\d)\.0/i.test(ua.Agent.source)) {
                var tridentVersion = parseInt(RegExp.$1, 10);
                var version = parseInt(ua.Agent.version, 10);
                if (version === 7 && tridentVersion === 7) {
                    ua.Agent.isIECompatibilityMode = true;
                    ua.Agent.version = 11.0;
                }

                if (version === 7 && tridentVersion === 6) {
                    ua.Agent.isIECompatibilityMode = true;
                    ua.Agent.version = 10.0;
                }

                if (version === 7 && tridentVersion === 5) {
                    ua.Agent.isIECompatibilityMode = true;
                    ua.Agent.version = 9.0;
                }

                if (version === 7 && tridentVersion === 4) {
                    ua.Agent.isIECompatibilityMode = true;
                    ua.Agent.version = 8.0;
                }
            }
        }
    }

    testSilk() {
        var ua = this;
        switch (true) {
            case new RegExp('silk', 'gi').test(ua.Agent.source):
                this.Agent.isSilk = true;
                break;
            default:
        }

        if (/Silk-Accelerated=true/gi.test(ua.Agent.source)) {
            this.Agent.SilkAccelerated = true;
        }
        return this.Agent.isSilk ? 'Silk' : false;
    }

    testKindleFire() {
        var ua = this;
        switch (true) {
            case /KFOT/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire';
            case /KFTT/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire HD';
            case /KFJWI/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire HD 8.9';
            case /KFJWA/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire HD 8.9 4G';
            case /KFSOWI/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire HD 7';
            case /KFTHWI/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire HDX 7';
            case /KFTHWA/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire HDX 7 4G';
            case /KFAPWI/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire HDX 8.9';
            case /KFAPWA/gi.test(ua.Agent.source):
                this.Agent.isKindleFire = true;
                return 'Kindle Fire HDX 8.9 4G';
            default:
                return false;
        }
    }

    testCaptiveNetwork() {
        var ua = this;
        switch (true) {
            case /CaptiveNetwork/gi.test(ua.Agent.source):
                ua.Agent.isCaptive = true;
                ua.Agent.isMac = true;
                ua.Agent.platform = 'Apple Mac';
                return 'CaptiveNetwork';
            default:
                return false;
        }
    }

    reset() {
        var ua = this;
        for (var key in defaultAgent) {
            ua.Agent[key] = defaultAgent[key];
        }
        return ua;
    }

    testMobile() {
        var ua = this;
        switch (true) {
            case ua.Agent.isWindows:
            case ua.Agent.isLinux:
            case ua.Agent.isMac:
            case ua.Agent.isChromeOS:
                ua.Agent.isDesktop = true;
                break;
            case ua.Agent.isAndroid:
            case ua.Agent.isSamsung:
                ua.Agent.isMobile = true;
                break;
            default:
        }
        switch (true) {
            case ua.Agent.isiPad:
            case ua.Agent.isiPod:
            case ua.Agent.isiPhone:
            case ua.Agent.isBada:
            case ua.Agent.isBlackberry:
            case ua.Agent.isAndroid:
            case ua.Agent.isWindowsPhone:
                ua.Agent.isMobile = true;
                ua.Agent.isDesktop = false;
                break;
            default:
        }
        if (/mobile|^ios\-/i.test(ua.Agent.source)) {
            ua.Agent.isMobile = true;
            ua.Agent.isDesktop = false;
        }
        if (/dalvik/i.test(ua.Agent.source)) {
            ua.Agent.isAndroidNative = true;
            ua.Agent.isMobileNative = true;
        }
        if (/scale/i.test(ua.Agent.source)) {
            ua.Agent.isiPhoneNative = true;
            ua.Agent.isMobileNative = true;
        }
    }

    testTablet() {
        var ua = this;
        switch (true) {
            case ua.Agent.isiPad:
            case ua.Agent.isAndroidTablet:
            case ua.Agent.isKindleFire:
                ua.Agent.isTablet = true;
                break;
        }
        if (/tablet/i.test(ua.Agent.source)) {
            ua.Agent.isTablet = true;
        }
    }

    testNginxGeoIP(headers) {
        var ua = this;
        Object.keys(headers).forEach(function (key) {
            if (/^GEOIP/i.test(key)) {
                ua.Agent.geoIp[key] = headers[key];
            }
        });
        return ua;
    }

    testBot() {
        var ua = this;
        var isBot = IS_BOT_REGEXP.exec(ua.Agent.source.toLowerCase());
        if (isBot) {
            ua.Agent.isBot = isBot[1];
        } else if (!ua.Agent.isAuthoritative) {
            // Test unauthoritative parse for `bot` in UA to flag for bot
            ua.Agent.isBot = /bot/i.test(ua.Agent.source);
        }
    }

    testSmartTV() {
        var ua = this;
        ua.Agent.isSmartTV = new RegExp('smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv', 'gi').test(
            ua.Agent.source.toLowerCase()
        );
    }

    testAndroidTablet() {
        var ua = this;
        if (ua.Agent.isAndroid && !/mobile/i.test(ua.Agent.source)) {
            ua.Agent.isAndroidTablet = true;
        }
    }

    testWebkit() {
        var ua = this;
        if (ua.Agent.browser === 'unknown' && /applewebkit/i.test(ua.Agent.source)) {
            ua.Agent.browser = 'Apple WebKit';
            ua.Agent.isWebkit = true;
        }
    }

    testWechat() {
        var ua = this;

        if (/micromessenger/i.test(ua.Agent.source)) {
            ua.Agent.isWechat = true;
            ua.Agent.version = this.getWechatVersion(ua.Agent.source);
        }
    }

     parse(source) {
        var ua = new UserAgent();
        ua.Agent.source = source.replace(/^\s*/, '').replace(/\s*$/, '');
        ua.Agent.os = ua.getOS(ua.Agent.source);
        ua.Agent.platform = ua.getPlatform(ua.Agent.source);
        ua.Agent.browser = ua.getBrowser(ua.Agent.source);
        ua.Agent.version = ua.getBrowserVersion(ua.Agent.source);
        ua.Agent.electronVersion = ua.getElectronVersion(ua.Agent.source);
        ua.testBot();
        ua.testSmartTV();
        ua.testMobile();
        ua.testAndroidTablet();
        ua.testTablet();
        ua.testCompatibilityMode();
        ua.testSilk();
        ua.testKindleFire();
        ua.testCaptiveNetwork();
        ua.testWebkit();
        ua.testWechat();
        return ua.Agent;
    }
}
