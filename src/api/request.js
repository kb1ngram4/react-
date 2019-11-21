/**
 * 封装axios
 */
import axios from 'axios';

import codeMessage from '../config/code-message';

import {message}from 'antd';
import store from '../redux/store';
//axios提供的create方法可以自己创建实例对象
const axiosInstance = axios.create({
  //基础路径，所有请求的公共路径
  baseURL:'http://localhost:5000/api',
  timeout: 10000,
  headers:{
    //公共的请求头参数
  }
})
//拦截器：axios发送请求之前的拦截器回调函数
axiosInstance.interceptors.request.use(
  //将要发送请求是成功的（内部不出错）触发回调函数
  (config) => {
    //可以修改请求信息
    // console.log(config);
    //post请求才有请求头数据
    if(config.method === 'post'){
      config.headers['content-type']='application/x-www-form-urlencoded';
      //修改data数据
      config.data = Object.keys(config.data).reduce((prev,key)=>{
        const value = config.data[key];
        return prev+`&${key}=${value}`
      },'').substring(1);
    }
    //登录之后才会有token
    const {user:{token}} = store.getState();
    if(token){
      config.headers.authorization = 'bearer ' + token;
    }
    return config
  },
  //将要发送请求是失败的（内部出错）触发回调函数
  // (error) => {
    //一般不写
  //   return Promise.reject(error)
  // }
)
//响应拦截器
axiosInstance.interceptors.response.use(
  //响应成功触发回调函数(status:[200,300)
  //结构赋值得到data
    ({data})=>{
      //判断成功还是失败的响应
      if(data.status === 0){
        return data.data;
      }else{
        message.error(data.msg);
        return Promise.reject();
      }
    },
    //响应失败触发的回调函数
    (error)=>{
      //codeMessage配置文件
      let errorMessage = '';
      //服务器返回响应
      if(error.response){
        errorMessage = codeMessage[error.response.status] || '未知错误';
      }else{
        //服务器没有返回响应：请求还没给服务器，还未接收服务器的响应，请求就终止了
        if(error.message.indexOf('Network Error') !== -1){
          errorMessage = '请检查网络连接';
        }else if(error.message.indexOf('timeout')){
          errorMessage = '网络太卡，请连接5G网络';
        }else {
          errorMessage = '未知错误'
        }
      }
      // console.dir(error);
      message.error(errorMessage)
      return Promise.reject('网络出错~')         
    }
)

export default axiosInstance;