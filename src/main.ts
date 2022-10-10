import { createApp } from 'vue'
import { globalRegister } from './global'
import * as ElementPlusIconVue from '@element-plus/icons-vue'
import 'normalize.css'
import './assets/css/index.less'

// import './service/axios_demo'
import hyRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconVue)) {
  app.component(key, component)
}

// 注册element-plus/其他
app.use(globalRegister)
app.use(router)
app.use(store)

app.mount('#app')

// console.log(VUE_APP_BASE_URL)

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   headers: {},
//   interceptors: {
//     requestInterceptor: (config) => {
//       config.headers['token'] = '123'
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

// hyRequest.get()
