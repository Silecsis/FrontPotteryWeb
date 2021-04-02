import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'

import Users from '@/views/Users/Users'
import EditProfile from '@/views/Users/EditProfile'
import NewUser from '@/views/Users/NewUser'
import EditUser from '@/views/Users/EditUser'

import Materials from '@/views/Materials/Materials'
import NewMaterial from '@/views/Materials/NewMaterial'
import EditMaterial from '@/views/Materials/EditMaterial'

import MyPieces from '@/views/Pieces/MyPieces'
import Pieces from '@/views/Pieces/Pieces'
import EditPiece from '@/views/Pieces/EditPiece'

import MySales from '@/views/Sales/MySales'
import Sales from '@/views/Sales/Sales'
import EditSale from '@/views/Sales/EditSale'

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
    {
      path: '/users/newUser',
      name: 'NewUser',
      component: NewUser
    },
    //MATERIALES
    {
      path: '/materials',
      name: 'Materials',
      component: Materials
    },
    {
      path: '/materials/:id',
      name: 'EditMaterial',
      component: EditMaterial
    },
    {
      path: '/Materials/NewMaterial',
      name: 'NewMaterial',
      component: NewMaterial
    },

    //PIEZAS
    {
      path: '/myPieces',
      name: 'MyPieces',
      component: MyPieces
    },
    
    {
      path: '/pieces',
      name: 'Pieces',
      component: Pieces
    },
    {
      path: '/pieces/:id',
      name: 'EditPiece',
      component: EditPiece
    },
    //VENTAS
    {
      path: '/mySales',
      name: 'MySales',
      component: MySales
    },
    {
      path: '/sales',
      name: 'Sales',
      component: Sales
    },
    {
      path: '/sales/:id',
      name: 'EditSale',
      component: EditSale
    },
  ]
})