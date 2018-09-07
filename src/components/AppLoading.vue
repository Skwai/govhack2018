<template>
  <div class="AppLoading">
    <AppSpinner />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppSpinner from '@/components/AppSpinner.vue'

@Component({
  components: {
    AppSpinner
  }
})
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
