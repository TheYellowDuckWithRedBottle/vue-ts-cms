import { createApp } from 'vue'
import { globalRegister } from './global'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faBars,
  faCircleQuestion,
  faXmark,
  faFolder,
  faFolderOpen,
  faEye,
  faTrash,
  faGear,
  faCircle,
  faDrawPolygon,
  faFileImport,
  faFileExport,
  faGripLines
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'normalize.css'
import './assets/css/index.less'
import 'leaflet/dist/leaflet.css'
import './global/baseColor.less' // 导入全局定义的主题色
import App from './App.vue'
import router from './router'
import store from './store'

library.add(faUser)
library.add(faBars)
library.add(faCircleQuestion)
library.add(faXmark)
library.add(faFolder)
library.add(faFolderOpen)
library.add(faEye)
library.add(faGear)
library.add(faTrash)
library.add(faCircle)
library.add(faDrawPolygon)
library.add(faFileImport)
library.add(faFileExport)
library.add(faGripLines)
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(globalRegister)
app.use(router)
app.use(store)
app.config.globalProperties.$map = {}
app.config.globalProperties.$L = {}

app.mount('#app')
