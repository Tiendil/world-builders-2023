<template>
  <prime-card>
<template #title>
{{investigation.name}}
</template>

<template #content>

  <prime-fieldset legend="Challenges" :collapsed="false" toggleable>
    <game-investigation-challenges :investigation-id="investigation.id"/>
  </prime-fieldset>

</template>

</prime-card>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {useGameStore} from "@/stores/game";

const game = useGameStore();

const investigation = computed(() => game.investigations[game.infoMode.objectId]);
</script>
