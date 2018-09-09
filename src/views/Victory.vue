<template>
  <div class="SpawnConfirmView">
    <AppModal>
      <AppModalContent>
        <h3>Congratus!</h3>
        <h4>You have defeated the wild</h4>
        <h2>{{mob.name}}</h2>
        <h5>Level {{xpToLevel(mob.xp)}}</h5>
      </AppModalContent>
      <AppBtnGroup>
        <AppBtn type="button" color="primary">Capture</AppBtn>
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

  xpToLevel(xp: number): number {
    return Mob.xpToLevel(xp)
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
