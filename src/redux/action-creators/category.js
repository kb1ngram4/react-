/*
  创建action对象
*/
import { 
  reqGetCategory,
  reqAddCategory
    } from "../../api";
import{}from '../../api'

import {
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_SUCCESS
} from '../action-types/category'


const getCategorySync = (category)=>({
  type: GET_CATEGORY_SUCCESS,
  data: category
})


//需要发送请求定义异步,获取分类
export const getCategoryAsync=()=>{
  return (dispatch)=>{
    //get请求不用传参
    reqGetCategory()
      .then((response)=>{
        //调用dispatch方法,传action对象
        dispatch(getCategorySync(response))
      })
  }
}

//添加分类
const addCategorySync = (category)=>({
  type:ADD_CATEGORY_SUCCESS,
  data:category
})

export const addCategoryAsync = (categoryName)=>{
  return (dispatch)=>{
    reqAddCategory(categoryName)
      .then((response)=>{
        dispatch(addCategorySync(response))
      })
  }
}