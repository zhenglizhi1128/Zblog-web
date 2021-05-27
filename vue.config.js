module.exports = {
  //配置跨域请求
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置后自动启动浏览器
    hotOnly: true, // 热更新
    proxy: "http://localhost:8090"   // 配置跨域处理,只有一个代理
  }
}

