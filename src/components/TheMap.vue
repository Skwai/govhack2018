<template>
  <div class="TheMap"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Position } from 'vue-router/types/router';
import { ILatLng } from '@/store/state';
import Spawn from '@/models/Spawn';

@Component
export default class TheMap extends Vue {
  map?: google.maps.Map

  get coords(): ILatLng {
    return this.$store.getters.coords
  }

  get spawns(): Spawn[] {
    return this.$store.getters.spawns
  }

  @Watch('coords')
  onCoordsUpdate({ lat, lng }: ILatLng) {
    if (lat && lng && this.map) {
      this.map.setCenter({ lat, lng })
    }
  }

  async mounted() {
    await this.$store.dispatch('watchPosition')
    const { lat, lng } = this.coords
    this.map = new google.maps.Map(this.$el, {
      center: { lat, lng },
      zoom: 14, // 18 default
      disableDoubleClickZoom: true,
      draggable: true,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      zoomControl: false
    })
  }
}
</script>

<style lang="stylus" scoped>
.TheMap {
  width: 100vw;
  height: 100vh;
}
</style>