<template>
  <div id="app">
    <AppLoading v-if="loading" />
    <router-view v-else-if="loaded" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Spawn from '@/models/Spawn';
import AppLoading from '@/components/AppLoading.vue'
import { ILatLng } from '@/store/state';

@Component({
  components: {
    AppLoading
  }
})
export default class App extends Vue {
  loading = false

  get spawns(): Spawn[] {
    return this.$store.getters.spawns
  }

  get coords(): ILatLng {
    return this.$store.getters.coords
  }

  get loaded(): boolean {
    return !!this.spawns.length && this.coords && !this.loading;
  }

  async created(): Promise<void> {
    this.loading = true;
    try {
      await Promise.all([      
        this.$store.dispatch('getCurrentPosition'),
        this.$store.dispatch('getSpawns')
      ])
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
