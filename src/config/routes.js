import Home from '../components/home/index';
import Login from '../containers/login/index';
import NotFound from '../components/NotFound';
export default[
  //命名为了APP.js 能够扩展route对象
  {
    path:'/',
    component:Home,
    //精确匹配
    exact:true
  },
  {
    path:'/login',
    component:Login,
    // exact:true
  },
  {
    //没有匹配路径
    component:NotFound
  }
]