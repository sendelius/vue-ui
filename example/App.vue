<template>
  <h1>Sendelius Vue UI Example</h1>
  <Dropdown id="test">
    <template #trigger>
      <button>open dropdown</button>
    </template>
    <template #content>
      <a href="#">test 1</a>
      <a href="#">test 2</a>
      <a href="#">test 3</a>
      <a href="#">test 4</a>
    </template>
  </Dropdown>
</template>

<script setup>
import {Dropdown} from '../dist/sendelius-ui.es.js'
</script>

<style scoped>

</style>
