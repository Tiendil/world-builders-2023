<template>
<prime-chip :label="person.name"
            class="cursor-pointer flex-none"
            :style="chipStyles"
            @click="game.selectPerson(person.id)"
            @remove.stop="unassignePerson"
            :removable="unassigneButton"/>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const properties = withDefaults(defineProps<{
  personId: t.PersonId;
  unassigneButton?: boolean;
}>(), {
  unassigneButton: false,
});

const person = computed(() => game.persons[properties.personId]);

const avatarStyle = computed(() => {
  return {
    'background-color': person.value.actualColor()
  };
});

function unassignePerson() {
  game.unasigneWorker(properties.personId);
}

const label = computed(() => {
  // split by space and take first letter of each word
  return person.value.name.split(' ').map((word) => word[0]).join('');
});

const chipStyles = computed(() => {
  return {
    'background-color': person.value.actualColor(),
    'width': 'min-content'
  };
});

</script>
