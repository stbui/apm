import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import tsc from 'typescript';

import pkg from './package.json';

const commitHash = require('child_process').execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();

const terserInstance = terser({
    mangle: {
        reserved: ['captureException', 'captureMessage', 'sentryWrapped'],
        properties: {
            regex: /^_[^_]/,
        },
    },
});

const paths = {
    '@apm/core': ['../apm-core/src'],
    '@apm/common': ['../apm-common/src'],
    '@apm/http': ['../apm-http/src'],
};

const plugins = [
    typescript({ typescript: tsc }),
    resolve(),
    commonjs(),
    sourceMaps(),
    license({
        sourcemap: true,
        banner: `/*! <%= pkg.name %> <%= pkg.version %> (${commitHash}) | https://github.com/stbui/apm */`,
    }),
];

if (process.env.NODE_ENV === 'production') {
    plugins = [...plugins, terser(), gzip()];
}

const bundleConfig = {
    input: 'src/index.ts',
    output: {
        format: 'iife',
        name: pkg.name,
        sourcemap: true,
        strict: false,
    },
    context: 'window',
    plugins,
};

export default [
    {
        ...bundleConfig,
        output: {
            ...bundleConfig.output,
            file: 'build/apm.js',
        },
    },
    {
        ...bundleConfig,
        output: {
            ...bundleConfig.output,
            file: 'build/apm.min.js',
        },
        plugins: bundleConfig.plugins.slice(0, -1).concat(terserInstance).concat(bundleConfig.plugins.slice(-1)),
    },
    {
        ...bundleConfig,
        output: {
            ...bundleConfig.output,
            file: 'build/apm.es6.js',
        },
        plugins: [
            typescript({
                tsconfig: 'tsconfig.json',
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        declarationMap: false,
                        module: 'ES2015',
                        paths,
                        target: 'es6',
                    },
                },
                include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)'],
            }),
            ...plugins.slice(1),
        ],
    },
    {
        ...bundleConfig,
        output: {
            ...bundleConfig.output,
            file: 'build/apm.es6.min.js',
        },
        plugins: [
            typescript({
                tsconfig: 'tsconfig.json',
                tsconfigOverride: {
                    compilerOptions: {
                        declaration: false,
                        declarationMap: false,
                        module: 'ES2015',
                        paths,
                        target: 'es6',
                    },
                },
                include: ['*.ts+(|x)', '**/*.ts+(|x)', '../**/*.ts+(|x)'],
            }),
            ...plugins.slice(1).slice(0, -1).concat(terserInstance).concat(bundleConfig.plugins.slice(-1)),
        ],
    },
];
