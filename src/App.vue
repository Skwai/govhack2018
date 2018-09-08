<template>
  <div id="app">
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
import { ILatLng } from '@/store/geolocation/state';

@Component({
  components: {
    AppLoading,
    TheMap
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
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="stylus">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
