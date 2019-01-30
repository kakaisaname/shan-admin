module.exports = {
  devServer: {
    port: 8000, //端口
    proxy: {
      "/api": {
        target: "http://118.24.61.194:9501/api"
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        style: "@/assets/styles"
        // common: "@/components/common"
        // components: "@/components",
        // views: "@/views"
      }
    }
  }
};
