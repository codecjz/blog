const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/blog/',
  outputDir: 'dist',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: 'text-loader'
        }
      ]
    },
    // devServer: {
    //   proxy: {
    //     '/chat': {
    //       target: 'https://api.openai.com/v1/',// 后端接口
    //       changeOrigin: true, // 是否跨域
    //       pathRewrite: {
    //         '/chat': ''
    //       }
    //     }
    //   }
    // }
  }
})
