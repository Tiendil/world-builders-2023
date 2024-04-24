<template>
<div>
<span :class="timeClasses">{{time}}</span> of day <span class="font-medium">{{game.logicTime.day}}</span>
</div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";
import * as gameTime from "@/logic/gameTime";

const game = useGameStore();

const time = computed(() => {
  const _time = game.logicTime.time.toString();
  return _time[0].toUpperCase() + _time.slice(1);
});

const timeClasses = computed(() => {
  const classes = ['font-medium'];

  if (game.logicTime.time === gameTime.DayTime.morning) {
    classes.push('text-orange-600');
  } else if (game.logicTime.time === gameTime.DayTime.afternoon) {
    classes.push('text-green-600');
  } else if (game.logicTime.time === gameTime.DayTime.evening) {
    classes.push('text-blue-600');
  } else {
    classes.push('text-gray-600');
  }

  return classes;
});


</script>
