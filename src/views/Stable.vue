<template>
  <div class="StableView">
    <AppModal>
      <AppModalContent>
        <h4>Select a Trashemon to fight with</h4>
      </AppModalContent>
      <div
        v-for="trashemon in trashemons"
        :key="trashemon.id"
        class="StableView__Trashemon"
        :aria-selected="selectedTrashemonId === trashemon.id"
        tabindex="-1"
        @click="selectTrashemon(trashemon.id)"
      >
        <h3>{{trashemon.name}}</h3>
        <p>Level {{xpToLevel(trashemon.xp)}}</p>
      </div>
      <AppBtnGroup>
        <AppBtn :disabled="!selectedTrashemonId" color="primary" @click.prevent="confirm">Confirm</AppBtn>
      </AppBtnGroup>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppModal from '@/components/AppModal.vue';
import AppModalContent from '@/components/AppModalContent.vue';
import AppBtnGroup from '@/components/AppBtnGroup.vue';
import AppBtn from '@/components/AppBtn.vue';
import Mob from '@/models/Mob';
import Trashemon from '@/models/Trashemon';

@Component({
  components: {
    AppModal,
    AppModalContent,
    AppBtnGroup,
    AppBtn
  }
})
export default class StableView extends Vue {
  selectedTrashemonId: string = '';

  get trashemons() {
    return this.$store.getters['game/currentUserTrashemons'];
  }

  selectTrashemon(trashemonId: string) {
    this.selectedTrashemonId = trashemonId;
  }

  confirm() {
    this.$store.dispatch(
      'game/setCurrentTrashemon',
      this.trashemons.find((t: Trashemon) => t.id === this.selectedTrashemonId)
    );
    this.$router.push({ name: 'Fight', params: { spawnId: this.$route.params.spawnId } });
  }

  xpToLevel(xp: number) {
    return Mob.xpToLevel(xp);
  }
}
</script>

<style lang="stylus" scoped>
.StableView {
  text-align: center;

  &__Trashemon {
    padding: 1.5rem 1.5rem;
    text-align: left;

    &:focus {
      outline: 0;
      box-shadow: none;
    }

    > :first-child {
      margin-top: 0;
    }

    > :last-child {
      margin-bottom: 0;
    }

    &[aria-selected='true'] {
      background: $colorSecondary;
    }
  }
}
</style>
