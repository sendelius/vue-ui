<template>
  <div
      :class="[`${store.prefixClass}dropdown__wrap`, (isOpen) ? `${store.prefixClass}attr__active` : '', wrapClass]"
      ref="dropdownRef"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onClickTrigger">
    <slot name="trigger"/>
    <Teleport to="body">
      <div ref="dropdownContentRef"
           v-show="isOpen"
           :class="[`${store.prefixClass}dropdown`, `${store.prefixClass}attr__${alignClass}`, dropdownClass]"
           :style="teleportedStyle"
           @mouseenter="onMouseEnter"
           @mouseleave="onMouseLeave"
           @click="onClickTrigger">
        <slot name="content"/>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import {ref, watchEffect, onMounted, onBeforeUnmount, nextTick, defineProps, computed} from 'vue'
import {useStore} from "@/utils/store"
import {outsideClick} from "@/utils/outsideClick"

const props = defineProps({
  id: {type: String, required: true},
  zIndex: {type: Number, default: 9999},
  wrapClass: {type: String, default: ''},
  dropdownClass: {type: String, default: ''},
  position: {type: String, default: 'bottom', validator: val => ['bottom', 'right'].includes(val)},
  align: {type: String, default: 'left', validator: val => ['left', 'right'].includes(val)},
  clickable: {type: Boolean, default: false},
})
const store = useStore()
const isOpen = computed(() => store.openDropdownId === props.id)
const dropdownRef = ref(null)
const dropdownContentRef = ref(null)
const teleportedStyle = ref({})
const alignClass = ref(props.align)
let closeTimeout = null
let openTimeout = null
let isTouchDevice = false

function openDropdown() {
  store.openDropdownId = props.id
  requestAnimationFrame(() => {
    if (dropdownContentRef.value) updatePosition()
  })
}

function closeDropdown() {
  store.openDropdownId = null
}

function onMouseEnter() {
  if (isTouchDevice || props.clickable) return
  clearTimeout(closeTimeout)
  openTimeout = setTimeout(openDropdown, 200)
}

function onMouseLeave() {
  if (isTouchDevice || props.clickable) return
  clearTimeout(openTimeout)
  closeTimeout = setTimeout(closeDropdown, 200)
}

function onClickTrigger(e) {
  if (!isTouchDevice && !props.clickable) return;
  e.stopPropagation()
  if (!isOpen.value) {
    openDropdown()
  } else {
    closeDropdown()
  }
}

function onScrollOrResize() {
  if (isOpen.value) {
    updatePosition()
  }
}

const updatePosition = () => {
  if (!dropdownRef.value || !dropdownContentRef.value) return

  const rect = dropdownRef.value.getBoundingClientRect()
  const dropdownEl = dropdownContentRef.value

  const dropdownHeight = dropdownEl.offsetHeight
  const dropdownWidth = dropdownEl.offsetWidth
  const viewportHeight = window.innerHeight

  const spaceBelow = viewportHeight - rect.bottom
  const spaceAbove = rect.top

  let top = rect.bottom + window.scrollY
  let left = rect.left + window.scrollX
  let transformY = 'translateY(0)'
  let transformX = 'translateX(0)'

  if (props.position === 'bottom') {
    top = rect.bottom + window.scrollY
    if (props.align === 'left') {
      left = rect.left + window.scrollX
      transformX = 'translateX(0)'
    } else if (props.align === 'right') {
      left = rect.right + window.scrollX - dropdownWidth
      transformX = 'translateX(0)'
    }
  } else if (props.position === 'right') {
    left = rect.right + window.scrollX
    if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
      top = rect.top + window.scrollY
      transformY = 'translateY(0)'
    } else {
      top = rect.bottom + window.scrollY
      transformY = 'translateY(-100%)'
      alignClass.value = 'bottom'
    }

    if (props.align === 'right') {
      left = rect.right + window.scrollX - dropdownWidth
      transformX = 'translateX(0)'
    }
  }

  teleportedStyle.value = {
    position: 'absolute',
    transform: `${transformX} ${transformY}`,
    zIndex: props.zIndex,
    left: `${left}px`,
    top: `${top}px`,
  }
}

watchEffect(() => {
  if (isOpen.value) {
    nextTick(updatePosition)
  }
})

window.addEventListener('scroll', onScrollOrResize, true)
window.addEventListener('resize', onScrollOrResize)

outsideClick({
  componentRef: dropdownContentRef,
  buttonRef: dropdownRef,
  callback: () => {
    if (isTouchDevice || props.clickable) closeDropdown()
  }
})

onMounted(() => {
  let isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
  let hasTouch = navigator.maxTouchPoints > 0
  isTouchDevice = hasTouch && isSmallScreen
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
  clearTimeout(closeTimeout)
  clearTimeout(openTimeout)
})
</script>