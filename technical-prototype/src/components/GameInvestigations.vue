<template>

  <prime-card class="max-h-96 overflow-auto">
    <template #title>
      Investigations
    </template>
    <template #content>
      <p v-if="!game.hasInvestigations()">No active investigations</p>

      <game-investigation v-for="investigation in investigations" :key="investigation.id" :investigation-id="investigation.id"/>
    </template>
  </prime-card>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const investigations = computed(() => {
  const _investigations = [];

  for (const investigation of Object.values(game.investigations)) {
    _investigations.push(investigation);
  }

  _investigations.sort((a, b) => -a.startedAt.compare(b.startedAt));

  return _investigations;
});

</script>
