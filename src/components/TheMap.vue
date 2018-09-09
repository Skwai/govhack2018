<template>
  <div class="TheMap">
    <div class="TheMap__Canvas" ref="map"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Position } from 'vue-router/types/router';
import Spawn from '@/models/Spawn';
import User from '@/models/User';
import { ILatLng } from '@/store/geolocation/state';
import { MAP_STYLE } from '@/config';
import { MobTypes, trashosaur } from '@/data/mobs';

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
    const zoom = 18;
    this.map = new google.maps.Map(this.$refs.map as Element, {
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
        url: './user.gif',
        scaledSize: new google.maps.Size(80, 80)
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

    const recycle = {
      url: './recycle.png',
      scaledSize: new google.maps.Size(32, 32)
    };

    const trash = {
      url: './trash_can.png',
      scaledSize: new google.maps.Size(32, 32)
    };

    const trashFlip = {
      url: './trash_can_flip.png',
      scaledSize: new google.maps.Size(32, 32)
    };

    const trashDog = {
      url: './trash_dog.png',
      scaledSize: new google.maps.Size(32, 32)
    };

    const trash1 = {
      url: './trash1.png',
      scaledSize: new google.maps.Size(32, 32)
    };

    const icons: google.maps.Icon[] = [trash, trashFlip, trashDog, recycle, trash1];
    const hashCode = (s: string): number => {
      var h = 0,
        l = s.length,
        i = 0;
      if (l > 0) while (i < l) h = (h * 32 - h + s.charCodeAt(i++)) | 0;
      return h;
    };

    const markers = spawns.map((spawn) => {
      const { latitude: lat, longitude: lng } = spawn.coordinates;
      const icon = icons[Math.abs(hashCode(spawn.id!)) % icons.length];

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        zIndex: 50,
        icon,
        title: spawn.type
      });
      marker.addListener('click', () =>
        this.$router.push({
          name: 'Spawn',
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
      url: './user2.gif',
      scaledSize: new google.maps.Size(60, 60)
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
  flex: 1;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  box-sizing: border-box;
  padding: 0 1rem 1rem;
  flex-direction: column;

  &__Canvas {
    flex: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: #F7F6CC solid 6px;
    box-shadow: 2px 3px #292524;
  }
}
</style>