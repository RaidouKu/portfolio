import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import './assets/styles/effects.css'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.6,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
