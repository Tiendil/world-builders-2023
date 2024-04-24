<template>
<prime-card>
  <template #title>
    <template v-if="material == null">
      No material selected
    </template>
    <template v-else>
      <div v-html="material.caption"/>
    </template>
  </template>

<template #content>

  <div v-if="material != null" class="flex">

    <div class="mr-2 flex-grow">

      <p v-if="!material.finished">
        <span class="mr-1 ml-10 align-middle">Insights:</span>

        <div v-if="insightStars.length === 0" class="inline-block">
          no insights
        </div>

        <div v-else class="inline-block">
          <i class="pi pi-star mr-1 text-yellow-500 align-middle"
             v-for="x in insightStars"></i>
        </div>
      </p>

      <game-material-theme-connotation-select v-for="(connotation, materialTheme) in material.themesConnotations"
                                              :key="materialTheme"
                                              :materialId="materialId"
                                              :materialTheme="materialTheme"/>

      <prime-message v-if="!material.finished && !material.canBeFinished()" severity="error" :closable="false">
        Material should have <= 3 non-neutral themes.
      </prime-message>

    </div>

    <div class="flex flex-col">

      <prime-button v-if="!material.finished && material.canBeFinished()"
                    class="mr-2"
                    outlined
                    @click="game.finishMaterial(materialId)">
        Finish
      </prime-button>

      <prime-button class="mt-2"
                    outlined
                    severity="danger"
                    @click="game.removeMaterial(materialId)">
        Remove
      </prime-button>
    </div>

  </div>

  </template>

</prime-card>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as captions from "@/logic/captions";

const properties = withDefaults(defineProps<{
  materialId?: t.MaterialId;
}>(), {
  materialid: null,
});

const game = useGameStore();

const material = computed(() => properties.materialId == null ? null : game.materials[properties.materialId]);

const insightStars = computed(() => {
  const stars = [];
  for (let i = 0; i < material.value.pointsLeft(); i++) {
    stars.push(i);
  }
  return stars;
});

</script>
