<template>
  <div class="MobHealthBar">
    <div class="MobHealthBar__Value"></div>
  </div>
</template>

<script>
export default {};
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
    width: 70%;
    border-radius: 2px;
  }
}
</style>