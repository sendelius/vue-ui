<template>
  <h1>Sendelius Vue UI Example</h1>
  <div style="display: flex">
    <Dropdown id="test" clickable style="display: inline-block">
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
    <Dropdown id="test2" clickable align="right" style="display: inline-block;margin-left: auto;margin-right: 50px">
      <template #trigger>
        <button>open dropdown</button>
      </template>
      <template #content>
        <div style="background: #cccccc;padding: 10px">
          <a href="#">test 1</a>
          <a href="#">test 2</a>
          <a href="#">test 3</a>
          <a href="#">test 4</a>
        </div>
      </template>
    </Dropdown>
  </div>
  <div style="display: flex">
    <Dropdown id="test3" style="display: inline-block">
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
    <Dropdown id="test4" align="right" style="display: inline-block;margin-left: auto;margin-right: 50px">
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
  </div>
  <Icon name="dot-vertical" />
</template>

<script setup>
import {Dropdown,Icon} from '../dist/sendelius-ui.es.js'
</script>

<style scoped>

</style>
