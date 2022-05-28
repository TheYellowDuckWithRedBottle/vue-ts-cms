import { Module } from 'vuex'
import IRootState from '../types'
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
  mutations: {},
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log('执行')
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('手机登录')
    }
  }
}

export default loginModule
