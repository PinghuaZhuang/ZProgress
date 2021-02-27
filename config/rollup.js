var babel = require('rollup-plugin-babel');

var pkg = require('../package.json');

var version = pkg.version;

var banner =
`/*!
 * ${pkg.name} ${version} (https://github.com/zphua2016@gmail.com/zprogress)
 * API https://github.com/zphua2016@gmail.com/zprogress/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} zphua2016@gmail.com. All Rights Reserved
 * Licensed under MIT (https://github.com/zphua2016@gmail.com/zprogress/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
    return babel({
        babelrc: false,
        presets: [
            [
                '@babel/preset-env',
                {
                    'targets': {
                        'browsers': 'last 2 versions, > 1%, ie >= 6, Android >= 4, iOS >= 6, and_uc > 9',
                        'node': '0.10'
                    },
                    'modules': false,
                    'loose': false
                }
            ]
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    'helpers': false,
                    'regenerator': false
                }
            ],
            "@babel/plugin-proposal-class-properties"
        ],
        runtimeHelpers: true,
        exclude: 'node_modules/**'
    });
}

exports.name = 'ZProgress';
exports.banner = banner;
exports.getCompiler = getCompiler;
