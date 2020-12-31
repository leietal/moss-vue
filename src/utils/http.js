import axios from "axios";
import { message } from "ant-design-vue";
import router from "@/router";

axios.defaults.timeout = 60000;
axios.defaults.headers = { "X-Requested-With": "XMLHttpRequest" };

message.config({
  duration: 4,
  maxCount: 1,
});

const httpInstance = axios.create({
  baseURL: process.env.VUE_APP_URL,
});

Object.setPrototypeOf(httpInstance, axios);

// 请求拦截
httpInstance.interceptors.request.use(
  (config) => {
    console.info("axios.request------>%o", config);
    return config;
  },
  (e) => {
    console.error("axios.request------>%o", e);
    return Promise.reject(e);
  }
);

// 请求返回
httpInstance.interceptors.response.use(
  (res) => {
    console.info("axios.response------>%o", res);
    if (res.status == 200) {
      const { code, msg } = res.data;
      // 成功处理
      if (["200"].includes(code) || res.headers.code == 200) {
        return Promise.resolve(res.data);
      }
      // 失败统一弹窗处理
      if (["999", "401", "402"].includes(code)) {
        message.error(msg || "系统异常，请稍后再试!");
        // 未登录、登录超时、无权访问，重定向到登录页面
        if (["401", "402"].includes(code)) {
          // 页面跳转
          // router.replace("/login");
          return Promise.reject(res.data);
        }
      }
      // 其他失败不处理
      return Promise.reject(res.data);
    } else {
      message.error("系统异常，请稍后再试!");
      return Promise.reject(res);
    }
  },
  (e) => {
    console.error("axios.response------>%o", e);
    message.error("系统异常，请稍后再试!");
    return Promise.reject(e);
  }
);

export default httpInstance;
