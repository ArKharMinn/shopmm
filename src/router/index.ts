import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart.vue'),
    beforeEnter: (to,from,next) => {
      if(localStorage.getItem('AuthUseId') != null){
        next();
      } else {
        next('/')
      }
    }
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/history.vue'),
    beforeEnter: (to,from,next) => {
      if(localStorage.getItem('AuthUseId') != null){
        next();
      } else {
        next('/')
      }
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detailPage.vue'),
    beforeEnter: (to,from,next) => {
      if(localStorage.getItem('AuthUseId') != null){
        next();
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/footer/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('../views/loginPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/404Page.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
