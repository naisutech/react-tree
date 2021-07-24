import typescript from '@rollup/plugin-typescript'
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

export default [
  {
    input: 'src/Tree.tsx',
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      clear({
        targets: ['dist']
      }),
      peerDepsExternal(),
      nodeResolve({ preferBuiltins: false }),
      typescript({
        sourceMap: true,
        exclude: '**/__tests__/**, **/stories/**, **/mocks/**'
      }),
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
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'auto'
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        exports: 'auto'
      }
    ],
    external: ['react', 'react-dom']
  }
]
