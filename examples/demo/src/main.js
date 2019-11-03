// import Apm from 'apm';
// Apm('1dw43f34232424');

import { h, render } from './core';
import { useRoutes, push } from './core/routes';
import Network from './network';

function running() {
    // 测试变量
    stbui;
}
function promiseError() {
    new Promise((resolve, reject) => {
        reject();
    });
}
function jsload() {
    var script = document.createElement('script');
    script.src = `stbui.js`;
    document.body.appendChild(script);
}
function cssload() {
    var css = document.createElement('link');
    css.type = `text/css`;
    css.rel = 'stylesheet';
    css.href = `stbui.css`;
    document.head.appendChild(css);
}
function imgload() {
    var img = document.createElement('img');
    img.src = `stbui.png`;
    document.body.appendChild(img);
}
// 测试ajax
function ajax() {
    // var xhr = new XMLHttpRequest();
    // xhr.open('get', '/xxx');
}
function ajaxTimeout() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 3000;
    xhr.open('get', '/stbui', true);
    xhr.setRequestHeader('content-type', 'application/json;charset=utf-8');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
}
function ajaxFailed() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 3000;
    xhr.open('get', '/stbui', true);
    xhr.setRequestHeader('content-type', 'application/json;charset=utf-8');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
}
function ajaxservererr() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.timeout = 3000;
    xhr.open('get', '/servererr', true);
    xhr.setRequestHeader('content-type', 'application/json;charset=utf-8');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
}

const Home = () => (
    <div>
        <h3>apm-js-sdk debug</h3>
        <p>请打开google浏览器开发者工具</p>

        <button onClick={running}>js执行错误</button>
        <button onClick={promiseError}>Promise错误</button>
        <button onClick={jsload}>资源加载错误</button>
        <button onClick={ajaxFailed}>ajax请求错误</button>
    </div>
);

window.onload = function() {
    const Header = () => (
        <div style={{ height: '64px', background: '#673ab8' }}></div>
    );

    const routes = {
        '/': () => (
            <div>
                <Network />
                <Home />
                <button onClick={() => push('/network')}>Go</button>
            </div>
        ),
        '/home/:id': ({ id }) => (
            <div>
                <p>{id}</p>
                <button onClick={() => push('/')}>Go home</button>
            </div>
        ),
        '/network': () => (
            <div>
                <Network />
                <button onClick={() => push('/')}>Go home</button>
            </div>
        ),
    };

    const App = () => useRoutes(routes);

    render(<App />, document.getElementById('apm'));
};
