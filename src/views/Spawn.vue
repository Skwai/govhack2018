<template>
  <div class="SpawnView">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppModal from '@/components/AppModal.vue'
import Spawn from '@/models/Spawn';
import Mob from '@/models/Mob';

@Component({
  components: {
    AppModal
  }
})
export default class SpawnView extends Vue {
  get spawn(): Spawn | undefined {
    return this.$store.getters['game/spawnById'](this.spawnId)
  }

  get spawnId(): string {
    return this.$route.params.spawnId
  }

  created() {
    if (!this.spawn) {
      this.$router.push('/')
      return;
    }
    const mob = Mob.fromSpawn(this.spawn)
    this.$store.dispatch('game/setCurrentMob', mob)
  }

  destroyed() {
    this.$store.dispatch('game/unsetCurrentMob')
  }
}
</script>
