import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Home from '@/components/Home'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
