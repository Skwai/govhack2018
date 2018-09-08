<template>
  <div class="SpawnConfirm">
    <AppModal>
      <AppModalContent>
        <h4>You have encountered a wild</h4>
        <h2>{{mob.name}}</h2>
        <h5>Level {{mob.level}}</h5>
      </AppModalContent>
      <AppBtnGroup>
        <AppBtn type="button" @click.prevent="flee">Run away</AppBtn>
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
export default class SpawnConfirm extends Vue {
  get spawnId(): string {
    return this.$route.params.spawnId
  }

  get mob(): Mob {
    return this.$store.getters['game/currentMob']
  }

  async created() {
    await this.$store.dispatch('game/updateSpawnCooldown', this.spawnId)
  }

  async flee() {
    this.$router.push({ name: 'Home' })
  }

  fight() {
    const {spawnId} = this
    this.$router.push({ name: 'Stable', params: { spawnId }})
  }
}
</script>

<style lang="stylus" scoped>
.SpawnConfirm {
  text-align: center;
}
</style>
