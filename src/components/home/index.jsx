import React, { Component } from 'react';
export default class Home extends Component{
  click = (e)=>{
    e.preventDefault();
    console.log(this);
    
  }
  render(){
    return <div>
      <form action="##" onClick ={this.click} >
        <input type="submit"/>
      </form>
    </div>
  }
}