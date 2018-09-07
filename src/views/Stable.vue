<template>
  <div class="StableView">
    <AppModal>
      <h2>Stable</h2>
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
export default class StableView extends Vue {
}
</script>
