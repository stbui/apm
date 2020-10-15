import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import license from 'rollup-plugin-license';

import pkg from './package.json';

const commitHash = require('child_process').execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();

const plugins = [
    typescript(),
    resolve(),
    commonjs(),
    license({
        banner: `/*! <%= pkg.name %> <%= pkg.version %> (${commitHash}) | https://github.com/stbui/apm */\n\r`,
    }),
];

export default {
    input: 'src/index.ts',
    output: [
        { file: pkg.main, format: 'cjs', exports: 'auto' },
        { file: pkg.module, format: 'es' },
        { file: pkg.browser, format: 'umd', name: 'apmjs' },
        // { file: pkg.browser, format: 'iife', name: 'apmjs' },
    ],
    plugins,
};
