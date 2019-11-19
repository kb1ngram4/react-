import React, { Component } from 'react';
import './index.less';
//路由组件都需要router
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import routes from './config/routes';

export default class App extends Component{
  render(){
    return(
      
      <Router>
        {/* switch保证匹配所有规则中的一个，且从上之下 */}
        <Switch>
        {
          routes.map((route,index)=>{
            return <Route {...route} key={index}/>
          })
        }
        </Switch>
      </Router>
    )
  }
}