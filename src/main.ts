import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

const app = createApp(App)

const pinia = createPinia()


app.use(pinia)
app.use(router)

app.component(VueFeather.name, VueFeather)

app.mount('#app')
