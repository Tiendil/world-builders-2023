<template>
<prime-dropdown v-model="selectedMaterialId"
                :options="materialsForSelect"
                optionLabel="name"
                :placeholder="placeholder"
                class="w-full md:w-[14rem]">
  <template #option="slotProps">
    <div v-html="slotProps.option.name"/>
  </template>

  <template #value="slotProps">
    <div v-if="slotProps.value" v-html="slotProps.value.name"/>
    <span v-else>
      {{ slotProps.placeholder }}
    </span>
  </template>

</prime-dropdown>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const selectedMaterialId = defineModel<t.MaterialId|null>('selectedMaterialId', {type: t.MaterialId, default: null});

const properties = defineProps<{
  materialIds: t.MaterialId[];
  placeholder: string;
}>();

const finishedMaterialIds = computed(() => properties.materialIds.filter(materialId => game.materials[materialId].finished));

const materialsForSelect = computed(() => {
  const _materials = [];

  for (const materialId of finishedMaterialIds.value) {
    _materials.push({name: game.materials[materialId].caption,
                     code: materialId});
  }

  _materials.push({name: 'B-Grade Story', code: 'b-story'});

  return _materials;
});

const emit = defineEmits(["material:selected"]);

function chooseMaterial(materialId: t.MaterialId) {
  selectedMaterialId.value = materialId;
}

</script>
