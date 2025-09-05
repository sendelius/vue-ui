<template>
  <slot name="trigger"/>
  <Teleport to="body">
    <div :class="[`${store.prefixClass}modal-wrap`, wrapClass]" v-if="modelValue" @click.self="close">
      <div :class="[`${store.prefixClass}modal`, modalClass]">
        <div :class="`${store.prefixClass}modal__header`">
          <slot name="header"/>
          <button :class="`${store.prefixClass}modal__close`" @click="close">
            <Icon name="close"/>
          </button>
        </div>
        <div :class="`${store.prefixClass}modal__content`">
          <slot name="content"/>
        </div>
        <div :class="`${store.prefixClass}modal__footer`" v-if="$slots.footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {defineProps, defineEmits, onMounted, onBeforeUnmount, watch} from "vue"
import Icon from "@/components/Icon.vue"
import {useStore} from "@/utils/store"

const props = defineProps({
  modelValue: {type: Boolean, required: true},
  wrapClass: {type: String, default: ''},
  modalClass: {type: String, default: ''},
})
const store = useStore()
const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}

function handleEsc(e) {
  if (e.key === 'Escape') close()
}

watch(() => props.modelValue, (newVal) => {
  document.body.classList.toggle(`${store.prefixClass}attr__overflow-hidden`, newVal)
})

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEsc)
})
</script>