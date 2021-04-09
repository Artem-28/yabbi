import Vue from 'vue'
import VueRouter from 'vue-router'
import authGuard from './auth-guard'
import writeGuard from './write-guard'



Vue.use(VueRouter)

const routes = [
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/auth/Registration.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/new-post',
    name: 'NewPost',
    component: () => import('../views/post/AddPost.vue'),
    beforeEnter: writeGuard
  },
  {
    path: '/',
    name: 'Posts',
    component: () => import('../views/post/Posts.vue')
  },
  {
    path: '/posts',
    name: 'Paginate',
    props: (route) => ({ query: route.query }),
    component: () => import('../views/post/Posts.vue')
  },
  {
    path: '/post/edit',
    name: 'Edit',
    props: (route) => ({ query: route.query.id }),
    component: () => import('../views/post/EditPost.vue'),
    beforeEnter: writeGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
