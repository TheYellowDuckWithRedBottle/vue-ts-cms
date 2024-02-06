import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import cache from '@/utility/Cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('@/views/config/config.vue')
  },
  {
    path: '/main',
    meta: {
      title: '地图浏览'
    },
    component: () => import('@/views/main/main.vue'),
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (!cache.getCache('token')) {
      router.push('/login')
    }
  }
})
export default router
