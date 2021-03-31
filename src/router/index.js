import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Users from '@/views/Users/Users'
import Materials from '@/views/Materials/Materials'
import MyPieces from '@/views/Pieces/MyPieces'
import MySales from '@/views/Sales/MySales'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/materials',
      name: 'Materials',
      component: Materials
    },
    {
      path: '/myPieces',
      name: 'MyPieces',
      component: MyPieces
    },
    {
      path: '/mySales',
      name: 'MySales',
      component: MySales
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    // {
    //   path: '/principal',
    //   name: 'Principal',
    //   component: Principal
    // }
  ]
})