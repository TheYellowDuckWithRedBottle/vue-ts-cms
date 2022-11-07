import { Module } from 'vuex'
import { IRootState } from '../types'
import { RouteRecordRaw } from 'vue-router'
import { LoginAction, getUserInfo, getUserMenu } from '@/service/login/login'
import cache from '@/utility/Cache'
import router from '@/router'
interface ILoginState {
  token: string
  userInfo: any
  userMenu: any
}
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu

      const routes: RouteRecordRaw[] = []
      // const path = require.context('@/router/main', true, /\.ts$/)
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      const loginResponse = await LoginAction(payload)
      const { id, name, token } = loginResponse.data
      cache.setCache('token', token)
      commit('changeToken', token)

      const userInfoResponse = await getUserInfo(id)
      console.log(userInfoResponse)
      commit('changeUserInfo', userInfoResponse.data)
      cache.setCache('userInfo', userInfoResponse.data)

      const userMenu = await getUserMenu(id)
      commit('changeUserMenu', userMenu.data)
      console.log('我是', userMenu)
      cache.setCache('userMenu', userMenu.data)

      router.push('/main')
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('手机登录')
    },
    loadLocalLogin({ commit }) {
      const token = cache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = cache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = cache.getCache('userMenus')
      if (userMenu) {
        commit('changeUserMenus', userMenu)
      }
    }
  }
}

export default loginModule
