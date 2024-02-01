import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/Tree.ts'),
      name: 'ReactTree',
      fileName: 'index',
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies || {}),
        'react/jsx-runtime'
      ],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        exports: 'auto'
      }
    }
  }
})
