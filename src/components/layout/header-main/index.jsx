import React, { Component } from "react";
import {Button,Icon,Modal} from 'antd';
import screenfull from 'screenfull';
import {connect} from 'react-redux';
import { removeItem } from "../../../utils/storage";
import {removeUserSync} from '../../../redux/action-creators/user'
import {withRouter} from 'react-router-dom';
import menus from '../../../config/menus';
import {withTranslation} from 'react-i18next'
import './index.less';
//组件间传递属性需要connect组件
@withRouter
@connect(state => ({ username: state.user.user.username }), {
  removeUserSync
})
@withTranslation()
class HeaderMain extends Component{
  addZero = (number)=>{
    if(number<10){
      return "0"+number;
    }else{
      return number
    }
  }
  formatDate = (date)=>{
    date = new Date(date);
    const year = date.getFullYear();
    const month = this.addZero(date.getMonth()+1);
    const day = this.addZero(date.getDate());
    const hours =this.addZero( date.getHours());
    const minutes = this.addZero(date.getMinutes());
    const seconds = this.addZero(date.getSeconds());
 
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  //初始化全屏状态
  state = {
    isFullscreen:false,
    isEnglish:this.props.i18n.language === "en"? true:false,
    pathname:'',
    title: '',
    date:this.formatDate(Date.now())
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
//切换语言
  changeLang= ()=>{
    const isEnglish = !this.state.isEnglish
    this.setState({
      isEnglish
    });
    this.props.i18n.changeLanguage(isEnglish ? "en" : "zh");
  }
 
  
  
  //绑定
  componentDidMount(){
    screenfull.on("change",this.change);
    this.timer =  setInterval((date)=>{
      this.setState({
        date:this.formatDate(Date.now())
      })
    },1000)
  }
  //解绑
  componentWillUnmount(){
    screenfull.off("change",this.change);
    clearInterval(this.timer)
  }

   //从props获取状态(静态函数)
   static getDerivedStateFromProps(nextProps,prevState){
    /*需求this.setState变化不会引起标题变化，
    location.pathname变化才引起标题变化
    */
    const {pathname}=nextProps.location
    let title = "";
    if(pathname === prevState.pathname){
      //地址没有更新
      return prevState;
    }
    //查找title需要对menus进行遍历
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
        //菜单有子元素
        if(menu.children){
          //找路径
         const cMenu = menu.children.find((cMenu)=>cMenu.path === pathname)
          if(cMenu){
             title =  cMenu.title;
            
          }
        }else{
          if(menu.path === pathname){
             title = menu.title;
            
          }
        }      
    }

    return {
      pathname,
      title:"layout.leftNav."+title
    }
  }
  render() {
    const {isFullscreen,isEnglish,title,date}= this.state;
    const {username,t } = this.props;
   
    
    return (
       <div className ="header-main">
         <div className="header-main-top">
          <Button size = "small" onClick = {this.toggleScreen} >
            <Icon type={isFullscreen?"fullscreen-exit":"fullscreen"} />
          </Button>
          <Button size = "small" className="lang-btn" onClick = {this.changeLang}>
            {isEnglish?"中文":"English"}
            
            </Button>
          <span>
            欢迎，{username}
          </span>
          <Button type="link" onClick={this.logout} >
            退&nbsp;&nbsp;出
          </Button>
         </div>
         <div className = "header-main-bottom">
          <h3>{t(title)}</h3>
          <span>{date}</span>
         </div>
       </div>
    );
  }
}

export default HeaderMain;