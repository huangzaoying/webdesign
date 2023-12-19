import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
import PageThree from '../views/PageThree.vue'
import PageFour from '../views/PageFour.vue'

Vue.use(VueRouter)
// 1. 创建路由组件
// 2. 将路由与组件进行映射
// 3. 创建router实例

const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        name: 'Main',
        redirect: '/home', // 重定向
        children: []
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

export default router

