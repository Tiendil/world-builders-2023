<template>
<game-person v-for="person in persons" :key="person.id" :person-id="person.id"/>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const persons = computed(() => {
  const _persons = [];

  for (const person of Object.values(game.persons)) {
    _persons.push(person);
  }

  _persons.sort((a, b) => a.name.localeCompare(b.name));

  return _persons;
});

</script>
