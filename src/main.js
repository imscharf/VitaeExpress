import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vMaska } from "maska/vue"

createApp(App)
    .use(router)
    .directive("maska", vMaska)
    .mount('#app')