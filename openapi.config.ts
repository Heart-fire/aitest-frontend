/*-------------------------------------------------------------自动生成请求代码-*/
const { generateService } = require("@umijs/openapi");
// 根据哪个地址的接口文档生成
generateService({
  requestLibPath: "import request from '@/request'", //自定义请求方法路径
  schemaPath: "http://localhost:8101/api/v2/api-docs",
  serversPath: "./src", //在哪个页面生成
});

