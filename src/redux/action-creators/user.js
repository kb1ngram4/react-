import { reqLogin } from "../../api"
import { GET_USER_SUCCESS } from "../action-types/user"

/**
 * 用来创建action对象
 * 同步action creator 返回值就是action对象
 * 异步action creator 返回值是一个函数，在函数中完成异步操作
 */
//同步action creator
const getUserSync = (user)=>({
  type:GET_USER_SUCCESS,
  data:user
})
//获取用户数据操作
export const getUserAsync = (username,password)=>{
  return (dispatch) =>
    reqLogin(username,password)
    .then((response)=>{
      //创建action对象,要先创建同步action creator
      const action = getUserSync(response);
      //调用dispatch
      dispatch(action);
      return response;
    })
  }