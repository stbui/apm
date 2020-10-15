# Vue

```
npm install --save @stbui/apmjs @stbui/apmjs-plugin-vue
```

```js
import Vue from 'vue';

import apmjs from '@stbui/apmjs';
import apmPluginVue from '@stbui/apmjs-plugin-vue';

apmjs.start({
    apiKey: '申请的key',
    plugins: [apmPluginReact],
});
```
