module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,     // target是域名的话，需要这个参数，
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}