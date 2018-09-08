<template>
  <div class="AppLoading">
    Loading...
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppLoading extends Vue {}
</script>

<style lang="stylus" scoped>
.AppLoading {
  $size = 3rem;
  max-width: $size;
  max-height: $size;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  line-height: 0;
  align-self: center;
}
</style>
