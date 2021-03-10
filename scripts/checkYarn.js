if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
    console.warn('\u001b[33m 请使用yarn命令工具\u001b[39m\n');
    process.exit(1);
}
