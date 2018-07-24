export const snapshot = {
  nodeType: 1,
  attributes: [
    { name: 'lang', value: 'en' },
    { name: 'data-dpr', value: '2' },
    { name: 'style', value: 'font-size: 50px;' },
  ],
  childNodes: [
    {
      nodeType: 1,
      childNodes: [
        { nodeType: 3, id: 20, textContent: '\n  ' },
        {
          nodeType: 1,
          childNodes: [{ nodeType: 3, id: 1595, textContent: '\u9e70\u773c' }],
          id: 27,
          tagName: 'TITLE',
        },
        { nodeType: 3, id: 35, textContent: '\n  ' },
        {
          nodeType: 1,
          attributes: [{ name: 'charset', value: 'utf-8' }],
          id: 44,
          tagName: 'META',
        },
        { nodeType: 3, id: 54, textContent: '\n  ' },
        {
          nodeType: 1,
          attributes: [
            { name: 'http-equiv', value: 'X-UA-Compatible' },
            { name: 'content', value: 'IE=edge,chrome=1' },
          ],
          id: 65,
          tagName: 'META',
        },
        { nodeType: 3, id: 77, textContent: '\n  ' },
        {
          nodeType: 1,
          attributes: [
            { name: 'name', value: 'viewport' },
            {
              name: 'content',
              value: 'width=device-width, initial-scale=1, maximum-scale=1',
            },
          ],
          id: 90,
          tagName: 'META',
        },
        { nodeType: 3, id: 104, textContent: '\n  ' },
        {
          nodeType: 8,
          id: 119,
          textContent:
            ' <meta name="format-detection" content="telephone=no" /> ',
        },
        { nodeType: 3, id: 135, textContent: '\n  ' },
        {
          nodeType: 1,
          attributes: [
            { name: 'name', value: 'description' },
            { name: 'content', value: '\u52b1\u63a8' },
          ],
          id: 152,
          tagName: 'META',
        },
        { nodeType: 3, id: 170, textContent: '\n  ' },
        {
          nodeType: 1,
          attributes: [
            { name: 'name', value: 'keywords' },
            { name: 'content', value: '\u52b1\u63a8' },
          ],
          id: 189,
          tagName: 'META',
        },
        { nodeType: 3, id: 209, textContent: '\n  ' },
        {
          nodeType: 8,
          id: 230,
          textContent: ' <base href="/h5_mobile_assets/"> ',
        },
        { nodeType: 3, id: 252, textContent: '\n  ' },
        {
          nodeType: 1,
          attributes: [
            { name: 'async', value: '' },
            {
              name: 'src',
              value: 'https://cdn.sessionstack.com/sessionstack.js',
            },
          ],
          id: 275,
          tagName: 'SCRIPT',
        },
        {
          nodeType: 1,
          childNodes: [
            {
              nodeType: 3,
              id: 1652,
              textContent:
                '\n    ! function (e) {\n      var t, i = e.document.documentElement,\n        n = e.devicePixelRatio;\n\n      function o() {\n        var e, t = i.getBoundingClientRect().width;\n        1 === n && (t = 750), t > 750 && (t = 750), e = t / 7.5, i.style.fontSize = e + "px"\n      }\n      n = n > 2 ? 3 : n > 1 ? 2 : 1, i.setAttribute("data-dpr", n), e.addEventListener("resize", function () {\n        clearTimeout(t), t = setTimeout(o, 200)\n      }, !1), o()\n    }(window);\n\n  ',
            },
          ],
          id: 299,
          tagName: 'SCRIPT',
        },
        { nodeType: 3, id: 324, textContent: '\n\n  \n    ' },
        {
          nodeType: 1,
          childNodes: [
            {
              nodeType: 3,
              id: 1710,
              textContent:
                "\n    window.AppConf = {\n      corpId: 'wx22be5ede0602e7a8',\n      agentId: '1000202',\n      appId: '1',\n      orgId: '1',\n      userId: '26',\n      userRoe: '0',\n      fragment: 'Hawkeye',\n      // usable: true,\n      // accountExpiredAt: 1554652799000,\n      usable: true,\n      accountExpiredAt: +new Date() + 604800000,\n      api: {\n        domain: 'https://dev-yingid.ikcrm.com',\n        domains: {\n          im: 'https://dev-im.ikcrm.com',\n        },\n        pathPrefix: '/',\n        userToken: '017753edf7ad47e8ab83f92697ded523',\n        salesToken: '96e35eedfdff41a0882d389f58149ff1'\n      },\n      jsapiConfig:{\n        noncestr: 'c5b454cd56b0455fab622df010c55af8',\n        timestamp: '1527124404',\n        signature: 'ccd1db711c4e50fba67e99f37ae114812696544d'\n      },\n      im: {\n        sdkAppID: 1400077744,\n        accountType: 24256,\n      }\n    };\n    ",
            },
          ],
          id: 350,
          tagName: 'SCRIPT',
        },
        { nodeType: 3, id: 377, textContent: '\n  \n  ' },
        { nodeType: 8, id: 405, textContent: ' Begin SessionStack code ' },
        { nodeType: 3, id: 434, textContent: '\n' },
        {
          nodeType: 1,
          attributes: [{ name: 'type', value: 'text/javascript' }],
          childNodes: [
            {
              nodeType: 3,
              id: 1769,
              textContent:
                '\n  !function(a,b){var c=window;c.SessionStackKey=a,c[a]=c[a]||{t:b,\n  q:[]};for(var d=["start","stop","identify","getSessionId","log"],e=0;e<d.length;e++)!function(b){\n  c[a][b]=c[a][b]||function(){c[a].q.push([b].concat([].slice.call(arguments,0)));\n  }}(d[e]);var f=document.createElement("script");f.async=1,f.src="https://cdn.sessionstack.com/sessionstack.js";\n  var g=document.getElementsByTagName("script")[0];g.parentNode.insertBefore(f,g);\n  }("SessionStack","361d3c43e28d41538a4831adc9ba5870");\n  ',
            },
          ],
          id: 464,
          tagName: 'SCRIPT',
        },
        { nodeType: 3, id: 495, textContent: '\n  ' },
        { nodeType: 8, id: 527, textContent: ' End SessionStack Code ' },
        { nodeType: 3, id: 560, textContent: '\n' },
        {
          nodeType: 1,
          attributes: [
            { name: 'rel', value: 'shortcut icon' },
            {
              name: 'href',
              value:
                'https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252Ffavicon.ico',
            },
          ],
          id: 594,
          tagName: 'LINK',
        },
        {
          nodeType: 1,
          attributes: [
            { name: 'type', value: 'text/css' },
            {
              name: 'data-styled-components',
              value: 'cZxgpV bVpaGR kcCjJg dKKYwH',
            },
            { name: 'data-styled-components-is-local', value: 'true' },
          ],
          childNodes: [
            { nodeType: 3, id: 1829, textContent: '' },
            { nodeType: 3, id: 1890, textContent: '' },
            {
              nodeType: 3,
              id: 1952,
              textContent:
                '\n/* sc-component-id: sc-htpNat */\n\n.kcCjJg{position:absolute;left:50%;margin-left:-18px;top:50%;margin-top:-18px;}',
            },
            {
              nodeType: 3,
              id: 2015,
              textContent:
                '\n/* sc-component-id: sc-keyframes-cZxgpV */\n@-webkit-keyframes cZxgpV{100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg);}}@keyframes cZxgpV{100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg);}}',
            },
            {
              nodeType: 3,
              id: 2079,
              textContent:
                "\n/* sc-component-id: sc-bxivhb */\n\n.dKKYwH{display:inline-block;width:36px;height:36px;background-size:100%;background:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\") no-repeat 50%;-webkit-animation:cZxgpV 1s steps(12,end) infinite;animation:cZxgpV 1s steps(12,end) infinite;}",
            },
            {
              nodeType: 3,
              id: 2144,
              textContent:
                '\n/* sc-component-id: sc-ifAKCX */\n\n.bVpaGR{height:100%;}',
            },
            { nodeType: 3, id: 2210, textContent: '' },
            { nodeType: 3, id: 2277, textContent: '' },
            { nodeType: 3, id: 2345, textContent: '' },
            { nodeType: 3, id: 2414, textContent: '' },
            { nodeType: 3, id: 2484, textContent: '' },
            { nodeType: 3, id: 2555, textContent: '' },
            { nodeType: 3, id: 2627, textContent: '' },
            { nodeType: 3, id: 2700, textContent: '' },
            { nodeType: 3, id: 2774, textContent: '' },
          ],
          id: 629,
          tagName: 'STYLE',
        },
        {
          nodeType: 1,
          attributes: [{ name: 'type', value: 'text/css' }],
          childNodes: [
            {
              nodeType: 3,
              id: 2849,
              textContent:
                '/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type="button"], /* 1 */\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-cancel-button,\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n',
            },
          ],
          id: 665,
          tagName: 'STYLE',
        },
        {
          nodeType: 1,
          attributes: [{ name: 'type', value: 'text/css' }],
          childNodes: [
            {
              nodeType: 3,
              id: 2925,
              textContent:
                '/*do not import this file except components/style/index.less*/\n.am-fade-enter,\n.am-fade-appear {\n  opacity: 0;\n  -webkit-animation-duration: .2s;\n          animation-duration: .2s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.am-fade-leave {\n  -webkit-animation-duration: .2s;\n          animation-duration: .2s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.am-fade-enter.am-fade-enter-active,\n.am-fade-appear.am-fade-appear-active {\n  -webkit-animation-name: amFadeIn;\n          animation-name: amFadeIn;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n.am-fade-leave.am-fade-leave-active {\n  -webkit-animation-name: amFadeOut;\n          animation-name: amFadeOut;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n@-webkit-keyframes amFadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes amFadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes amFadeOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes amFadeOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.am-slide-up-enter,\n.am-slide-up-appear {\n  -webkit-transform: translate(0, 100%);\n      -ms-transform: translate(0, 100%);\n          transform: translate(0, 100%);\n}\n.am-slide-up-enter,\n.am-slide-up-appear,\n.am-slide-up-leave {\n  -webkit-animation-duration: .2s;\n          animation-duration: .2s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.am-slide-up-enter.am-slide-up-enter-active,\n.am-slide-up-appear.am-slide-up-appear-active {\n  -webkit-animation-name: amSlideUpIn;\n          animation-name: amSlideUpIn;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n.am-slide-up-leave.am-slide-up-leave-active {\n  -webkit-animation-name: amSlideUpOut;\n          animation-name: amSlideUpOut;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n@-webkit-keyframes amSlideUpIn {\n  0% {\n    -webkit-transform: translate(0, 100%);\n            transform: translate(0, 100%);\n  }\n  100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n  }\n}\n@keyframes amSlideUpIn {\n  0% {\n    -webkit-transform: translate(0, 100%);\n            transform: translate(0, 100%);\n  }\n  100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n  }\n}\n@-webkit-keyframes amSlideUpOut {\n  0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n  }\n  100% {\n    -webkit-transform: translate(0, 100%);\n            transform: translate(0, 100%);\n  }\n}\n@keyframes amSlideUpOut {\n  0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n  }\n  100% {\n    -webkit-transform: translate(0, 100%);\n            transform: translate(0, 100%);\n  }\n}\n.am.am-zoom-enter,\n.am.am-zoom-leave {\n  display: block;\n}\n.am-zoom-enter,\n.am-zoom-appear {\n  opacity: 0;\n  -webkit-animation-duration: .2s;\n          animation-duration: .2s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);\n          animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.am-zoom-leave {\n  -webkit-animation-duration: .2s;\n          animation-duration: .2s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);\n          animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.am-zoom-enter.am-zoom-enter-active,\n.am-zoom-appear.am-zoom-appear-active {\n  -webkit-animation-name: amZoomIn;\n          animation-name: amZoomIn;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n.am-zoom-leave.am-zoom-leave-active {\n  -webkit-animation-name: amZoomOut;\n          animation-name: amZoomOut;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n@-webkit-keyframes amZoomIn {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n}\n@keyframes amZoomIn {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n}\n@-webkit-keyframes amZoomOut {\n  0% {\n    opacity: 1;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n}\n@keyframes amZoomOut {\n  0% {\n    opacity: 1;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform-origin: 50% 50%;\n            transform-origin: 50% 50%;\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n}\n.am-slide-down-enter,\n.am-slide-down-appear {\n  -webkit-transform: translate(0, -100%);\n      -ms-transform: translate(0, -100%);\n          transform: translate(0, -100%);\n}\n.am-slide-down-enter,\n.am-slide-down-appear,\n.am-slide-down-leave {\n  -webkit-animation-duration: .2s;\n          animation-duration: .2s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.am-slide-down-enter.am-slide-down-enter-active,\n.am-slide-down-appear.am-slide-down-appear-active {\n  -webkit-animation-name: amSlideDownIn;\n          animation-name: amSlideDownIn;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n.am-slide-down-leave.am-slide-down-leave-active {\n  -webkit-animation-name: amSlideDownOut;\n          animation-name: amSlideDownOut;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n@-webkit-keyframes amSlideDownIn {\n  0% {\n    -webkit-transform: translate(0, -100%);\n            transform: translate(0, -100%);\n  }\n  100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n  }\n}\n@keyframes amSlideDownIn {\n  0% {\n    -webkit-transform: translate(0, -100%);\n            transform: translate(0, -100%);\n  }\n  100% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n  }\n}\n@-webkit-keyframes amSlideDownOut {\n  0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n  }\n  100% {\n    -webkit-transform: translate(0, -100%);\n            transform: translate(0, -100%);\n  }\n}\n@keyframes amSlideDownOut {\n  0% {\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0);\n  }\n  100% {\n    -webkit-transform: translate(0, -100%);\n            transform: translate(0, -100%);\n  }\n}\n*,\n*:before,\n*:after {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  background-color: #f5f5f9;\n  font-size: 14px;\n}\n*[contenteditable] {\n  -webkit-user-select: auto !important;\n}\n*:focus {\n  outline: none;\n}\na {\n  background: transparent;\n  text-decoration: none;\n  outline: none;\n}\n',
            },
          ],
          id: 702,
          tagName: 'STYLE',
        },
        {
          nodeType: 1,
          attributes: [{ name: 'type', value: 'text/css' }],
          childNodes: [
            {
              nodeType: 3,
              id: 3002,
              textContent:
                '.am-icon {\n  fill: currentColor;\n  background-size: cover;\n  width: 22px;\n  height: 22px;\n}\n.am-icon-xxs {\n  width: 15px;\n  height: 15px;\n}\n.am-icon-xs {\n  width: 18px;\n  height: 18px;\n}\n.am-icon-sm {\n  width: 21px;\n  height: 21px;\n}\n.am-icon-md {\n  width: 22px;\n  height: 22px;\n}\n.am-icon-lg {\n  width: 36px;\n  height: 36px;\n}\n.am-icon-loading {\n  -webkit-animation: cirle-anim 1s linear infinite;\n          animation: cirle-anim 1s linear infinite;\n}\n@-webkit-keyframes cirle-anim {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes cirle-anim {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n',
            },
          ],
          id: 740,
          tagName: 'STYLE',
        },
        {
          nodeType: 1,
          attributes: [{ name: 'type', value: 'text/css' }],
          childNodes: [
            {
              nodeType: 3,
              id: 3080,
              textContent:
                '.am-toast {\n  position: fixed;\n  width: 100%;\n  z-index: 1999;\n  font-size: 14px;\n  text-align: center;\n}\n.am-toast > span {\n  max-width: 50%;\n}\n.am-toast.am-toast-mask {\n  height: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  left: 0;\n  top: 0;\n}\n.am-toast.am-toast-nomask {\n  position: fixed;\n  max-width: 50%;\n  width: auto;\n  left: 50%;\n  top: 50%;\n}\n.am-toast.am-toast-nomask .am-toast-notice {\n  -webkit-transform: translateX(-50%) translateY(-50%);\n      -ms-transform: translateX(-50%) translateY(-50%);\n          transform: translateX(-50%) translateY(-50%);\n}\n.am-toast-notice-content .am-toast-text {\n  min-width: 60px;\n  border-radius: 3px;\n  color: #fff;\n  background-color: rgba(58, 58, 58, 0.9);\n  line-height: 1.5;\n  padding: 9px 15px;\n}\n.am-toast-notice-content .am-toast-text.am-toast-text-icon {\n  border-radius: 5px;\n  padding: 15px 15px;\n}\n.am-toast-notice-content .am-toast-text.am-toast-text-icon .am-toast-text-info {\n  margin-top: 6px;\n}\n',
            },
          ],
          id: 779,
          tagName: 'STYLE',
        },
        {
          nodeType: 1,
          attributes: [{ name: 'type', value: 'text/css' }],
          childNodes: [
            {
              nodeType: 3,
              id: 3159,
              textContent:
                '#__vconsole{color:#000;font-size:13px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif}#__vconsole .vc-max-height{max-height:19.23076923em}#__vconsole .vc-max-height-line{max-height:3.38461538em}#__vconsole .vc-min-height{min-height:3.07692308em}#__vconsole dd,#__vconsole dl,#__vconsole pre{margin:0}#__vconsole .vc-switch{display:block;position:fixed;right:.76923077em;bottom:.76923077em;color:#fff;background-color:#04be02;line-height:1;font-size:1.07692308em;padding:.61538462em 1.23076923em;z-index:10000;border-radius:.30769231em;box-shadow:0 0 .61538462em rgba(0,0,0,.4)}#__vconsole .vc-mask{top:0;background:transparent;z-index:10001;transition:background .3s;-webkit-tap-highlight-color:transparent;overflow-y:scroll}#__vconsole .vc-mask,#__vconsole .vc-panel{display:none;position:fixed;left:0;right:0;bottom:0}#__vconsole .vc-panel{min-height:85%;z-index:10002;background-color:#efeff4;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-transform:translateY(100%);transform:translateY(100%)}#__vconsole .vc-tabbar{border-bottom:1px solid #d9d9d9;overflow-x:auto;height:3em;width:auto;white-space:nowrap}#__vconsole .vc-tabbar .vc-tab{display:inline-block;line-height:3em;padding:0 1.15384615em;border-right:1px solid #d9d9d9;text-decoration:none;color:#000;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}#__vconsole .vc-tabbar .vc-tab:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-tabbar .vc-tab.vc-actived{background-color:#fff}#__vconsole .vc-content{background-color:#fff;overflow-x:hidden;overflow-y:auto;position:absolute;top:3.07692308em;left:0;right:0;bottom:3.07692308em;-webkit-overflow-scrolling:touch}#__vconsole .vc-content.vc-has-topbar{top:5.46153846em}#__vconsole .vc-topbar{background-color:#fbf9fe;display:flex;display:-webkit-box;flex-direction:row;flex-wrap:wrap;-webkit-box-direction:row;-webkit-flex-wrap:wrap;width:100%}#__vconsole .vc-topbar .vc-toptab{display:none;flex:1;-webkit-box-flex:1;line-height:2.30769231em;padding:0 1.15384615em;border-bottom:1px solid #d9d9d9;text-decoration:none;text-align:center;color:#000;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}#__vconsole .vc-topbar .vc-toptab.vc-toggle{display:block}#__vconsole .vc-topbar .vc-toptab:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-topbar .vc-toptab.vc-actived{border-bottom:1px solid #3e82f7}#__vconsole .vc-logbox{display:none;position:relative;min-height:100%}#__vconsole .vc-logbox i{font-style:normal}#__vconsole .vc-logbox .vc-log{padding-bottom:3em;-webkit-tap-highlight-color:transparent}#__vconsole .vc-logbox .vc-log:empty:before{content:"Empty";color:#999;position:absolute;top:45%;left:0;right:0;bottom:0;font-size:1.15384615em;text-align:center}#__vconsole .vc-logbox .vc-item{margin:0;padding:.46153846em .61538462em;overflow:hidden;line-height:1.3;border-bottom:1px solid #eee;word-break:break-word}#__vconsole .vc-logbox .vc-item-info{color:#6a5acd}#__vconsole .vc-logbox .vc-item-debug{color:#daa520}#__vconsole .vc-logbox .vc-item-warn{color:orange;border-color:#ffb930;background-color:#fffacd}#__vconsole .vc-logbox .vc-item-error{color:#dc143c;border-color:#f4a0ab;background-color:#ffe4e1}#__vconsole .vc-logbox .vc-log.vc-log-partly .vc-item{display:none}#__vconsole .vc-logbox .vc-log.vc-log-partly-error .vc-item-error,#__vconsole .vc-logbox .vc-log.vc-log-partly-info .vc-item-info,#__vconsole .vc-logbox .vc-log.vc-log-partly-log .vc-item-log,#__vconsole .vc-logbox .vc-log.vc-log-partly-warn .vc-item-warn{display:block}#__vconsole .vc-logbox .vc-item .vc-item-content{margin-right:4.61538462em;display:block}#__vconsole .vc-logbox .vc-item .vc-item-meta{color:#888;float:right;width:4.61538462em;text-align:right}#__vconsole .vc-logbox .vc-item.vc-item-nometa .vc-item-content{margin-right:0}#__vconsole .vc-logbox .vc-item.vc-item-nometa .vc-item-meta{display:none}#__vconsole .vc-logbox .vc-item .vc-item-code{display:block;white-space:pre-wrap;overflow:auto;position:relative}#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-input,#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output{padding-left:.92307692em}#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-input:before,#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output:before{content:"\\203A";position:absolute;top:-.23076923em;left:0;font-size:1.23076923em;color:#6a5acd}#__vconsole .vc-logbox .vc-item .vc-item-code.vc-item-code-output:before{content:"\\2039"}#__vconsole .vc-logbox .vc-item .vc-fold{display:block;overflow:auto;-webkit-overflow-scrolling:touch}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer{display:block;font-style:italic;padding-left:.76923077em;position:relative}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:active{background-color:#e6e6e6}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer:before{content:"";position:absolute;top:.30769231em;left:.15384615em;width:0;height:0;border:.30769231em solid transparent;border-left-color:#000}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer.vc-toggle:before{top:.46153846em;left:0;border-top-color:#000;border-left-color:transparent}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner{display:none;margin-left:.76923077em}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner.vc-toggle{display:block}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-inner .vc-code-key{margin-left:.76923077em}#__vconsole .vc-logbox .vc-item .vc-fold .vc-fold-outer .vc-code-key{margin-left:0}#__vconsole .vc-logbox .vc-code-key{color:#905}#__vconsole .vc-logbox .vc-code-private-key{color:#d391b5}#__vconsole .vc-logbox .vc-code-function{color:#905;font-style:italic}#__vconsole .vc-logbox .vc-code-boolean,#__vconsole .vc-logbox .vc-code-number{color:#0086b3}#__vconsole .vc-logbox .vc-code-string{color:#183691}#__vconsole .vc-logbox .vc-code-null,#__vconsole .vc-logbox .vc-code-undefined{color:#666}#__vconsole .vc-logbox .vc-cmd{position:absolute;height:3.07692308em;left:0;right:0;bottom:0;border-top:1px solid #d9d9d9;display:block!important}#__vconsole .vc-logbox .vc-cmd .vc-cmd-input-wrap{display:block;height:2.15384615em;margin-right:3.07692308em;padding:.46153846em .61538462em}#__vconsole .vc-logbox .vc-cmd .vc-cmd-input{width:100%;border:none;resize:none;outline:none;padding:0;font-size:.92307692em}#__vconsole .vc-logbox .vc-cmd .vc-cmd-input::-webkit-input-placeholder{line-height:2.15384615em}#__vconsole .vc-logbox .vc-cmd .vc-cmd-btn{position:absolute;top:0;right:0;bottom:0;width:3.07692308em;border:none;background-color:#efeff4;outline:none;-webkit-touch-callout:none;font-size:1em}#__vconsole .vc-logbox .vc-cmd .vc-cmd-btn:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-logbox .vc-group .vc-group-preview{-webkit-touch-callout:none}#__vconsole .vc-logbox .vc-group .vc-group-preview:active{background-color:#e6e6e6}#__vconsole .vc-logbox .vc-group .vc-group-detail{display:none;padding:0 0 .76923077em 1.53846154em;border-bottom:1px solid #eee}#__vconsole .vc-logbox .vc-group.vc-actived .vc-group-detail{display:block;background-color:#fbf9fe}#__vconsole .vc-logbox .vc-group.vc-actived .vc-table-row{background-color:#fff}#__vconsole .vc-logbox .vc-group.vc-actived .vc-group-preview{background-color:#fbf9fe}#__vconsole .vc-logbox .vc-table .vc-table-row{display:flex;display:-webkit-flex;flex-direction:row;flex-wrap:wrap;-webkit-box-direction:row;-webkit-flex-wrap:wrap;overflow:hidden;border-bottom:1px solid #eee}#__vconsole .vc-logbox .vc-table .vc-table-row.vc-left-border{border-left:1px solid #eee}#__vconsole .vc-logbox .vc-table .vc-table-col{flex:1;-webkit-box-flex:1;padding:.23076923em .30769231em;border-left:1px solid #eee;overflow:auto;white-space:pre-wrap;word-break:break-word;-webkit-overflow-scrolling:touch}#__vconsole .vc-logbox .vc-table .vc-table-col:first-child{border:none}#__vconsole .vc-logbox .vc-table .vc-small .vc-table-col{padding:0 .30769231em;font-size:.92307692em}#__vconsole .vc-logbox .vc-table .vc-table-col-2{flex:2;-webkit-box-flex:2}#__vconsole .vc-logbox .vc-table .vc-table-col-3{flex:3;-webkit-box-flex:3}#__vconsole .vc-logbox .vc-table .vc-table-col-4{flex:4;-webkit-box-flex:4}#__vconsole .vc-logbox .vc-table .vc-table-col-5{flex:5;-webkit-box-flex:5}#__vconsole .vc-logbox .vc-table .vc-table-col-6{flex:6;-webkit-box-flex:6}#__vconsole .vc-logbox .vc-table .vc-table-row-error{border-color:#f4a0ab;background-color:#ffe4e1}#__vconsole .vc-logbox .vc-table .vc-table-row-error .vc-table-col{color:#dc143c;border-color:#f4a0ab}#__vconsole .vc-logbox .vc-table .vc-table-col-title{font-weight:700}#__vconsole .vc-logbox.vc-actived{display:block}#__vconsole .vc-toolbar{border-top:1px solid #d9d9d9;line-height:3em;position:absolute;left:0;right:0;bottom:0;display:flex;display:-webkit-box;flex-direction:row;-webkit-box-direction:row}#__vconsole .vc-toolbar .vc-tool{display:none;text-decoration:none;color:#000;width:50%;flex:1;-webkit-box-flex:1;text-align:center;position:relative;-webkit-touch-callout:none}#__vconsole .vc-toolbar .vc-tool.vc-global-tool,#__vconsole .vc-toolbar .vc-tool.vc-toggle{display:block}#__vconsole .vc-toolbar .vc-tool:active{background-color:rgba(0,0,0,.15)}#__vconsole .vc-toolbar .vc-tool:after{content:" ";position:absolute;top:.53846154em;bottom:.53846154em;right:0;border-left:1px solid #d9d9d9}#__vconsole .vc-toolbar .vc-tool-last:after{border:none}#__vconsole.vc-toggle .vc-switch{display:none}#__vconsole.vc-toggle .vc-mask{background:rgba(0,0,0,.6);display:block}#__vconsole.vc-toggle .vc-panel{-webkit-transform:translate(0);transform:translate(0)}',
            },
          ],
          id: 819,
          tagName: 'STYLE',
        },
        {
          nodeType: 1,
          attributes: [{ name: 'type', value: 'text/css' }],
          childNodes: [
            {
              nodeType: 3,
              id: 3239,
              textContent:
                '.vcelm-node{color:#183691}.vcelm-k{color:#0086b3}.vcelm-v{color:#905}.vcelm-l{padding-left:8px;position:relative;word-wrap:break-word;line-height:1}.vcelm-l.vc-toggle>.vcelm-node{display:block}.vcelm-l .vcelm-node:active{background-color:rgba(0,0,0,.15)}.vcelm-l.vcelm-noc .vcelm-node:active{background-color:transparent}.vcelm-t{white-space:pre-wrap;word-wrap:break-word}.vcelm-l .vcelm-l{display:none}.vcelm-l.vc-toggle>.vcelm-l{margin-left:4px;display:block}.vcelm-l:before{content:"";display:block;position:absolute;top:6px;left:3px;width:0;height:0;border:3px solid transparent;border-left-color:#000}.vcelm-l.vc-toggle:before{display:block;top:6px;left:0;border-top-color:#000;border-left-color:transparent}.vcelm-l.vcelm-noc:before{display:none}',
            },
          ],
          id: 860,
          tagName: 'STYLE',
        },
        {
          nodeType: 1,
          attributes: [
            { name: 'type', value: 'text/css' },
            { name: 'data-styled-components', value: '' },
            { name: 'data-styled-components-is-local', value: 'false' },
          ],
          childNodes: [
            {
              nodeType: 3,
              id: 3320,
              textContent:
                '\n/* sc-component-id: sc-global-2084186388 */\n*,:after,:before{box-sizing:border-box;}html,body{background:rgb(237,236,242);margin:0;padding:0;font-size:0.28rem;font-family:sans-serif;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-highlight-color:none;-webkit-tap-highlight-color:none;}a,a._ss-hover,a:active{color:#4a8cf2;outline:none;text-decoration:none;}#react-container{position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden;}',
            },
          ],
          id: 902,
          tagName: 'STYLE',
        },
        {
          nodeType: 1,
          attributes: [
            { name: 'type', value: 'text/javascript' },
            { name: 'charset', value: 'utf-8' },
            { name: 'async', value: '' },
            {
              name: 'src',
              value: '/h5_mobile_assets/10.befe67f7c3d20a4d251e.js',
            },
          ],
          id: 945,
          tagName: 'SCRIPT',
        },
        {
          nodeType: 1,
          attributes: [
            { name: 'type', value: 'text/javascript' },
            { name: 'charset', value: 'utf-8' },
            { name: 'async', value: '' },
            {
              name: 'src',
              value: '/h5_mobile_assets/24.befe67f7c3d20a4d251e.js',
            },
          ],
          id: 989,
          tagName: 'SCRIPT',
        },
        {
          nodeType: 1,
          attributes: [
            { name: 'type', value: 'text/css' },
            {
              name: 'data-styled-components',
              value: 'PxwSL zdRNn dcXqbE eEFBf Cttpz dmsOSO cILheu hKggso',
            },
            { name: 'data-styled-components-is-local', value: 'true' },
          ],
          childNodes: [
            {
              nodeType: 3,
              id: 3402,
              textContent:
                '\n/* sc-component-id: sc-jTzLTM */\n\n.PxwSL{position:fixed;bottom:0;left:0;right:0;height:1.1rem;z-index:10;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;box-shadow:0 -1px 0 0 rgba(0,0,0,0.1);}.PxwSL .ha{color:#4a8cf2;}.PxwSL .ha div:first-child{display:inline-block;width:0.4rem;height:0.4rem;background:url(https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252Fcd6dc121ba012bf25684ad453eb7c4f7.png);background-size:cover;}.PxwSL .ch{color:#4a8cf2;}.PxwSL .ch div:first-child{display:inline-block;width:0.4rem;height:0.4rem;background:url(https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252F1eda307b4d1b2781e21200db71df1947.png);background-size:cover;}.PxwSL .cu{color:#4a8cf2;}.PxwSL .cu div:first-child{display:inline-block;width:0.4rem;height:0.4rem;background:url(https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252Fb07fdfd9341561c48cc76c6ec5a7e785.png);background-size:cover;}.PxwSL .my{color:#4a8cf2;}.PxwSL .my div:first-child{display:inline-block;width:0.4rem;height:0.4rem;background:url(https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252Ffce8437c482bae991e4e933e23a2367e.png);background-size:cover;}',
            },
            {
              nodeType: 3,
              id: 3485,
              textContent:
                '\n/* sc-component-id: sc-fjdhpX */\n\n.dcXqbE{display:inline-block;width:0.4rem;height:0.4rem;background:url(https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252F36ea693c3438afe8ec72676177185632.png);background-size:cover;}',
            },
            {
              nodeType: 3,
              id: 3569,
              textContent:
                '\n/* sc-component-id: sc-jzJRlG */\n\n.Cttpz{display:inline-block;width:0.4rem;height:0.4rem;background:url(https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252Fa035c38de8fbcfd9b1ecc7536743029b.png);background-size:cover;position:relative;}',
            },
            {
              nodeType: 3,
              id: 3654,
              textContent:
                '\n/* sc-component-id: sc-cSHVUG */\n\n.dmsOSO{display:inline-block;width:0.4rem;height:0.4rem;background:url(https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252F0bb81856afb6c3c5470fe059e7421e92.png);background-size:cover;}',
            },
            {
              nodeType: 3,
              id: 3740,
              textContent:
                '\n/* sc-component-id: sc-kAzzGY */\n\n.cILheu{display:inline-block;width:0.4rem;height:0.4rem;background:url(https://app.sessionstack.com/api/resources/5b0611b6631089fd1ffeedf8/1527124405994/https%253A%252F%252Fdev-yingid.ikcrm.com%252Fwx%252F1%252Fh5%252Ferrors%252Fdenied/%252Fh5_mobile_assets%252F057f688902f9fc1f876efe7e296ee019.png);background-size:cover;}',
            },
            {
              nodeType: 3,
              id: 3827,
              textContent:
                '\n/* sc-component-id: sc-chPdSV */\n\n.eEFBf{-webkit-flex:1;-ms-flex:1;flex:1;display:block;text-decoration:none;text-align:center;color:#000;font-size:0.24rem;color:#9b9b9b;}.eEFBf.active{color:#4a8cf2;background:#fff;}',
            },
            {
              nodeType: 3,
              id: 3915,
              textContent:
                '\n/* sc-component-id: sc-kgoBCf */\n\n.zdRNn{-webkit-flex:1;-ms-flex:1;flex:1;display:block;text-decoration:none;text-align:center;color:#000;font-size:0.24rem;color:#9b9b9b;}.zdRNn.active{color:#4a8cf2;background:#fff;}',
            },
            { nodeType: 3, id: 4004, textContent: '' },
            {
              nodeType: 3,
              id: 4094,
              textContent:
                '\n/* sc-component-id: sc-kpOJdX */\n\n.hKggso{height:100%;overflow:hidden;}',
            },
            { nodeType: 3, id: 4185, textContent: '' },
            { nodeType: 3, id: 4277, textContent: '' },
            { nodeType: 3, id: 4370, textContent: '' },
            { nodeType: 3, id: 4464, textContent: '' },
            { nodeType: 3, id: 4559, textContent: '' },
            { nodeType: 3, id: 4655, textContent: '' },
            { nodeType: 3, id: 4752, textContent: '' },
            { nodeType: 3, id: 4850, textContent: '' },
            { nodeType: 3, id: 4949, textContent: '' },
            { nodeType: 3, id: 5049, textContent: '' },
            { nodeType: 3, id: 5150, textContent: '' },
            { nodeType: 3, id: 5252, textContent: '' },
            { nodeType: 3, id: 5355, textContent: '' },
            { nodeType: 3, id: 5459, textContent: '' },
            { nodeType: 3, id: 5564, textContent: '' },
            { nodeType: 3, id: 5670, textContent: '' },
            { nodeType: 3, id: 5777, textContent: '' },
            { nodeType: 3, id: 5885, textContent: '' },
          ],
          id: 1034,
          tagName: 'STYLE',
        },
      ],
      id: 5,
      tagName: 'HEAD',
    },
    { nodeType: 3, id: 9, textContent: '\n\n' },
    {
      nodeType: 1,
      childNodes: [
        { nodeType: 3, id: 1080, textContent: '\n  ' },
        {
          nodeType: 1,
          attributes: [{ name: 'id', value: 'react-container' }],
          childNodes: [
            {
              nodeType: 1,
              attributes: [
                { name: 'data-reactroot', value: '' },
                { name: 'class', value: 'sc-ifAKCX bVpaGR' },
              ],
              childNodes: [
                { nodeType: 8, id: 6215, textContent: ' react-empty: 2 ' },
                {
                  nodeType: 1,
                  attributes: [{ name: 'class', value: 'sc-kpOJdX hKggso' }],
                  childNodes: [
                    {
                      nodeType: 1,
                      attributes: [{ name: 'class', value: 'sc-jTzLTM PxwSL' }],
                      childNodes: [
                        {
                          nodeType: 1,
                          attributes: [
                            { name: 'class', value: 'sc-kgoBCf zdRNn ha' },
                            { name: 'aria-current', value: 'true' },
                            { name: 'href', value: '#/Hawkeye' },
                          ],
                          childNodes: [
                            {
                              nodeType: 1,
                              attributes: [
                                {
                                  name: 'class',
                                  value: 'sc-fjdhpX dcXqbE',
                                },
                              ],
                              id: 9452,
                              tagName: 'DIV',
                            },
                            {
                              nodeType: 1,
                              childNodes: [
                                {
                                  nodeType: 3,
                                  id: 11324,
                                  textContent: '\u9e70\u773c',
                                },
                              ],
                              id: 9590,
                              tagName: 'DIV',
                            },
                          ],
                          id: 7874,
                          tagName: 'A',
                        },
                        {
                          nodeType: 1,
                          attributes: [
                            { name: 'class', value: 'sc-chPdSV eEFBf' },
                            { name: 'aria-current', value: 'false' },
                            { name: 'href', value: '#/Chat' },
                          ],
                          childNodes: [
                            {
                              nodeType: 1,
                              attributes: [
                                { name: 'class', value: 'sc-jzJRlG Cttpz' },
                                { name: 'id', value: 'all-unread' },
                              ],
                              childNodes: [
                                {
                                  nodeType: 1,
                                  attributes: [
                                    { name: 'data-reactroot', value: '' },
                                  ],
                                  id: 11475,
                                  tagName: 'SPAN',
                                },
                              ],
                              id: 9729,
                              tagName: 'DIV',
                            },
                            {
                              nodeType: 1,
                              childNodes: [
                                {
                                  nodeType: 3,
                                  id: 11627,
                                  textContent: '\u6d88\u606f',
                                },
                              ],
                              id: 9869,
                              tagName: 'DIV',
                            },
                          ],
                          id: 8000,
                          tagName: 'A',
                        },
                        {
                          nodeType: 1,
                          attributes: [
                            { name: 'class', value: 'sc-chPdSV eEFBf' },
                            { name: 'aria-current', value: 'false' },
                            { name: 'href', value: '#/Customer' },
                          ],
                          childNodes: [
                            {
                              nodeType: 1,
                              attributes: [
                                {
                                  name: 'class',
                                  value: 'sc-cSHVUG dmsOSO',
                                },
                              ],
                              id: 10010,
                              tagName: 'DIV',
                            },
                            {
                              nodeType: 1,
                              childNodes: [
                                {
                                  nodeType: 3,
                                  id: 11780,
                                  textContent: '\u5ba2\u6237',
                                },
                              ],
                              id: 10152,
                              tagName: 'DIV',
                            },
                          ],
                          id: 8127,
                          tagName: 'A',
                        },
                        {
                          nodeType: 1,
                          attributes: [
                            { name: 'class', value: 'sc-chPdSV eEFBf' },
                            { name: 'aria-current', value: 'false' },
                            { name: 'href', value: '#/My' },
                          ],
                          childNodes: [
                            {
                              nodeType: 1,
                              attributes: [
                                {
                                  name: 'class',
                                  value: 'sc-kAzzGY cILheu',
                                },
                              ],
                              id: 10295,
                              tagName: 'DIV',
                            },
                            {
                              nodeType: 1,
                              childNodes: [
                                {
                                  nodeType: 3,
                                  id: 11934,
                                  textContent: '\u6211\u7684',
                                },
                              ],
                              id: 10439,
                              tagName: 'DIV',
                            },
                          ],
                          id: 8255,
                          tagName: 'A',
                        },
                      ],
                      id: 7259,
                      tagName: 'DIV',
                    },
                  ],
                  id: 6327,
                  tagName: 'DIV',
                },
                { nodeType: 8, id: 6440, textContent: ' react-empty: 5 ' },
                { nodeType: 8, id: 6554, textContent: ' react-empty: 6 ' },
                { nodeType: 8, id: 6669, textContent: ' react-empty: 7 ' },
                {
                  nodeType: 1,
                  attributes: [{ name: 'class', value: 'sc-jTzLTM PxwSL' }],
                  childNodes: [
                    {
                      nodeType: 1,
                      attributes: [
                        { name: 'class', value: 'sc-kgoBCf zdRNn ha' },
                        { name: 'aria-current', value: 'true' },
                        { name: 'href', value: '#/Hawkeye' },
                      ],
                      childNodes: [
                        {
                          nodeType: 1,
                          attributes: [
                            { name: 'class', value: 'sc-fjdhpX dcXqbE' },
                          ],
                          id: 8384,
                          tagName: 'DIV',
                        },
                        {
                          nodeType: 1,
                          childNodes: [
                            {
                              nodeType: 3,
                              id: 10584,
                              textContent: '\u9e70\u773c',
                            },
                          ],
                          id: 8514,
                          tagName: 'DIV',
                        },
                      ],
                      id: 7380,
                      tagName: 'A',
                    },
                    {
                      nodeType: 1,
                      attributes: [
                        { name: 'class', value: 'sc-chPdSV eEFBf' },
                        { name: 'aria-current', value: 'false' },
                        { name: 'href', value: '#/Chat' },
                      ],
                      childNodes: [
                        {
                          nodeType: 1,
                          attributes: [
                            { name: 'class', value: 'sc-jzJRlG Cttpz' },
                            { name: 'id', value: 'all-unread' },
                          ],
                          childNodes: [
                            {
                              nodeType: 1,
                              attributes: [
                                { name: 'data-reactroot', value: '' },
                              ],
                              id: 10730,
                              tagName: 'SPAN',
                            },
                          ],
                          id: 8645,
                          tagName: 'DIV',
                        },
                        {
                          nodeType: 1,
                          childNodes: [
                            {
                              nodeType: 3,
                              id: 10877,
                              textContent: '\u6d88\u606f',
                            },
                          ],
                          id: 8777,
                          tagName: 'DIV',
                        },
                      ],
                      id: 7502,
                      tagName: 'A',
                    },
                    {
                      nodeType: 1,
                      attributes: [
                        { name: 'class', value: 'sc-chPdSV eEFBf' },
                        { name: 'aria-current', value: 'false' },
                        { name: 'href', value: '#/Customer' },
                      ],
                      childNodes: [
                        {
                          nodeType: 1,
                          attributes: [
                            { name: 'class', value: 'sc-cSHVUG dmsOSO' },
                          ],
                          id: 8910,
                          tagName: 'DIV',
                        },
                        {
                          nodeType: 1,
                          childNodes: [
                            {
                              nodeType: 3,
                              id: 11025,
                              textContent: '\u5ba2\u6237',
                            },
                          ],
                          id: 9044,
                          tagName: 'DIV',
                        },
                      ],
                      id: 7625,
                      tagName: 'A',
                    },
                    {
                      nodeType: 1,
                      attributes: [
                        { name: 'class', value: 'sc-chPdSV eEFBf' },
                        { name: 'aria-current', value: 'false' },
                        { name: 'href', value: '#/My' },
                      ],
                      childNodes: [
                        {
                          nodeType: 1,
                          attributes: [
                            { name: 'class', value: 'sc-kAzzGY cILheu' },
                          ],
                          id: 9179,
                          tagName: 'DIV',
                        },
                        {
                          nodeType: 1,
                          childNodes: [
                            {
                              nodeType: 3,
                              id: 11174,
                              textContent: '\u6211\u7684',
                            },
                          ],
                          id: 9315,
                          tagName: 'DIV',
                        },
                      ],
                      id: 7749,
                      tagName: 'A',
                    },
                  ],
                  id: 6785,
                  tagName: 'DIV',
                },
                { nodeType: 8, id: 6902, textContent: ' react-empty: 10 ' },
                { nodeType: 8, id: 7020, textContent: ' react-empty: 11 ' },
                { nodeType: 8, id: 7139, textContent: ' react-empty: 12 ' },
              ],
              id: 5994,
              tagName: 'DIV',
            },
          ],
          id: 1127,
          tagName: 'DIV',
        },
        { nodeType: 3, id: 1175, textContent: '\n  ' },
        {
          nodeType: 1,
          attributes: [
            {
              name: 'src',
              value: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js',
            },
          ],
          id: 1224,
          tagName: 'SCRIPT',
        },
        { nodeType: 3, id: 1274, textContent: '\n  ' },
        {
          nodeType: 1,
          childNodes: [
            {
              nodeType: 3,
              id: 6104,
              textContent:
                "\n    // \u5237\u65b0\u9875\u9762\u4fdd\u5b58userToken\n    // if (window.location.href.indexOf('userToken') === -1) {\n    //   window.history.replaceState({}, '', window.location.href + '&userToken=' + AppConf.api.userToken);\n    // }\n\n    wx.config({\n      debug: false,\n      beta: true,\n      appId: AppConf.corpId,\n      timestamp: AppConf.jsapiConfig.timestamp,\n      nonceStr: AppConf.jsapiConfig.noncestr,\n      signature: AppConf.jsapiConfig.signature,\n      jsApiList: [\n        'onMenuShareAppMessage',\n        'onMenuShareWechat',\n        'onMenuShareTimeline',\n        'shareAppMessage',\n        'shareWechatMessage',\n        'chooseImage',\n        'previewImage',\n        'uploadImage',\n        'downloadImage',\n        'hideOptionMenu',\n        'showOptionMenu',\n        'hideMenuItems',\n        'showMenuItems',\n        'hideAllNonBaseMenuItem',\n        'showAllNonBaseMenuItem',\n        'closeWindow',\n        'scanQRCode',\n        'onHistoryBack',\n      ],\n    });\n    // wx.ready(function() {\n    //   wx.hideOptionMenu();\n    // })\n  ",
            },
          ],
          id: 1325,
          tagName: 'SCRIPT',
        },
        { nodeType: 3, id: 1377, textContent: '\n' },
        {
          nodeType: 1,
          attributes: [
            { name: 'type', value: 'text/javascript' },
            {
              name: 'src',
              value: '/h5_mobile_assets/commons.befe67f7c3d20a4d251e.js',
            },
          ],
          id: 1430,
          tagName: 'SCRIPT',
        },
        {
          nodeType: 1,
          attributes: [
            { name: 'type', value: 'text/javascript' },
            {
              name: 'src',
              value: '/h5_mobile_assets/app.befe67f7c3d20a4d251e.js',
            },
          ],
          id: 1484,
          tagName: 'SCRIPT',
        },
        { nodeType: 3, id: 1539, textContent: '\n\n\n' },
      ],
      id: 14,
      tagName: 'BODY',
    },
  ],
  id: 2,
  tagName: 'HTML',
};
