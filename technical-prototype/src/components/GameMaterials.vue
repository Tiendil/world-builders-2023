<template>

<prime-card>
  <template #title>
    Materials
  </template>

  <template #content>

        <p v-if="!game.hasMaterials()">No materials yet</p>

        <div v-else>
          <table class="w-full border-collapse mt-2">
            <thead>
              <tr class="border-b border-slate-100">
                <th>#</th>
                <th>Path</th>
                <th>Finished</th>
                <th>Twitter</th>
                <th>Newspaper</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="material in materials"
                  :key="material.id"
                  :class="materialItemClasses(material.id)"
                  @click="game.chooseMaterial(material.id)"
                  >
                <td>{{material.number}}</td>
                <td>{{material.name}}</td>
                <td class="text-center"><game-text-flag :state="material.finished"/></td>
                <td class="text-center"><game-text-flag :state="material.isPublishedInTwitter()"/></td>
                <td class="text-center"><game-text-flag :state="material.isPublishedInNewspaper()"/></td>
              </tr>
            </tbody>
          </table>
        </div>

  </template>
</prime-card>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";

const game = useGameStore();

const materials = computed(() => {
  const materials = Object.values(game.materials);
  materials.sort((a, b) => b.number - a.number);
  return materials;
});

function materialItemClasses(materialId: t.MaterialId) {
  const classes = ['p-1', 'cursor-pointer', 'hover:bg-slate-200', 'border-b', 'border-slate-100'];

  if (materialId == game.choosenMaterialId) {
    classes.push('bg-slate-200');
  }

  return classes;
}

// TODO: behavior of selectedMaterialId when material removed

</script>
