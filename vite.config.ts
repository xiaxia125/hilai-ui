import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression' // 静态资源压缩
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts(),
    // vueSetupExtend(),
    viteCompression({
      verbose: true,
      disable: false, // 不禁用压缩
      deleteOriginFile: false, // 压缩后是否删除原文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 文件类型
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3300,
    open: true,
    https: false
  },
  resolve: {
    // 配置别名
    alias: {
      // '@': resolve(__dirname, 'examples'),
      '@': resolve(__dirname, 'packages')
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
  build: {
    outDir: 'lib',
    // cssCodeSplit: true, // 强制内联CSS
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue', 'element-plus'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    },
    lib: {
      entry: './packages/index.ts',
      name: 'HilaiUI',
      formats: ['es', 'umd'],
      fileName: (format) => `hilai-ui.${format}.js`
    },
  },
})
