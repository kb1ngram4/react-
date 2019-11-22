import React,{Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import './index.less';
import logo from './logo.png';
import { connect } from 'react-redux';
import { getUserAsync } from '../../redux/action-creators/user';
import { setItem } from '../../utils/storage';
const {Item} = Form
@connect(null,{getUserAsync})
@Form.create()
class Login extends Component{
  //定义validator方法表单校验
  validator = (rule,value,callback) =>{
    // console.log(rule,value,callback);
    //注意callback函数必须调用
    //判断 （提示错误信息只能显示一个）

    //判断是password还是username
    const name = rule.field === "username"?"用户名":"密码";
    
    if(!value){
      callback(`请输入${name}`);
    }else if(value.length<4){
      callback(`${name}长度必须大于4位`)
    }else if(value.length>13){
      callback(`${name}长度不超过13位`)
    }else if(!/\w/.test(value)){
      callback(`${name}必须是数字字母下划线`)
    }else{
      callback();//callback必须调用
    }
  }
  login = e=>{
    e.preventDefault();
    console.log(this);
    
  //this指向login组件
    
    //先进行表单校验
    this.props.form.validateFields((err,values)=>{
      console.log(err,values);
      if(!err){
        //校验成功
        console.log(values);
        //看接口文档
        const {username,password}= values;
        this.props
          .getUserAsync(username,password)//返回值不是promise对象
          .then((response)=>{
            //持久化存储数据
            setItem('user',response);
            
              this.props.history.push('/')
          })
          .catch(err=>{
            console.log(err);
            this.props.form.resetFields(['password']);
          })

        
      }
    })
  }
  render(){  
    //getFieldDecorator方法也是一个高阶组件
    const{getFieldDecorator} = this.props.form; 
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-section">
          <Form onSubmit={this.login}>
            <h3>用户登录</h3>
            <Item>
            {
              getFieldDecorator( "username",{
                //表单校验规则
                rules:[
                  //#region 
                  /*
                  {
                    validator:this.validator
                  }

                  {
                    required:true,//必填项
                    message:"请输入用户名"//表单校验失败提示的错误信息
                  },
                  {
                    min:4,
                    message:"用户名长度至少大于4位"
                  },
                  {
                    max:13,
                    message:"用户名长度最长不大于13位"
                  },
                  {
                    pattern:/\w/,
                    message:"用户名必须是数字字母下划线"
                  }
                  */
                 //#endregion
                 {
                  validator:this.validator
                 }
                ]

              }

              )(
                <Input 
                prefix={<Icon type="user" className="login-icon"/>}
                placeholder="用户名"
              />
              )
            }             
            </Item>
            <Item>
              {
                // 自定义校验
                getFieldDecorator( "password",{
                  rules:[
                    {
                      validator:this.validator
                    }
                  ]
                })(
                <Input 
                  prefix={ <Icon type='lock' className="login-icon" />}
                  //加密
                  type="password"
                  placeholder="请输入密码"
                />
                )
              }
            </Item>
            <Item>
              {/* 给button加一个htmlType属性 */}
              <Button type="primary" className="login-btn" htmlType="submit">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}


//Form.create方法是一个高阶组件用法,作用：给组件传递from属性
// export default Form.create()(Login);


export default Login;