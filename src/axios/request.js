/**
 * Created by laplace on 2019/5/10.
 */
import axios from 'axios';
import qs from 'qs';
import app from '../main.js';
import baseUrl from './baseUrl'
import routerIndex from '../router/index'

/****** 创建axios实例 ******/
// const instance = axios.create({
//   baseURL: "http://192.168.1.104:8082",  // api的base_url
//   timeout: 5000  // 请求超时时间
// });

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


/****** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = window.localStorage.getItem('accessToken');
    // console.log(token);
    if (token) {
      config.headers.common['token'] = token;
    }else{
      routerIndex.push('/login/login')
    }
    return config;
    // token && (config.headers.Authorization = token);
  },
  error => {
    console.info("error: ");
    console.info(error);
    Promise.reject(error)
  });


// 响应拦截器
axios.interceptors.response.use(
  // 请求成功

  res => {
    // console.log(res);
    if (res.headers.token) {
      window.localStorage.setItem("accessToken", res.headers.token);
    }
    return res;
    // res.status === 200 ? return res : Promise.reject(res)
  },
  // 请求失败
  error => {
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
  });
// let base = "http://192.168.1.104:8082";

//通用方法
// const POST = (url, params) => {
//   const getTimestamp = new Date().getTime();
//   return axios.post(`${base}${url}?timer=${getTimestamp}`, params).then(res => res)
// }
//
// const GET = (url, params) => {
//   const getTimestamp = new Date().getTime();
//   return axios.get(`${base}${url}?timer=${getTimestamp}`, {params: params}).then(res => res)
// }
// // export default instance;
// export default {
//   POST,
//   GET
// }

