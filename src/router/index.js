// 创建路由对象及配置其规则,&其他路由配置
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'index', path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login }
  ]
})

export default router
