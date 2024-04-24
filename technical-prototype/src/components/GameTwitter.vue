<template>
  <prime-card class="max-h-96 overflow-auto">
    <template #title>
      Twitter
    </template>

    <template #content>

      <prime-message v-if="game.logicTime.shouldTwitToday() && !game.logicTime.mustTwit()"
                     severity="info"
                     class=""
                     :closable="false">
        You should twit today.
      </prime-message>

      <prime-message v-if="game.logicTime.mustTwit()"
                     severity="warn"
                     class=""
                     :closable="false">
        You must twit now.
      </prime-message>

      <game-material-choose :materialIds="availableMaterialIds"
                            class="mb-2"
                            placeholder="Select material"
                            v-model:selectedMaterialId="nextMaterialId"/>

      <br/>

      <prime-button :disabled="nextMaterialId === null"
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

const nextMaterialId = ref<t.MaterialId | null>(null);

const availableMaterialIds = computed(() => {
  return Object.keys(game.materials).filter(materialId => !game.materials[materialId].isPublishedInTwitter());
});

function publish() {
  if (nextMaterialId.value == null) {
    throw new Error("No material selected");
  }

  game.publishInTwitter({materialId: nextMaterialId.value.code});
  nextMaterialId.value = null;
}

</script>
