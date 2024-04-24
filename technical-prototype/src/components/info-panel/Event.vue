<template>
  <prime-card>
<template #title>
{{event.textLog}}
</template>

<template #content>

  <prime-fieldset legend="Challenges" :collapsed="false" toggleable>
    <game-info-panel-raw-challenges-list :challenge-type-ids="event.challengeTypes"/>
  </prime-fieldset>

</template>
</prime-card>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {useGameStore} from "@/stores/game";

const game = useGameStore();

const event = computed(() => game.events[game.infoMode.objectId]);
</script>
