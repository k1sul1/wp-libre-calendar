import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

const basepath = 'src/';

export default {
  entry: `${basepath}/js/admin.js`,
  dest: `pub/admin.js`,
  //cache: bundle,
  format: `umd`,
  plugins: [
  json({
      include: `${basepath}/shared-variables.json`,  // Default: undefined
  }),
  buble({
    exclude: [`${basepath}/shared-variables.json`]
  }),
  nodeResolve({
    jsnext: true,
    main: true,
    exclude: [`${basepath}/src/shared-variables.json`]
  }),
  commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: `node_modules/**`,  // Default: undefined
      exclude: [ `node_modules/lodash-es/**`, `${basepath}/shared-variables.json` ],  // Default: undefined

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: [ `.js`, `.coffee` ],  // Default: [ `.js` ]

      // if true then uses of `global` won`t be dealt with by this plugin
      ignoreGlobal: false,  // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: true,  // Default: true

      // explicitly specify unresolvable named exports
      // (see below for more details)
      namedExports: { './module.js': ['foo', 'bar' ] }  // Default: undefined
    })

  ]
}
