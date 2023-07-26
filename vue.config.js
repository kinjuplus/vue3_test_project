const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
     proxy:{
       '/api':{
         target: 'http://localhost:5000/api/',
         pathRewrite: {'^/api':''},
         changeOrigin: true,
         ws: true
       }
     }
  }
});
