import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { getUserInfoByName } from '@/service/login/login'
import store from '@/store'
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
async function getUserInfo(username: string) {
  if (username) {
    const result = await getUserInfoByName(username)
    if (result && result.code == '200') {
      if (result.data) {
        const userInfo = result.data
        const user = {
          username: userInfo.username,
          avatar: userInfo.avatar,
          role: userInfo.role,
          menu: userInfo.menu
        }
        store.commit('setUser', user);
      }
    }
  }
}
router.beforeEach(async (to) => {
  if (to.path !== '/login') {
    if (localStorage.getItem('token')) {
      const username = localStorage.getItem('username')
      if (username) {
        store.commit('setUserName', username)
        getUserInfo(username)
      }
    } else {
      router.push('/login')
    }
  }
})
export default router
