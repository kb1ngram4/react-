/**
 * 根据prevState和action生成newState
 */
//合并和多个reducers函数
import {combineReducers}from 'redux';

import user from './user';
//整合单个reducers函数
export default combineReducers({
  user
})