import {createStore} from 'vuex'
import {loginAction} from '@/service/login/login'
import router from '@/router'
import axiosInstance from '@/service/login/login'
const store = createStore({
  state: {
    user: {
      username: '',
      password: '',
      token: ''
    }
  },
  mutations:{
    setUser(state, user){
      state.user = user
    }
  },
  actions:{
    async loginUser({commit}, user){
      // 向mutation发送修改user数据
       const response = await loginAction(user.username, user.password)
       if (response.status === 200) {
        if (response.data && typeof response.data === 'string') {
          localStorage.setItem('token', response.data)
          const userInfo = {
            username: user.username,
            password: user.password,
            token: response.data
          }
          // 把token设置到请求头
          axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token') || ''
          commit('setUser', userInfo)
          router.push('/main')
       }

       }

    }
  },
  getters:{
    getUser: state => state.user
  },
  modules: {}
})
export default store
