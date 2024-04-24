<template>
  <prime-card>
    <template #title>
      <span :style="avatarNameStyle" class="p-2">{{organization.name}}</span>
    </template>
    <template #content>

<prime-panel header="Challenges" :collapsed="true" toggleable>
  <game-info-panel-raw-challenges-list :challenge-type-ids="organization.challengeTypes"/>
</prime-panel>

</template>
  </prime-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {useGameStore} from "@/stores/game";

const game = useGameStore();

const organization = computed(() => game.organizations[game.infoMode.objectId]);

const avatarNameStyle = computed(() => {
  return {
    'background-color': organization.value.color,
  };
});
</script>
