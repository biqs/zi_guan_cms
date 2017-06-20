// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/wechat-manage/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {   //跨域设置
       /* '/notice': {
            target: 'http://160.6.77.208:8080', //http://192.168.98.111:8081/
            changeOrigin: true,
            pathRewrite: {
                '^/notice': '/wechat/notice'
            }    
        },
        '/banner': {
            target: 'http://160.6.77.208:8080', //http://192.168.98.111:8081/
            changeOrigin: true,
            pathRewrite: {
                '^/banner/': '/wechat/banner/'
            }    
        },
*/ 
        //开发环境
        '/server-0': {        
            target: 'http://192.168.98.111:8081', //http://192.168.98.111:8081/ http://192.168.98.111:8081/wechat/category/query/"
            changeOrigin: true,
            pathRewrite: {
                '^/server-0/': '/'
            }    
        },
        //测试环境
        '/server-1': {
            target: 'http://160.6.73.38:8080', //http://192.168.98.111:8081/
            changeOrigin: true,
            pathRewrite: {
                '^/server-1/': '/'
            }    
        } 

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
