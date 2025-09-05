<template>
  <component :is="IconComponent" v-if="IconComponent"/>
</template>

<script setup>
import {computed} from 'vue'
import {useStore} from "@/utils/store"

const store = useStore()
const props = defineProps({
  name: {type: String, required: true}
})

const IconComponent = computed(() => {
  const path = `${store.iconsPath}${props.name}.svg`
  return store.icons[path]?.default || null
})
</script>