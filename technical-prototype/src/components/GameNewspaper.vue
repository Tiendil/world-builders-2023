<template>
<prime-card class="max-h-96 overflow-auto">
  <template #title>
    Newspaper
  </template>

  <template #content>

    <prime-message v-if="game.logicTime.shouldReleaseNewspaperToday() && !game.logicTime.mustReleaseNewspaper()"
                   severity="info"
                   :closable="false">
      You should release newspaper today.
    </prime-message>

    <prime-message v-if="game.logicTime.mustReleaseNewspaper()"
                   severity="warn"
                   :closable="false">
      You must release newspaper now.
    </prime-message>

    <game-material-choose :materialIds="availableMaterialIds"
                          v-model:selectedMaterialId="material1Id"
                          placeholder="First Page"/>

    <hr class="my-2"/>

    <game-material-choose :materialIds="availableMaterialIds"
                          class="mb-2"
                          v-model:selectedMaterialId="material21Id"
                          placeholder="Second Page"/>

    <br/>

    <game-material-choose :materialIds="availableMaterialIds"
                          class="mb-2"
                          v-model:selectedMaterialId="material22Id"
                          placeholder="Second Page"/>

    <prime-message v-if="!isOnlyUnique"
                   :closable="false"
                   severity="error">
      Materials must be unique
    </prime-message>

    <br/>

    <prime-button :disabled="!isOnlyUnique || !allMaterialsSelected"
                  @click="publish()">
      Publish
    </prime-button>
  </template>
  </prime-card>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";

const game = useGameStore();

const material1Id = ref<t.MaterialId | null>(null);

const material21Id = ref<t.MaterialId | null>(null);
const material22Id = ref<t.MaterialId | null>(null);

const availableMaterialIds = computed(() => {
  return Object.keys(game.materials).filter(materialId => !game.materials[materialId].isPublishedInNewspaper());
});

const selectedMaterialIds = computed(() => {
  return [material1Id.value, material21Id.value, material22Id.value];
});

const isOnlyUnique = computed(() => {
  const noneBStoris = selectedMaterialIds.value.filter(id => id != null).filter(id => id.code != 'b-story');

  const ids = noneBStoris.map(id => id.code);

  return ids.length == new Set(ids).size;
});

const allMaterialsSelected = computed(() => {
  return selectedMaterialIds.value.every(id => id != null);
});

const atLeastOneMaterial = computed(() => {
  return selectedMaterialIds.value.some(id => id != null);
});

function publish() {
  if (!isOnlyUnique.value) {
    throw new Error("Materials must be unique");
  }

  if (!atLeastOneMaterial.value) {
    throw new Error("No material selected");
  }

  game.publishInNewspaper({firstPage: [material1Id.value.code],
                           secondPage: [material21Id.value.code, material22Id.value.code]});
  material1Id.value = null;
  material21Id.value = null;
  material22Id.value = null;
}


</script>
