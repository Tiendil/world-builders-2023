<template>

  <div :class="themesClasses(topic)">
    <template v-for="(theme, index) in topic.themes" :key="theme">
      <game-entity-name :entity-id="theme"/>
      <span v-if="index < topic.themes.length - 1"> & </span>
    </template>
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const properties = defineProps<{
  topic: t.Topic;
}>();

const game = useGameStore();

function themesClasses(topic: t.Topic) {
  const classes = [];

  if (topic.positivePoints > topic.negativePoints) {
    classes.push("text-green-800");
  }

  if (topic.positivePoints < topic.negativePoints) {
    classes.push("text-red-800");
  }

  return classes;
}

</script>
