<template>
  <div class="AppBtnGroup">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

export default class AppBtnGroup extends Vue {}
</script>

<style lang="stylus" scoped>
.AppBtnGroup {
  display: flex;
  align-items: center;
  box-shadow: #000 0 0 0 1px;
}
</style>