<template>
  <div class="FightView">
    <h2>{{mob.name}}</h2> vs <h2>{{trashemon.name}}</h2>
    <div class="FightView__Trashemon">
      <h5>Scumosaur</h5>
      <h6>Level 12</h6>
      <MobHealthBar />
    </div>

    <div class="FightView__Vs">Vs</div>

    <div class="FightView__Enemy">
      <h5>{{mob.name}}</h5>
      <h6>Level 12</h6>
      <MobHealthBar />
    </div>
    
    <div class="FightView__Attacks">
      <AppBtnGroup>
        <AppBtn>Punch</AppBtn>
        <AppBtn>Kick</AppBtn>
        <AppBtn>Slap</AppBtn>
      </AppBtnGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Mob from '@/models/Mob';
import AppBtn from '@/components/AppBtn.vue';
import AppBtnGroup from '@/components/AppBtnGroup.vue';
import MobHealthBar from '@/components/MobHealthBar.vue';

@Component({
  components: {
    AppBtn,
    AppBtnGroup,
    MobHealthBar
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
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #000 url('/bg.png');
  background-size: cover;
  background-position: center bottom;

  &__Vs {
    position: absolute;
    left: 50%;
    top: 2.5rem;
    text-shadow: 2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
    z-index: 2;
    transform: translateX(-50%);
    text-transform: uppercase;
    font-size: 87.5%;
  }

  &__Attacks {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  &__Trashemon {
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    text-align: left;
  }

  &__Enemy {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    text-align: right;
  }

  &__Enemy, &__Trashemon {
    padding: 1rem;
    color: #fff;
    width: 11rem;
    background: #36414A;
    border-radius: 2px;
    box-shadow: #000 0 0 0 1px, inset #617A8E 0 2px 0;

    h5, h6 {
      margin: 0;
    }

    h5 {
      color: #000;
      text-shadow: 2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
    }

    h6 {
      margin: 0.5rem 0;
      color: #fff;
    }
  }
}
</style>