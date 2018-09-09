<template>
  <div class="AttackResult">
    {{outcome}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as battle from '@/services/battle';

@Component
export default class AttackResult extends Vue {
  @Prop({ type: Object, required: true })
  attackResult: any;

  get outcome(): string {
    const { attackResult } = this

    if (!attackResult) {
      return ""
    }

    switch (attackResult.outcome) {
      case battle.OutcomeType.MISS:
        return 'Your attack missed!'
      case battle.OutcomeType.HIT:
        return `You dealt ${attackResult.damage} damage!`;
      case battle.OutcomeType.CRITICAL:
        return `You crit for ${attackResult.damage} damage!`
    }
    return ''
  }
}
</script>

<style lang="stylus" scoped>
.AttackResult {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;

  output {
    font-size: 2rem;
    display: block;
  }
}
</style>