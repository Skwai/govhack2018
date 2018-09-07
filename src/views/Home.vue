<template>
  <div class="home">
    <TheMap />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheMap from '@/components/TheMap.vue'

@Component({
  components: {
    TheMap
  }
})
export default class Home extends Vue {}
</script>
