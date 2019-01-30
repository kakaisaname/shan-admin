// 'use strict'

import axios from "axios";
import { Message } from "element-ui";
import cookies from "vue-cookie";
import router from "@/router.js";

//http://www.myjscode.com/page/article63.html
// let axiosBaseUrl = "";  process.env.NODE_ENV node.js的环境变量 
// if(process.env.NODE_ENV == 'production'){
//     // 部署服务调用正式地址
//     axiosBaseUrl = process.env.baseURL
//     console.log("prod",axiosBaseUrl)
// }else{
//     // 开发测试地址
//     axiosBaseUrl = process.env.baseURL
//     console.log("test",axiosBaseUrl)
// }

//创建实例
let instance = axios.create({
  baseURL: process.env.baseURL,
  timeout: 10000,
  withCredentials: false,//指示是否跨站点访问控制请求,表示跨域请求时是否需要使用凭证
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    // if(store.state.userInfo){
    let userInfo = JSON.parse(cookies.get('userInfo'))
    let currentPath = router.currentRoute.path //当前路径
    if(cookies.get('userInfo') && userInfo &&currentPath != '/'){   //如果为登录页面，不传token uid
      config.headers.token = userInfo.token;
      config.headers.uid = userInfo.uid;
    }
    return config;
}, function (error) {
  // 对请求错误做些什么
   return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // response.headers["access"] = "*";
    // 返回状态处理
    if (response.data == "") {   //如果服务端token过期  这个是后端用的tpswoole长连接造成的
      cookies.delete("userInfo");
      router.push({
        path: "/"
      });
    }
    switch (response.data.code) {
      case "006": //token失效
        // Message.info(`token失效-${response.data.msg}`);
        cookies.delete("userInfo");
        // localStorage.clear();
        router.push({
          path: "/" //跳转到登录页
        });
        break;
      case "005": //当前操作无权限
        Message.info(`当前操作无权限-${response.data.msg}`);
        break;
      case "004": //用户验权失败，请求header缺少token，id
        Message.info(`用户验权失败-${response.data.msg}`);
        cookies.delete("userInfo");
        localStorage.clear();
        router.push({
          path: "/"
        });
        break;
      case "003": //缺少参数
        Message.info(`缺少参数-${response.data.msg}`);
        break;
      case "002": //未查到数据
        Message.info(`未查到数据-${response.data.msg}`);
        break;
    }
    //暂停加载动画
    return response;
  },function(error){
    //  对响应错误做点什么
    return Promise.reject(error);
});

// export default instance;
export { instance as axios };
