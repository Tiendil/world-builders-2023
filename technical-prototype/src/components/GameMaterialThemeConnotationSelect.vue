<template>

<div class="h-8">

  <prime-button v-if="!material.finished && material.canLower(materialTheme)"
                icon="pi pi-arrow-left"
                class="!align-baseline font-black"
                size="small"
                text
                :disabled="!material.canLower(materialTheme)"
                @click="material.lower(game, materialTheme)"/>

  <span class="w-8 inline-block" v-if="!material.finished && !material.canLower(materialTheme)"/>

  <game-entity-name :class="connotationClasses" :entity-id="properties.materialTheme"/>

  <prime-button v-if="!material.finished && material.canRaise(materialTheme)"
                class="!align-baseline font-black"
                icon="pi pi-arrow-right"
                size="small"
                text
                :disabled="!material.canRaise(materialTheme)"
                @click="material.raise(game, materialTheme)"/>

</div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const properties = defineProps<{
  materialId?: t.MaterialId;
  materialTheme: t.MaterialTheme;
}>();

const game = useGameStore();

const material = computed(() => game.materials[properties.materialId]);

const connotation = computed(() => {
  return material.value.themesConnotations[properties.materialTheme];
});

const connotationClasses = computed(() => {
  const classes = ["inline-block", "px-2", 'align-baseline'];

  if (material.value.isChanged(properties.materialTheme)) {
    classes.push("font-semibold");
  }

  if (connotation.value == t.MaterialThemeConnotation.negative) {
    classes.push("text-red-800");
  } else if (connotation.value == t.MaterialThemeConnotation.neutral) {
    // do nothing
  } else if (connotation.value == t.MaterialThemeConnotation.positive) {
    classes.push("text-green-800");
  } else {
    throw new Error('Unknown connotation');
  }

  return classes;
});

</script>
