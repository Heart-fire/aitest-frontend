// ----------------------------------------------------------全局自定义请求
import axios from "axios";

// 是否是开发环境
export const isDev = process.env.NODE_ENV === "development";

// 创建 Axios 实例
const myAxios = axios.create({
  baseURL: isDev ? "http://localhost:8101" : "http://118.25.26.219:8101",
  timeout: 60000,
  withCredentials: true,
});

// 请求拦截器是在每次发送 HTTP 请求之前执行
myAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应拦截器是在每次接收到 HTTP 响应之后执行的。它可以对响应数据进行处理
// 比如统一处理错误、自动重试请求、或者根据状态码做不同的处理。
myAxios.interceptors.response.use(
  function (response) {
    console.log(response);

    const { data } = response;
    // 只有报未登录错误码时，才会拦截并重定向
    if (data.code === 40100) {
      // 不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("/user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 全局导出，外层直接引入
export default myAxios;
