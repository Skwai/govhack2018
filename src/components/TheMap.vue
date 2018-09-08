<template>
  <div class="TheMap"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Position } from 'vue-router/types/router';
import Spawn from '@/models/Spawn';
import User from '@/models/User';
import { ILatLng } from '@/store/geolocation/state';
import { MAP_STYLE } from '@/config';

@Component
export default class TheMap extends Vue {
  map?: google.maps.Map;
  locationMarker?: google.maps.Marker;
  currentSpawns: google.maps.Marker[] = [];
  currentUsers: google.maps.Marker[] = [];

  get coords(): ILatLng {
    return this.$store.getters['geolocation/coords'];
  }

  get spawns(): Spawn[] {
    return this.$store.getters['game/spawns'];
  }

  get users(): User[] {
    return this.$store.getters['game/users'];
  }

  @Watch('spawns')
  onSpawnsUpdate(spawns: Spawn[]) {
    this.addSpawnsToMap(spawns);
  }

  @Watch('users')
  onUsersUpdate(users: User[]) {
    this.addUsersToMap(users);
  }

  @Watch('coords')
  async onCoordsUpdate(newCoords: ILatLng) {
    if (newCoords && this.locationMarker) {
      await this.locationMarker.setPosition(newCoords);
      await this.$store.dispatch('game/getSpawns', this.coords);
    }

    if (newCoords && this.map) {
      await this.map.setCenter({ lat: newCoords.lat, lng: newCoords.lng });
      await this.$store.dispatch('game/updateCurrentUserCoordinates', newCoords);
    }
  }

  async created() {
    await Promise.all([
      this.$store.dispatch('geolocation/watchPosition'),
      this.$store.dispatch('game/getSpawns', this.coords),
      this.$store.dispatch('game/getUsers')
    ]);
  }

  async mounted() {
    const { lat, lng } = this.coords;
    const zoom = 19;
    this.map = new google.maps.Map(this.$el, {
      center: { lat, lng },
      zoom,
      disableDoubleClickZoom: true,
      draggable: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      zoomControl: false,
      minZoom: zoom,
      maxZoom: zoom,
      panControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: MAP_STYLE
    });

    this.locationMarker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      icon: {
        url:
          'https://www.freeiconspng.com/uploads/icon-png-people-user-icon-png-executive-person-icon-man-icon-png--30.png',
        scaledSize: new google.maps.Size(128, 128)
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
      scaledSize: new google.maps.Size(64, 64)
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

  addUsersToMap(users: User[]) {
    const { map } = this;
    this.currentUsers.forEach((user) => {
      user.setMap(null);
    });
    this.currentUsers = [];

    const icon = {
      url: 'https://www.freeiconspng.com/uploads/-human-male-man-people-person-profile-red-user-icon--icon--23.png',
      scaledSize: new google.maps.Size(80, 80)
    };

    users.map((user) => {
      if (user.coordinates) {
        const { latitude: lat, longitude: lng } = user.coordinates;
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          zIndex: 80,
          icon
        });
        this.currentUsers.push(marker);
      }
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