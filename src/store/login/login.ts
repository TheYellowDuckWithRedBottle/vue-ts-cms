import { Module } from 'vuex'
import IRootState from '../types'
import { LoginAction } from '@/service/login/login'
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
      console.log(process.env.VUE_APP_BASE_URL)
      const loginResponse = await LoginAction(payload)
      const { id, name, token } = loginResponse.data
      console.log(id, name, token)
      commit('changeToken', token)
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('手机登录')
    }
  }
}

export default loginModule
