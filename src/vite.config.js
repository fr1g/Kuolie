import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import { createVuePlugin } from '@vitejs/plugin-vue2' // ?
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  builder: 'rollup',
  // build:{
  //   rolldownOptions: {
  //     output: {
  //       format: 'esm',
  //     }
  //   }
  // },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 'vue-markdown-render': fileURLToPath(new URL('./node_modules/vue-markdown-renderer/src/MarkdownRenderer.js', import.meta.url))

    }
  },
  plugins: [
    vue2({
      runtimeCompiler: true,
    }),
    // legacy({
    //   targets: ['ie >= 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    // }),
    tailwindcss()
    // createVuePlugin.vueTemplateOptions({
    //   runtimeCompiler: true,
    // })
  ],
  base: './',
})
