import React, { Component } from 'react';
// import WithCheckLogin from '../../containers/with-check-login'
// @WithCheckLogin
class Home extends Component{
  click = (e)=>{
    e.preventDefault();
    console.log(this);
    
  }
  render(){
    return <div>home....</div>
  }
}
export default Home;