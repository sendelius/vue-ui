import {createPinia} from 'pinia'
import Dropdown from './components/Dropdown.vue'
import Modal from './components/Modal.vue'
import Icon from './components/Icon.vue'
import tools from './utils/tools'
import {useStore} from './utils/store'

const SendeliusUI = {
    /**
     * @typedef {import('./types').SendeliusUIOptions} SendeliusUIOptions
     * @param {import('vue').App} app
     * @param {SendeliusUIOptions} [options]
     */
    install(app, options = {}) {
        app.component('Dropdown', Dropdown)
        app.component('Modal', Modal)
        app.component('Icon', Icon)
        if (!app._context.provides.pinia) {
            app.use(createPinia())
        }
        const store = useStore()
        store.setOptions(options)
        tools.init()
    }
}

export default SendeliusUI
export {Dropdown, Modal, Icon, useStore, tools}