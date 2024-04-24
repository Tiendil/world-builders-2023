
<template>
  <div :class="challengeClasses">
    <i v-if="index < investigation.pointer && challenge.successed" class="pi pi-check"></i>
    <i v-if="index < investigation.pointer && !challenge.successed" class="pi pi-ban"></i>
    <i v-if="index == investigation.pointer" class="pi pi-search"></i>

    <span v-if="index > investigation.pointer" class="inline-block w-4"></span>

    <span v-if="index >= investigation.pointer" class=""> [{{probablity}}]</span>

    {{challenge.name}}
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const properties = defineProps<{
  challenge: t.Challenge;
  investigation: t.Investigation;
}>();

const probablity = computed(() => {
  const participants = [];

  for (const personId of properties.investigation.participants) {
    const person = game.persons[personId];
    participants.push(person);
  }

  if (participants.length == 0) {
    return '?';
  }

  const probability = properties.challenge.successChance({persons: participants});

  return (probability*100).toFixed(0) + '%';
});

const index = computed(() => {
  for (let i = 0; i < properties.investigation.challenges.length; i++) {
    if (properties.investigation.challenges[i].id == properties.challenge.id) {
      return i;
    }
  }
});

const challengeClasses = computed(() => {
  const classes = ['text-sm',];

  if (index.value < properties.investigation.pointer) {
    if (properties.challenge.successed) {
      classes.push('border-green-600 text-green-600');
    } else {
      classes.push('border-red-600 text-red-600');
    }
  } else if (index.value == properties.investigation.pointer) {
    classes.push('border-blue-600 text-blue-600');
  } else {
    classes.push('');
  }

  return classes;
});

</script>
