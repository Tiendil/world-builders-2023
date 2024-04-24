<template>
  <div>
    <p v-if="challenges.length == 0">No personalized challenges</p>

    <ul v-else class="list-disc">
      <li v-for="challenge in challenges" :key="challenges.id">
        {{challenge.name}}
      </li>
    </ul>

  </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const properties = defineProps<{
  challengeTypeIds: t.ChallengeTypeId[];
}>();

const game = useGameStore();

const challenges = computed(() => {
  const challenges = [];

  for (const challengeTypeId of properties.challengeTypeIds) {
    const challengeType = game.challengeTypes[challengeTypeId];
    challenges.push(challengeType);
  }

  challenges.sort((a, b) => a.name.localeCompare(b.name));

  return challenges;
});

</script>
