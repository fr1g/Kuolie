import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import { createVuePlugin } from '@vitejs/plugin-vue2' // ?

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {  
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue2({ 
      runtimeCompiler: true,
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    // createVuePlugin.vueTemplateOptions({
    //   runtimeCompiler: true,
    // })
  ],
  base: './', 
})
