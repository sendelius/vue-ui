import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import SendeliusUI from '../dist/sendelius-ui.es.js'

const app = createApp(App)
app.use(createPinia())
app.use(SendeliusUI, {
    prefixClass: "nt-",
    icons: import.meta.glob('/example/icons/*.svg', {eager: true}),
    iconsPath: '/example/assets/icons/'
})
app.mount('#app')
