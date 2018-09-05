<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ example }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { readExample, dispatchUpdateExample } from '@/store';
import { Store } from 'vuex';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  get example(): string {
    return readExample(this.$store);
  }

  created(): void {
    dispatchUpdateExample(this.$store, 'Example string');
  }
}
</script>

<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
