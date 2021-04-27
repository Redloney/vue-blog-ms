import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    open: true,
  },
  plugins: [
    vue(),
    // element-plus 按需加载
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        resolveStyle: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "_styles/scss/global.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '_assets': path.resolve(__dirname, './src/assets'),
      '_styles': path.resolve(__dirname, './src/assets/styles'),
      '_components': path.resolve(__dirname, './src/components'),
      '_pages': path.resolve(__dirname, './src/pages')
    }
  },
})
