import axios from "axios";
import Qs from "qs"; //引入数据格式化
import { Message } from "element-ui";
import router from "@/router";

// 从sessionStorage中获取token
function getLocalToken() {
  const token = sessionStorage.getItem("token");
  return `Bearer ${token}`;
}

function refreshToken() {
  // instance是当前request.js中已创建的axios实例
  let refreshToken = sessionStorage.getItem("refresh_token");
  let params = { refreshToken: refreshToken };
  return instance.post("/auth/home/user/refreshToken", params).then(res => {
    return res.result;
  });
}

// 创建一个axios实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
    Authorization: getLocalToken() // headers塞token
  }
});

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在sessionStorage中
instance.setToken = token => {
  instance.defaults.headers["Authorization"] = `Bearer ${token}`;
  sessionStorage.setItem("token", token);
};

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];
instance.interceptors.request.use(
  config => {
    if (getLocalToken()) {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: getLocalToken() // headers塞token
      };
    }
    if (
      config.url === "/auth/home/user/login" ||
      config.url === "/auth/home/user/validateVerifycode" ||
      config.url === "/auth/refreshToken" ||
      config.url === "/auth/home/user/refreshToken"
    ) {
      // 登录接口
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      };
      config.data = Qs.stringify(config.data);
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  response => {
    const { code, message } = response.data;
    if (code === "1001001005") {
      const config = response.config;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then(res => {
            const { jwt_token } = res;
            sessionStorage.setItem("token", jwt_token);
            instance.setToken(jwt_token);
            config.headers["Authorization"] = `Bearer ${jwt_token}`;
            config.baseURL = "/api";
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(jwt_token));
            requests = [];
            return instance(config);
          })
          .catch(res => {
            console.error("refreshtoken error =>", res);
            // window.location.href = "/login";
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise(resolve => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push(token => {
            config.baseURL = "/api";
            config.headers["Authorization"] = `Bearer ${token}`;
            resolve(instance(config));
          });
        });
      }
    }
    if (code === "1001001001") {
      Message.error(message);
      window.sessionStorage.clear();
      router.push({
        path: "/login"
      });
    }
    if (response.headers["content-disposition"]) {
      return response;
    } else {
      if (code !== "1000000000") {
        Message.error(message);
      }
      return response.data;
    }
  },
  error => {
    return Promise.reject(error);
  }
);
export default instance;
