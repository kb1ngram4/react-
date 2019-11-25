import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftSider from './left-sider';
import HeaderMain from './header-main';
import withCheckLogin from '../../containers/with-check-login'
const { Header,Sider, Content, Footer} = Layout;

@withCheckLogin
class BasicLayout extends Component {
  //初始化菜单栏收缩状态，文字样式隐藏显示状态
  state = {
    collapsed: false,
    isDisplay:true //侧边栏要用属性传进去
  };
  //收缩菜单栏
  onCollapse = collapsed => {
    console.log(collapsed);
    
    this.setState({ 
      collapsed,
      isDisplay:!this.state.isDisplay
     });
  };
  render() {
    //解构赋值
    const {collapsed,isDisplay} = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <LeftSider isDisplay = {isDisplay} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: '70px 16px' }}>
            <div style={{ padding: 24, background: '#f40', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;