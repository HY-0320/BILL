import Vue from 'vue'
import Router from 'vue-router'
import login from './components/User/login.vue'
import register from './components/User/register.vue'
import personal from './components/User/personal.vue'
import failed from './components/Other/404.vue'
import notes from './components/Function/notes.vue'
import budget from './components/Function/budget.vue'
import chart from './components/Function/show/chart.vue'
import detail from './components/Function/show/detail.vue'
import change from './components/User/change.vue'
import category from "./components/Function/category"
import NotFound from "./components/Other/404"

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'notes',
      component: notes
    },
    {
      path: '/personal/login/register',
      name: 'register',
      component: register
    },

    {
      path: '/personal/login/change',
      name: 'change',
      component: change
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/chart',
      name: 'chart',
      component: chart
    }
    ,
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/budget',
      name: 'budget',
      component: notes
    },
    {
      path: '/personal/login',
      name: 'login',
      component: login
    },
    {
      path: "/category",
      component: category
    },
    {
      path: "/notFound",
      component: NotFound
    }
  ]
})