import { createStore } from 'vuex'
import { loginAction, updateUserAvatar, getUserInfoByName } from '@/service/login/login'
import { ElMessage } from 'element-plus'
import router from '@/router'
import axiosInstance from '@/service/login/login'
const store = createStore({
  state: {
    user: {
      username: '',
      token: '',
      avatar: '',
    }
  },
  mutations: {
    setUser(state, user) {
      console.log('user', user)
      state.user = user
    },
    setUserName(state, username) {
      state.user.username = username
    },
  },
  actions: {
    async loginUser({ commit }, user) {
      // 向mutation发送修改user数据
      const response = await loginAction(user.username, user.password)
      if (response.code === 200) {
        if (response.msg === 'succeed') {
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

    },
    async setUserAvatar({ commit }, user) {
      const response = await updateUserAvatar(user.username, user.avatar)
      if (response.code === 200) {
        if (response.msg === 'succeed') {
          ElMessage.success('上传成功')
          commit('setUser', user)
        } else {
          ElMessage.error('上传失败')
        }
      }
    }
  },
  getters: {
    getUser: state => state.user
  },
  modules: {}
})
export default store
