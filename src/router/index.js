import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Users from '@/views/Users/Users'
import Materials from '@/views/Materials/Materials'
import MyPieces from '@/views/Pieces/MyPieces'
import MySales from '@/views/Sales/MySales'
import EditProfile from '@/views/Users/EditProfile'
import EditUser from '@/views/Users/EditUser'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //USUARIOS
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/users/editProfile',
      name: 'EditProfile',
      component: EditProfile
    },
    {
      path: '/users/editUser/:id',
      name: 'EditUser',
      component: EditUser
    },
    //MATERIALES
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