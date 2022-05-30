import { Module } from 'vuex'
import IRootState from '../types'
import { LoginAction, getUserInfo, getUserMenu } from '@/service/login/login'
import cache from '@/utility/Cache'
interface ILoginState {
  token: string
  userInfo: any
}
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
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

      const userMenu = await getUserMenu(id)
      console.log(userMenu)
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('手机登录')
    }
  }
}

export default loginModule
