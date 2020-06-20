const presets = [
    [
        '@babel/env',
        {
            targets: {
                edge: '17',
                firefox: '60',
                chrome: '67',
                safari: '11.1',
            },
        },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
];

const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    [
        '@babel/plugin-transform-react-jsx',
        {
            // pragma: 'h',
            // pragmaFrag: 'Fragment',
        },
    ],
];

module.exports = { presets, plugins };
