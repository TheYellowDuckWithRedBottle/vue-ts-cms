import { createApp } from 'vue'
import { globalRegister } from './global'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'normalize.css'
import './assets/css/index.less'
import 'leaflet/dist/leaflet.css'
import App from './App.vue'
import router from './router'
import store from './store'

library.add(faUser)
library.add(faBars)
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(globalRegister)
app.use(router)
app.use(store)

app.mount('#app')
