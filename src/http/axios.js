import axios from "axios"; // 引用axios
import { MessageBox, Message } from "element-ui";
import Qs from "qs"; //引入数据格式化
import router from "@/router";
import { httpPost } from "@/http";
// axios 配置
axios.defaults.timeout = 10000; //设置接口响应时间
axios.defaults.baseURL = "/api"; // 这是调用数据接口,公共接口url+调用接口名
axios.interceptors.request.use(
  config => {
    if (
      config.url === "/auth/home/user/login" ||
      config.url === "/auth/home/user/validateVerifycode" ||
      config.url === "/auth/refreshToken"
    ) {
      // 登录接口
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      };
      config.data = Qs.stringify(config.data);
    } else {
      let token = sessionStorage.getItem("token");
      config.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  response => {
    const { code } =response.data
    if (code === "1001001005") {
      let refreshToken = sessionStorage.getItem("refresh_token");
      let params = { refreshToken: refreshToken };
      httpPost("/auth/home/user/refreshToken", params);
    }
    return response.data;
  },
  error => {
    Message.error("系统异常");
    return Promise.reject(error);
  }
);
export default axios;
