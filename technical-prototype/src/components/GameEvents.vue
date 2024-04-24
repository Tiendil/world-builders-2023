<template>

  <prime-card class="max-h-96 overflow-auto">
    <template #title>
      Events
    </template>
    <template #content>
      <div v-if="game.hasEvents()">
        <game-event v-for="eventId in eventIds" :key="eventId" :event-id="eventId"/>
      </div>

      <p v-else>No events yet</p>
    </template>
  </prime-card>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";

const game = useGameStore();

const eventIds = computed(() => game.eventsLog.slice().reverse());

</script>
