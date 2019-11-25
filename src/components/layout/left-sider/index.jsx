import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Link,withRouter}from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png';
import './index.less';
import menus from '../../../config/menus';
const { SubMenu } = Menu;
//装饰器语法
@withRouter
class LeftSider extends Component{
  static propTypes = {
    isDisplay:PropTypes.bool.isRequired
  }
  state={
    menus:[]
  }
  //得return出去
  createMenus = (menus)=>menus.map((menu)=>{
      if(menu.children){
        return <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {
              menu.children.map((cmenu)=>{
                return this.createCMenus(cmenu)
              })
            }
          </SubMenu>
      }else{
        return this.createCMenus(menu)
      }
    })
  createCMenus = cmenu =><Menu.Item key={cmenu.path}>
                  <Link to={cmenu.path}>
                    <Icon type={cmenu.icon} />
                    <span>{cmenu.title}</span>
                  </Link>
                </Menu.Item>
  
  findOpenKey = (menus,pathname)=>{
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if(menu.children){
        const cmenu = menu.children.find(cmenu=>cmenu.path === pathname);
        if (cmenu) {
          return menu.path;
        }
      }
    }
  }
  //只需要创建一次菜单所以在componentDidMount(){}写，需要初始化状态
  componentDidMount(){
    //触发更新，重新渲染
    this.setState({
      menus:this.createMenus(menus)
    })
  }
  render(){
   const {pathname} = this.props.location;
   const openKey = this.findOpenKey(menus,pathname);
   return <div>
            <div className="logo">
              <img src={logo} alt="logo"/>
              <h1 style = {{display:this.props.isDisplay?"block":"none"}}>硅谷后台</h1>
            </div>
            <Menu 
              theme="dark" 
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys= {[openKey]} 
              mode="inline"
            >
              {this.state.menus} 
            </Menu>
            </div>
  }
}
export default LeftSider;