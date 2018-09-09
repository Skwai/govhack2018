<template>
  <div class="FightView">
    <div class="FightView__Trashemon">
      <h5>{{trashemon.name}}</h5>
      <h6>Level {{trashemonLevel}}</h6>
      <MobHealthBar :current="80" :total="100" />
    </div>

    <div class="FightView__Vs">Vs</div>

    <div class="FightView__Enemy">
      <h5>{{mob.name}}</h5>
      <h6>Level {{mobLevel}}</h6>
      <MobHealthBar :current="50" :total="100" />
    </div>

    <div class="FightView__EnemyAvatar">
      <img src="/avatar.png">
    </div>

    <AttackResult v-if="attackResult" :attackResult=attackResult />

    <div class="FightView__AttackResult">Enemy bin
      <output>Misses!</output>      
    </div>
    
    <div class="FightView__Attacks">
      <AppBtnGroup>
        <AppBtn
          v-for="attack in trashemon.attacks"
          :key="attack.name"
          @click.prevent="fight(attack)"
          >
            {{attack.name}}
        </AppBtn>
      </AppBtnGroup>
    </div>
  </div>
</template>

<script lang="ts">
import * as battle from '@/services/battle';

import { Component, Vue } from 'vue-property-decorator';
import Mob from '@/models/Mob';
import { IMobAttackType } from '@/data/mobs';

import AppBtn from '@/components/AppBtn.vue';
import AttackResult from '@/components/AttackResult.vue';
import AppBtnGroup from '@/components/AppBtnGroup.vue';
import MobHealthBar from '@/components/MobHealthBar.vue';

@Component({
  components: {
    MobHealthBar,
    AttackResult,
    AppBtn,
    AppBtnGroup
  }
})
export default class FightView extends Vue {
  attackResult: any = null;
  
  fight(attack: IMobAttackType) {
    this.attackResult = battle.fight(this.trashemon, this.mob, attack);
  }

  get mob(): Mob {
    return this.$store.getters['game/currentMob'];
  }

  get mobLevel(): number {
    return Mob.xpToLevel(this.mob.xp);
  }

  get trashemon(): Mob {
    return this.$store.getters['game/currentTrashemon'];
  }

  get trashemonLevel(): number {
    return Mob.xpToLevel(this.trashemon.xp);
  }
}
</script>

<style lang="stylus" scoped>
@keyframes bob {
  0%, 50% {
    margin-top: 0;
  }

  51%, 100% {
    margin-top: 1rem;
  }
}

.FightView {
  text-align: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #000;
  background-image: linear-gradient(to bottom, transparent, transparent 50%, black 75%), url('/bg.png');
  background-size: cover, cover;
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

  &__EnemyAvatar {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50vw;
    transform: translate(-50%, -50%);
    line-height: 0;
    animation: bob 1s infinite;

    img {
      max-width: 100%;
      height: auto;
    }
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
