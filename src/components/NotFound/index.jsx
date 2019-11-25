import React, {Component } from 'react';
import WithCheckLogin from '../../containers/with-check-login';

@WithCheckLogin
 class NotFound extends Component{
  render(){
    return (
      <div>404~~~~</div>
    )
  }
}

export default NotFound;