<template>
  <div class="App">
    <TheHeader />
    <AppLoading v-if="loading" />
    <template v-else-if="loaded">

      <TheMap />
      <router-view />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Spawn from '@/models/Spawn';
import AppLoading from '@/components/AppLoading.vue';
import TheMap from '@/components/TheMap.vue';
import TheHeader from '@/components/TheHeader.vue';
import { ILatLng } from '@/store/geolocation/state';

@Component({
  components: {
    AppLoading,
    TheMap,
    TheHeader
  }
})
export default class App extends Vue {
  loading = false;

  get coords(): ILatLng {
    return this.$store.getters['geolocation/coords'];
  }

  get loaded(): boolean {
    return this.coords && !this.loading;
  }

  async created(): Promise<void> {
    this.loading = true;
    try {
      await Promise.all([await this.$store.dispatch('auth/authenticate')]);
      const { uid } = this.$store.getters['auth/currentUser'];
      const coords = this.$store.getters['geolocation/coords'];
      await this.$store.dispatch('game/getOrCreateUser', { uid, coords });
      await this.$store.dispatch('game/getUsersTrashemon', { uid, coords});
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="stylus">
@require './styles/config';

.App {
  font-family: $fontFamily;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

input, button, textarea {
  font: inherit;
  line-height: inherit;
}

body {
  margin: 0;
  background: $colorSecondary;
  font-size: 14px;
  line-height: 1.5;
}
</style>
