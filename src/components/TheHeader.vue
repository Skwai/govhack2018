<template>
  <header class="TheHeader">
    <img src="/icon.png" class="TheHeader__Logo" />
    <h1 class="TheHeader__Title">BinHunter</h1>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="stylus" scoped>
@require '../styles/config';

.TheHeader {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &__Logo {
    margin-right: 1rem;
    height: 2rem;
    width: 2rem;
  }

  &__Title {
    color: #F7F6CC;
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
    text-shadow: 3px 3px 0 #292524, -1px -1px 0 #292524, 1px -1px 0 #292524, -1px 1px 0 #292524, 1px 1px 0 #292524;
  }
}
</style>