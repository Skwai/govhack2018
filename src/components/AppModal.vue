<template>
  <section
    class="AppModal"
    role="dialog"
  >
    <div class="AppModal__Content">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppModal extends Vue {}
</script>

<style lang="stylus" scoped>
.AppModal {
  background: rgba(0, 0, 0, 0.15);
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  min-height: 100vh;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &__Content {
    background: #fff;
    width: 90vw;
    max-width: 20rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0.25rem 1rem, rgba(0, 0, 0, 0.1) 0 1px 1px;
  }
}
</style>
