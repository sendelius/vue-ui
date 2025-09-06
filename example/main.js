import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import SendeliusUI from '../dist/sendelius-ui.es.js'

const app = createApp(App)
console.log(import.meta.glob('./icons/*.svg', {eager: true, import: 'default'}))
app.use(createPinia())
app.use(SendeliusUI, {
    prefixClass: "nt-",
    icons: import.meta.glob('./icons/*.svg', {eager: true, import: 'default'}),
    iconsPath: './icons/'
})
app.mount('#app')
