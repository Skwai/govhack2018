<template>
  <div class="StableView">
    <AppModal>
      <h2>You have encountered a wild</h2>
      <h3>{{mob.name}}</h3>
      <h4>Level {{mob.level}}</h4>
      <button type="button" @click.prevent="flee">Run away</button>
      <button type="button" @click.prevent="fight">Fight</button>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppModal from '@/components/AppModal.vue'
import Mob from '@/models/Mob';

@Component({
  components: {
    AppModal
  }
})
export default class SpawnConfirm extends Vue {
  get spawnId(): string {
    return this.$route.params.spawnId
  }

  get mob(): Mob {
    return this.$store.getters['game/currentMob']
  }

  async flee() {
    await this.$store.dispatch('game/updateSpawnCooldown', this.spawnId)
    this.$router.push({ name: 'Home' })
  }

  fight() {
    const {spawnId} = this
    this.$router.push({ name: 'Stable', params: { spawnId }})
  }
}
</script>
