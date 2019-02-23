import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pacient',
      name: 'pacient',
      component: () => import('./views/Pacient.vue')
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: () => import('./views/Doctor.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    }
  ]
})
