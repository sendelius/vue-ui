import {defineStore} from 'pinia'

export const useStore = defineStore('sendelius-ui', {
    state: () => ({
        openDropdownId: null,
        icons: {},
        iconsPath: '',
        theme: 'light',
        prefixClass: 'ui-',
        title: 'Sendelius UI',
        titleSep: ' // ',
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light'
        },
        setOptions(options = {}) {
            if (options.prefixClass) this.prefixClass = options.prefixClass
            if (options.iconsPath) this.iconsPath = options.iconsPath
            if (options.icons) this.icons = options.icons
        },
    }
})