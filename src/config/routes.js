import Home from '../components/home/index';
import Login from '../containers/login/index';
import NotFound from '../components/NotFound';
import Category from '../containers/category';
//暴露对象，对象里有两个属性分别为authRoutes和unAuthroutes
//将路由拆成需要验证，和不需要验证的

   //命名为了APP.js 能够扩展route对象
export const authRoutes = [{
      path:'/',
      component:Home,
      //精确匹配
      exact:true
    },
    {
      path:'/category',
      component:Category,
      //精确匹配
      exact:true
    },
   
    {
      //没有匹配路径
      component:NotFound
    }
  ]
export const unAuthRoutes = [{
    path:'/login',
    component:Login,
    // exact:true
  }]

export default {
  authRoutes,
  unAuthRoutes
};