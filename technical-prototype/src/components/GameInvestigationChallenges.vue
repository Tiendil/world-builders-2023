
<template>
  <div class="game-investigation-challenges">

    <game-investigation-challenge v-for="(challenge, index) in investigation.challenges"
                                  :key="challenge.id"
                                  :challenge="challenge"
                                  :investigation="investigation"/>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const properties = defineProps<{
  investigationId: t.InvestigationId;
}>();

const investigation = computed(() => game.investigations[properties.investigationId]);

</script>
