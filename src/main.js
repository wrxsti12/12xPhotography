// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import './assets/reset.css'

// 初始化動畫
AOS.init()

const app = createApp(App)
app.use(router)           // ← 這一行關鍵：一定要用 router
app.mount('#app')

