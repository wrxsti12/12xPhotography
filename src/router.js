// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Gallery from './views/Gallery.vue'
import Contact from './views/Contact.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/gallery', component: Gallery },
  { path: '/contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'ONE2FRAME'
  next()
})

export default router
