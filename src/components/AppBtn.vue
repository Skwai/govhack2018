<template>
  <button
    :class="$style.AppBtn"
    :disabled="disabled"
    :type="type"
    :color="color"
    :size="size"
    :block="block"
    @click="click"
    class="AppBtn"
  >
    <span :class="$style.AppBtn__Label"><slot /></span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppBtn extends Vue {
  @Prop({ type: [String, Object] })
  private to?: string | {}

  @Prop({ required: false })
  private color?: string

  @Prop() private size?: string

  @Prop({ default: false, required: false })
  private block?: boolean

  @Prop({ default: false, required: false })
  private loading?: boolean

  @Prop({ default: 'button', required: false })
  private type?: string

  @Prop({ default: false, required: false })
  private disabled?: boolean

  private click(ev: Event) {
    if (this.loading) {
      ev.preventDefault()
      return false
    }

    this.$emit('click', ev)
  }
}
</script>

<style lang="stylus" module>
@require '../styles/config';

.AppBtn {
  flex: 1;
  padding: 1rem 2rem;
  display: inline-flex;
  align-items: center;
  transition: transitionBase;
  text-decoration: none;
  background: transparent;
  color: inherit;
  border: 0;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  transition: 0.15s background;
  justify-content: center;
  background-color: $colorSecondary;

  &:hover, &:focus {
    color: $colorPrimary;
  }

  &[block] {
    display: block;
    width: 100%;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus, &:active {
    outline: 0;
  }

  &[loading] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[loading] &__Label {
    opacity: 0;
  }

  &__Loading {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2rem;
    height: 2rem;
    transform: translate(-50%, -50%);
  }

  &[color='stroke'] {
    box-shadow: inset rgba($colorPrimary, 0.5) 0 0 0 1px;
    color: $colorPrimary;
  }

  &[color='primary'] {
    background: $colorPrimary;
    box-shadow: none;
    color: #fff;

    &:hover, &:focus {
      background: lighten($colorPrimary, 7%);
    }
  }
}
</style>
