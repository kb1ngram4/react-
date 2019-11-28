import React, { Component,Suspense } from 'react';
import './index.less';
//路由组件都需要router,Switch只显示一个
import{Route,Switch} from 'react-router-dom'
import {Router}from 'react-router';
import history from './utils/history'
import { unAuthRoutes, authRoutes } from './config/routes';
import BasicLayout from './components/layout';
import {Spin } from 'antd'



export default class App extends Component{
  render(){
    return(
      // 包在你所用i18n的组件外面,用于懒加载，内部元素加载完才显示
      <Suspense fallback={<Spin size= "large" className = "lazy-loding" />}>
        <Router history = {history}>
          <Switch>
            {unAuthRoutes.map((route,index)=>{
              return <Route {...route} key={index}/>
            })}
            <BasicLayout>
        {/* switch保证匹配所有规则中的一个，且从上之下 */}
              <Switch>
              {
                authRoutes.map((route,index)=>{
                  return <Route {...route} key={index}/>
                })
              }
              </Switch>
            </BasicLayout>
          </Switch>
      </Router>
      </Suspense>
    )
  }
}