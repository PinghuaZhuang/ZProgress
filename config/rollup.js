var typescript = require('rollup-plugin-typescript2');

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
    opt = opt || {
        tsconfigOverride: { compilerOptions : { module: 'ES2015' } }
    }

    return typescript(opt);
}

exports.name = 'zprogress.umd';
exports.banner = banner;
exports.getCompiler = getCompiler;
