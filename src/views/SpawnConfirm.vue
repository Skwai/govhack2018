<template>
  <div class="SpawnConfirmView">
    <AppModal>
      <AppModalContent>
        <h4>You have encountered a wild</h4>
        <h2>{{mob.name}}</h2>
        <h5>Level {{xpToLevel(mob.xp)}}</h5>
      </AppModalContent>
      <AppBtnGroup>
        <AppBtn type="button" @click.prevent="flee">Flee</AppBtn>
        <AppBtn color="primary" type="button" @click.prevent="fight">Fight</AppBtn>
      </AppBtnGroup>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppModal from '@/components/AppModal.vue'
import AppBtnGroup from '@/components/AppBtnGroup.vue'
import AppBtn from '@/components/AppBtn.vue';
import AppModalContent from '@/components/AppModalContent.vue';
import Mob from '@/models/Mob';

@Component({
  components: {
    AppModal,
    AppBtn,
    AppBtnGroup,
    AppModalContent
  }
})
export default class SpawnConfirmView extends Vue {
  get spawnId(): string {
    return this.$route.params.spawnId
  }

  get mob(): Mob {
    return this.$store.getters['game/currentMob']
  }

  async created() {
    await this.$store.dispatch('game/updateSpawnCooldown', this.spawnId)
  }

  xpToLevel(xp: number): number {
    return Mob.xpToLevel(xp)
  }

  flee() {
    this.$router.push({ name: 'Home' })
  }

  fight() {
    const { spawnId } = this
    this.$router.push({ name: 'Stable', params: { spawnId }})
  }
}
</script>

<style lang="stylus" scoped>
.SpawnConfirmView {
  text-align: center;

  h2 {
    color: #31C3CB;
  }
}
</style>
