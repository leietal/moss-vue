import axios from "axios";
import { message } from "ant-design-vue";

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
    const { code, msg } = res.data;
    if (res.status == 200) {
      // 成功处理
      if (["200"].includes(code)) {
        return Promise.resolve(res.data);
      }
    }
    // 其他失败不处理
    message.error(msg || "系统错误，请稍后再试!");
    return Promise.reject(res.data);
  },
  (e) => {
    console.error("axios.response------>%o", e);
    message.error("系统错误，请稍后再试!");
    return Promise.reject(e);
  }
);

export default httpInstance;
