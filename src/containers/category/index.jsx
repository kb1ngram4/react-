import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal}from 'antd'
import {connect} from 'react-redux';
import {
  getCategoryAsync,
  addCategoryAsync
} from '../../redux/action-creators/category'
import AddCategory from './addcategory';
 
@connect(state=>({category:state.category}),
{getCategoryAsync,addCategoryAsync})
class Category extends Component {
  state = ({
    showVisiable:false
  })
  componentDidMount(){
    this.props.getCategoryAsync();
    this.hidden()
  }
//点击添加分类弹出对话框
  showAddCategory = ()=>{
    this.setState({
      showVisiable:true
    })
  }
  //定义隐藏对话框函数
  hidden = ()=>{
    this.setState({
      showVisiable:false
    })
  }

  //添加分类
  handleOk = ()=>{
    this.form.props.form.validateFields(async(err,values)=>{
      if(!err){
        const {categoryName} = values;
        //发送请求，更新后台数据，redux数据
        //方法返回值看actioncreator里面函数（dispatch）的返回值（promise对象）
        await this.props.addCategoryAsync(categoryName)
        this.hidden()
      }
    })
    
    
  }
  handleCancel = ()=>{
    this.hidden()
  }
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name', //对应数据中key获取value值
    },
    {
      title: '操作',
      render: ()=>{ //render方法指定表中数据如何渲染
        return <div>
          <Button type = "link">修改分类</Button>
          <Button type = "link">删除分类</Button>
        </div>
      }
    }
  ];
  render() {
    const {category} = this.props
    const {showVisiable} = this.state

    return (
      <div>
        <Card title="分类列表" 
              extra={
                <Button type = "primary" onClick = {this.showAddCategory} >
                <Icon type="plus" />
                  添加分类
                </Button>}>
        <Table
          columns={this.columns}
          dataSource={category}
          bordered //是否展示外边框,默认不写bordered为false
          rowKey = "_id"
          pagination={
            {
              showQuickJumper:true,
              showSizeChanger:true,
              defaultPageSize:3,
              pageSizeOptions:["3","6","9","12"]
            }
          }
        />
      </Card>
      <Modal
          title="添加分类"
          visible={showVisiable}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width = {300}
        >
         <AddCategory 
          wrappedComponentRef = {(form)=>this.form = form}
         />
        </Modal>
      </div>
    )
  }
}

export default Category;