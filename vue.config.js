const path = require('path')
module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: './build',
  devServer: {
    port: 8081,
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@global/baseColor.scss"`
      },
      less: {
        lessOptions: {
          strictMath: true, // 严格模式
          modifyVars: {
            hack: `true; @import "/src/global/baseColor.less";`
          }
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
}
