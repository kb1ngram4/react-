import axiosInstance from "./request"

/**
 * 定义请求方法模块
 */

 //请求登录
 export const reqLogin= (username,password)=> axiosInstance({
     method:'POST',
     url:'/login',
     data:{
       username,
       password
     }
   });

   //获取分类列表
   export const reqGetCategory = ()=>axiosInstance ({
     method:'GET',
     url:'/category/get'
   })
  
   //添加分类列表
   export const reqAddCategory = (categoryName)=>axiosInstance({
     method:'POST',
     url:'/category/add',
     data:{
        categoryName
     }
   })
   