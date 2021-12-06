/**
 * 请求模块
 */
import axios from 'axios'

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL, //基础路径
    // baseURL: '/api', //基础路径
    withCredentials: true,
    timeout: 60000,
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

//请求拦截器
// Add a request interceptor
request.interceptors.request.use(function(config) {
    // Do something before request is sent
    // console.log(config);
    // const {
    //     user
    // } = store.state
    // 如果用户已登录，统一给接口设置 token信息
    // if (user) {
    //     config.headers.Authorization = `Bearer ${user.token}`
    // }
    // 处理完token 一定要返回config ，否则就会停留在这里
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

export default request
