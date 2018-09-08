<template>
  <div class="AppModalContent">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppModalContent extends Vue {}
</script>

<style lang="stylus" scoped>
.AppModalContent {
  padding: 1.5rem;
}
</style>