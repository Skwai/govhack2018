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
    return this.$store.getters.spawnById(this.spawnId)
  }

  get spawnId(): string {
    return this.$route.params.spawnId
  }

  created() {
    if (!this.spawn) {
      this.$router.push('/')
      return;
    }
    this.$store.dispatch('setCurrentMob', Mob.fromSpawn(this.spawn))
  }

  destroyed() {
    this.$store.dispatch('unsetCurrentMob')
  }
}
</script>
