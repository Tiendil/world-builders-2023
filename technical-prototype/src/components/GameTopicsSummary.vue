<template>

  <prime-card>
    <template #title>
      Public Agenda
    </template>

    <template #content>

    <p>
      Population: {{game.totalCitizens}}
    </p>

    <div v-if="game.topicsSummary.length == 0">
      <p>No topics in discussion yet</p>
    </div>

    <table v-else class="w-full">
      <thead>
        <tr class="border-b border-slate-100">
          <th>Topic</th>
          <th class="text-left"><i class="pi pi-thumbs-up text-green-800" v-prime-tooltip="{ value: '% of population with positive opinion', showDelay: 700, hideDelay: 300 }"></i></th>
          <th class="text-left"><i class="pi pi-question" v-prime-tooltip="{ value: '% of population with neutral opinion', showDelay: 700, hideDelay: 300 }"></i></th>
          <th class="text-left"><i class="pi pi-thumbs-down text-red-800" v-prime-tooltip="{ value: '% of population with negative opinion', showDelay: 700, hideDelay: 300 }"></i></th>
          <th class="text-left"><i class="pi pi-chart-line" v-prime-tooltip="{ value: 'Hotnes of topic', showDelay: 700, hideDelay: 300 }"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="topicSummary in game.topicsSummary"
            :key="topicSummary.id"
            class="border-b border-slate-100">
          <td :class="themesClasses(topicSummary)">
            <template v-for="(theme, index) in topicSummary.themes" :key="theme">
              <game-entity-name :entity-id="theme"/>
              <span v-if="index < topicSummary.themes.length - 1"> & </span>
            </template>
          </td>

          <td><game-percents :value="topicSummary.positivePersons" :total="game.totalCitizens" :precision="1"/></td>
          <td><game-percents :value="topicSummary.neutralPersons" :total="game.totalCitizens" :precision="1"/></td>
          <td><game-percents :value="topicSummary.negativePersons" :total="game.totalCitizens" :precision="1"/></td>
          <td>{{topicSummary.hotness.toFixed(1)}}</td>
        </tr>
      </tbody>
    </table>

   </template>
   </prime-card>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const properties = defineProps<{
}>();

const game = useGameStore();

function themesClasses(topicSummary: t.TopicSummary) {
  const classes = [];

  if (topicSummary.positivePersons > topicSummary.negativePersons) {
    classes.push("text-green-800");
  }

  if (topicSummary.positivePersons < topicSummary.negativePersons) {
    classes.push("text-red-800");
  }

  return classes;
}

</script>
