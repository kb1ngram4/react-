import React, { Component } from 'react';
import {connect} from 'react-redux';
import{Redirect} from 'react-router-dom';
// 定义高阶组价
const WithCheckLogin=(WrapComponent)=>{
  return connect(
    (state)=>({token:state.user.token}),//状态数据
    null//更新数据的方法
  )(
     class With extends Component{
      static displayName = `CheckLogin(${WrapComponent.displayName||WrapComponent.name||"Component"})`
      
      
      render(){
        /*
        location/history/match是路由组件的三大属性，其他组件默认没有
        路由组件指通过Route加载的组件
         */
        const{
          token,
          location,
          ...rest //打包剩余没有解构赋值的属性
        } = this.props;
        // console.log(rest);
        
        //若用户在login页面
        if(location.pathname === '/login'){
          if(token){
            return <Redirect to='/' />
          }
        }else{
          if(!token){
            return <Redirect to='/login' />
          }
        }
        //将接收到属性传递下去
        return <WrapComponent {...rest} location={location} />
      }
    }
  )

}

export default WithCheckLogin;