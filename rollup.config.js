import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import graph from 'rollup-plugin-graph'
import progress from 'rollup-plugin-progress'
import svgr from '@svgr/rollup'
import pkg from './package.json'
let graphOptions = { prune: true }

const universalConfig = {
  input: 'js/index.js',
  plugins: [
    clear({
      targets: ['dist']
    }),
    peerDepsExternal(),
    nodeResolve({ extensions: ['.js', '.svg'] }),
    commonjs(),
    graph(graphOptions),
    sizeSnapshot(),
    terser(),
    progress(),
    svgr({
      svgoConfig: {
        plugins: {
          removeViewBox: false
        }
      }
    })
  ],
  external: ['react', 'react-dom']
}

const umd = {
  ...universalConfig,
  output: {
    file: 'dist/index.umd.js',
    format: 'umd',
    sourcemap: true,
    exports: 'auto',
    globals: { react: 'React' },
    name: 'ReactTree'
  }
}

const es = {
  ...universalConfig,
  output: {
    file: pkg.module,
    format: 'esm',
    sourcemap: true,
    exports: 'auto'
  }
}

const cjs = {
  ...universalConfig,
  output: {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
    exports: 'auto'
  }
}

export default [umd, es, cjs]
