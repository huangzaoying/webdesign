let { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  // 配置跨域
  devServer: {
    proxy: {
      '/api': {
        // http://localhost:8080/api => http://124.223.69.156:3300/api
        target: 'http://124.223.69.156:3300',
        // http://124.223.69.156:3300
        changeOrigin: true,
        // vite 相关的 
        // webpack 

      }
    }
  }
})
