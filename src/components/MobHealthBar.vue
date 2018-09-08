<template>
  <div class="MobHealthBar">
    <div class="MobHealthBar__Value" :style="'width: ' + percent + '%'"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MobHealthBar extends Vue {
  @Prop({ type: Number, required: true })
  current!: number

  @Prop({ type: Number, required: true })
  total!: number

  get percent() {
    return (this.current / this.total * 100);
  }
};
</script>

<style lang="stylus" scoped>
.MobHealthBar {
  display: flex;
  align-items: center;
  background: #7B8F9D;
  box-shadow: black 0 0 0 1px, inset #617A8E 0 2px 0;
  width: 100%;
  border-radius: 2px;

  &__Value {
    box-shadow: inset #FE8079 0 2px 0, inset #E32E2C 0 -2px 0;
    background: #FF251F;
    height: 10px;
    width: 100%;
    border-radius: 2px;
  }
}
</style>