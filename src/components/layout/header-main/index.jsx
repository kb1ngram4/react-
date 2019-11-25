import React, { Component } from "react";
import {Button,Icon,Modal} from 'antd';
import screenfull from 'screenfull';
import {connect} from 'react-redux';
import { removeItem } from "../../../utils/storage";
import {removeUserSync} from '../../../redux/action-creators/user'
import {withRouter} from 'react-router-dom'
import './index.less';
//组件间传递属性需要connect组件
@withRouter
@connect(state => ({ username: state.user.user.username }), {
  removeUserSync
})
class HeaderMain extends Component{
  //初始化全屏状态
  state = {
    isFullscreen:false
  }
  toggleScreen = ()=>{
    screenfull.toggle();
  }
  change = ()=>{
    this.setState({
      isFullscreen:!this.state.isFullscreen
    }) 
  }
  logout =()=>{
    Modal.confirm({
      title:"您确认要退出吗",
      onOk:()=>{
        //清空本地数据
        removeItem("user");
        //清空redux数据
        this.props.removeUserSync();
        //重定向
        this.props.history.replace('/login'); 
        // console.log(this.props.username);
      }
    })
  }
  //绑定
  componentDidMount(){
    screenfull.on("change",this.change)
  }
  //解绑
  componentWillUnmount(){
    screenfull.off("change",this.change)
  }
  render() {
    const {isFullscreen}= this.state;
    const {username} = this.props
    return (
       <div className ="header-main">
         <div className="header-main-top">
          <Button size = "small" onClick = {this.toggleScreen} >
            <Icon type={isFullscreen?"fullscreen-exit":"fullscreen"} />
          </Button>
          <Button size = "small" className="lang-btn">English</Button>
          <span>
            欢迎，{username}
          </span>
          <Button type="link" onClick={this.logout} >
            退&nbsp;&nbsp;出
          </Button>
         </div>
         <div className = "header-main-bottom">
          <h3>首页</h3>
          <span>2019-11-25.。。。。。。。</span>
         </div>
       </div>
    );
  }
}

export default HeaderMain;