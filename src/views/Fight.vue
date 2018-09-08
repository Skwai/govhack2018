<template>
  <div class="FightView">
    <AppModal>
      <h2>{{mob.name}}</h2> vs <h2>{{trashemon.name}}</h2>
      <AppBtnGroup>
        <AppBtn @click.prevent="punch">Punch</AppBtn>
        <AppBtn @click.prevent="kick">Kick</AppBtn>
        <AppBtn @click.prevent="slap">Slap</AppBtn>
      </AppBtnGroup>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppModal from '@/components/AppModal.vue';
import Mob from '@/models/Mob';
import AppBtnGroup from '@/components/AppBtnGroup.vue';
import AppBtn from '@/components/AppBtn.vue';

@Component({
  components: {
    AppModal,
    AppBtnGroup,
    AppBtn
  }
})
export default class FightView extends Vue {
  get mob(): Mob {
    return this.$store.getters['game/currentMob'];
  }

  get trashemon(): Mob {
    return this.$store.getters['game/currentTrashemon'];
  }
}
</script>

<style lang="stylus" scoped>
.FightView {
  text-align: center;
}
</style>