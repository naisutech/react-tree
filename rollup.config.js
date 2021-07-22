import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import graph from 'rollup-plugin-graph'
import progress from 'rollup-plugin-progress'
import svg from 'rollup-plugin-svg'
import pkg from './package.json'
let graphOptions = { prune: true }

export default [
  {
    input: 'src/Tree.tsx',
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist',
        sourceMap: true,
        exclude: '**/__tests__/**, **/stories/**'
      }),
      commonjs(),
      peerDepsExternal(),
      nodeResolve({ preferBuiltins: true }),
      clear({
        targets: ['dist']
      }),
      graph(graphOptions),
      sizeSnapshot(),
      terser(),
      progress(),
      svg()
    ],
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
      }
    ]
  }
]
