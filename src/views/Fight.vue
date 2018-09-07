<template>
  <div class="FightView">
    <AppModal>
      <h2>Fight</h2>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppModal from '@/components/AppModal.vue'
import Mob from '@/models/Mob';

@Component({
  components: {
    AppModal
  }
})
export default class FightView extends Vue {
}
</script>
