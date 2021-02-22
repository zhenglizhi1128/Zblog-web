import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: "Blogs"}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    meta:{
      title:"主页"
    },
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: () => import('../views/BlogEdit.vue'),
    meta: {
      title:"发布博客",
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    meta:{
      title:"博客详情"
    },
    component: () => import('../views/BlogDetail.vue')
  },
   {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: () => import('../views/BlogEdit.vue'),
    meta: {
      title:"编辑博客",
     requireAuth: true
    }
  } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
