const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
});
module.exports = {
  // 开发服务器配置
  devServer: {
    client: {
      overlay: false,
    },
  },
  pluginOptions: {},
};
