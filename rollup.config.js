const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel').default;
const postcss = require('rollup-plugin-postcss');

module.exports = {
  input: 'src/index.jsx',  // Main entry point of your library
  output: [
    {
      file: 'lib/index.js',  // Output file for the CommonJS version
      format: 'cjs',
      sourcemap: true,  // Generates a source map to facilitate debugging
    },
    {
      file: 'lib/index.esm.js',  // Output file for the ES Modules version
      format: 'esm',
      sourcemap: true,  // Generates a source map for the ES Modules version
    }
  ],
  plugins: [
    resolve(),  // Allows Rollup to resolve modules from node_modules
    commonjs(),  // Converts CommonJS modules to ES Modules
    babel({
      exclude: 'node_modules/**',  // Prevents transpiling modules in node_modules
      babelHelpers: 'bundled',  // Includes necessary Babel helpers in the bundle
    }),
    postcss({
      extract: false,  // Prevents extracting CSS into a separate file
      minimize: false, // Prevents minifying the CSS files
    }),
  ],
  external: ['react', 'react-dom'],  // Excludes React and ReactDOM from the final bundle
};
