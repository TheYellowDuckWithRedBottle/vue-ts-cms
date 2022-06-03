import { createStore, useStore as userVuexStore, Store } from 'vuex'
import login from './login/login'

import { IRootState, IStoreType } from './types'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18
    }
  },
  mutations: {
    changeName(state) {
      console.log(state)
    }
  },
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function userStore(): Store<IStoreType> {
  return userVuexStore()
}
export default store
