# React

```
npm install --save @stbui/apmjs @stbui/apmjs-plugin-react
```

```js
import React from 'react';
import ReactDOM from 'react-dom';

import apmjs from '@stbui/apmjs';
import apmPluginReact from '@stbui/apmjs-plugin-react';

apmjs.start({
    apiKey: '申请的key',
    plugins: [apmPluginReact],
});

const ErrorBoundary = apm.getPlugin('ReactjsPlugin');

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('app')
);
```
