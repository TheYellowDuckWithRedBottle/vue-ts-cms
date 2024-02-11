import {createStore} from 'vuex'
import {loginAction} from '@/service/login/login'
import { ElMessage } from 'element-plus'
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
      console.log(state,user)
      state.user = user
    }
  },
  actions:{
    async loginUser({commit}, user){
      // 向mutation发送修改user数据
       const response = await loginAction(user.username, user.password)
       if (response.code === 200) {
        if (response.msg==='success') {

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
       } else {
        ElMessage.error('登录失败')
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
