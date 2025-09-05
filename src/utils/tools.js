import {useStore} from "@/utils/store"

class ToolsClass {
    constructor() {
        this.isInit = false
        this.store = null
    }
    init() {
        if (this.isInit) return
        this.store = useStore()
    }
    setTitle(title) {
        let fullTitle

        if (Array.isArray(title)) {
            const parts = title.filter(Boolean)
            fullTitle = parts.join(this.store.titleSep) + this.store.titleSep + this.store.title
        } else if (typeof title === 'string') {
            fullTitle = title ? `${title}${this.store.titleSep}${this.store.title}` : this.store.title
        } else {
            fullTitle = this.store.title
        }

        document.title = fullTitle
    }
    getRuMonth(index = null) {
        const months = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ]
        if (index === null) index = new Date().getMonth()
        if (index < 0 || index > 11) throw new Error("Индекс месяца должен быть от 0 до 11")
        return months[index]
    }
}

const tools = new ToolsClass()
export default tools