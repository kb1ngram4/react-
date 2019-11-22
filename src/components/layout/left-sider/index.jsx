import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Link}from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './index.less';
import menus from '../../../config/menus';
const { SubMenu } = Menu;
class LeftSider extends Component{
  state={
    menus:[]
  }
  //得return出去
  createMenus = (menus)=>menus.map((menu)=>{
      if(menu.children){
        return <SubMenu
            key={menu.icon}
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
  createCMenus = cmenu =>
                <Menu.Item key={cmenu.icon}>
                  <Link to={cmenu.path}>
                    <Icon type={cmenu.icon} />
                    <span>{cmenu.title}</span>
                  </Link>
                </Menu.Item>
  //只需要创建一次菜单所以在componentDidMount(){}写，需要初始化状态
  componentDidMount(){
    this.setState({
      menus:this.createMenus(menus)
    })
  }
  render(){
    return <div>
            <div className="logo">
              <img src={logo} alt="logo"/>
              <h1>硅谷后台</h1>
            </div>
            <Menu 
              theme="dark" 
              defaultSelectedKeys={['1']} 
              mode="inline"
            >
              {
                this.state.menus
              }
              
              
            </Menu>
            </div>
  }
}
export default LeftSider;