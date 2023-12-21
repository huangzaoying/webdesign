let { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  // devServer: {
  //   target: 'http://10.29.42.109:8080'
  // }
  // 配置跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.29.42.109:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
