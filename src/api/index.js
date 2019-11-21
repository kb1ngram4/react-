import axiosInstance from "./request"

/**
 * 定义请求方法模块
 */

 //请求登录
 export const reqLogin= (username,password)=> axiosInstance({
     method:'post',
     url:'/login',
     data:{
       username,
       password
     }
   })