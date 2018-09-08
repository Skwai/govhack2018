<template>
  <div class="TheMap"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Position } from 'vue-router/types/router';
import Spawn from '@/models/Spawn';
import { ILatLng } from '@/store/geolocation/state';

@Component
export default class TheMap extends Vue {
  map?: google.maps.Map;
  locationMarker?: google.maps.Marker;
  currentSpawns: google.maps.Marker[] = [];

  get coords(): ILatLng {
    return this.$store.getters['geolocation/coords'];
  }

  get spawns(): Spawn[] {
    return this.$store.getters['game/spawns'];
  }

  @Watch('spawns')
  onSpawnsUpdate(spawns: Spawn[]) {
    this.addSpawnsToMap(spawns);
  }

  @Watch('coords')
  onCoordsUpdate(newCoords: ILatLng) {
    if (newCoords && this.locationMarker) {
      this.locationMarker.setPosition(newCoords);
      this.$store.dispatch('game/getSpawns', this.coords);
    }

    if (newCoords && this.map) {
      this.map.setCenter({ lat: newCoords.lat, lng: newCoords.lng });
      this.$store.dispatch('game/updateCurrentUserCoordinates', newCoords);
    }
  }

  async mounted() {
    await this.$store.dispatch('geolocation/watchPosition');
    await this.$store.dispatch('game/getSpawns', this.coords);
    const { lat, lng } = this.coords;
    this.map = new google.maps.Map(this.$el, {
      center: { lat, lng },
      zoom: 15, // 18 default
      disableDoubleClickZoom: true,
      draggable: true,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      zoomControl: false
    });
    this.addSpawnsToMap(this.spawns);

    this.locationMarker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      icon: {
        url:
          'https://www.freeiconspng.com/uploads/icon-png-people-user-icon-png-executive-person-icon-man-icon-png--30.png',
        scaledSize: new google.maps.Size(16, 16)
      },
      zIndex: 100
    });
  }

  addSpawnsToMap(spawns: Spawn[]) {
    const { map } = this;
    this.currentSpawns.forEach((spawn) => {
      spawn.setMap(null);
    });
    this.currentSpawns = [];

    const icon = {
      url: 'https://image.flaticon.com/icons/png/128/70/70388.png',
      scaledSize: new google.maps.Size(6, 6)
    };
    const markers = spawns.map((spawn) => {
      const { latitude: lat, longitude: lng } = spawn.coordinates;
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        zIndex: 50,
        icon
      });
      marker.addListener('click', () =>
        this.$router.push({
          name: 'SpawnConfirm',
          params: { spawnId: spawn.id! }
        })
      );
      this.currentSpawns.push(marker);
    });
  }
}
</script>

<style lang="stylus" scoped>
.TheMap {
  width: 100vw;
  height: 100vh;
}
</style>