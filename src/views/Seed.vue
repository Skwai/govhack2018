<template>
  <div class="Seed">
    <AppModal>
      <button type="button" @click.prevent="seed">Seed</button>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppModal from '@/components/AppModal.vue';
import db from '@/services/firestore';
import firebase from 'firebase';
import spawns from '../data/spawns.json';

@Component({
  components: {
    AppModal
  }
})
export default class SeedView extends Vue {
  async seed() {
    const collection = db.collection('spawns');

    (await collection.get()).forEach((spawn) => {
      spawn.ref.delete();
    });

    spawns.forEach((spawn: any[]) => {
      const [lat, long, type] = spawn;
      collection.add({
        type,
        coordinates: new firebase.firestore.GeoPoint(lat, long),
        cooldown: new Date()
      });
    });
  }
}
</script>
