import {onMounted, onBeforeUnmount} from "vue"

export function outsideClick({componentRef, buttonRef, callback}) {
    if (!componentRef) return

    let mouseDownInside = false

    const isInside = (el, target) => !!el?.value && el.value.contains(target)

    const handleMouseDown = (event) => {
        mouseDownInside =
            isInside(componentRef, event.target) ||
            (buttonRef && isInside(buttonRef, event.target))
    }

    const handleMouseUp = (event) => {
        const mouseUpInside =
            isInside(componentRef, event.target) ||
            (buttonRef && isInside(buttonRef, event.target))

        if (!mouseDownInside && !mouseUpInside) {
            if (typeof callback === "function") {
                callback(event)
            }
        }
    }

    onMounted(() => {
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mouseup", handleMouseUp)
    })

    onBeforeUnmount(() => {
        window.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mouseup", handleMouseUp)
    })

    return {handleMouseDown, handleMouseUp}
}