import { Module } from 'vuex'
import { IRootState } from '../types'
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
      userMenu: {}
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
      commit('changeUserInfo', userInfoResponse)
      cache.setCache('userInfo', userInfoResponse)

      const userMenu = await getUserMenu(id)
      commit('changeUserMenu', userMenu)
      cache.setCache('userMenu', userMenu)
      console.log(userMenu)

      router.push('/main')
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('手机登录')
    }
  }
}

export default loginModule
