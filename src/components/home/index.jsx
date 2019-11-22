import React, { Component } from 'react';
import Layout from '../layout';
export default class Home extends Component{
  click = (e)=>{
    e.preventDefault();
    console.log(this);
    
  }
  render(){
    return <Layout></Layout>
  }
}