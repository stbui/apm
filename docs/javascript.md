# jssdk 使用

### CDN

```html
<script src="http://apm.stbui.com/apmjs.min.js"></script>
<script>
    apmjs.start('申请的key');
</script>
```

### npm

```
npm install @stbui/apmjs --save
```

# 配置

```js
import apmjs from '@stbui/apmjs';

apmjs.start({
    apiKey: '申请的key',
    appVersion: '1.0.0',
});
```

# 使用

# webpack

```
npm install --save-dev webpack-apmjs-plugins
```

```js
/* webpack.config.js */
const { apmjsBuildReporterPlugin, apmjsSourceMapUploaderPlugin } = require('webpack-apmjs-plugins');

module.exports = {
    devtool: 'source-map', // 创建source maps
    entry: './app.js',
    output: {
        path: __dirname,
        filename: './bundle.js',
    },
    plugins: [
        new apmjsBuildReporterPlugin(
            {
                apiKey: '申请的key',
                appVersion: '1.0.0',
                releaseStage: 'production',
            },
            {
                /* 配置 */
                logLevel: 'warn',
                logger: { debug, info, warn, error },
                path: process.cwd(),
                endpoint: 'https://apm.stbui.com',
            }
        ),
        // source maps
        new apmjsSourceMapUploaderPlugin({
            apiKey: '申请的key',
            appVersion: '1.0.0',
            overwrite: true,
            endpoint: 'https://upload.stbui.com',
        }),
    ],
};
```
