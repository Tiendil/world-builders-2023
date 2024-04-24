<template>

  <table class="w-full">
    <thead>
      <tr>
        <th>Topic Points</th>
        <th class="text-left"><i class="pi pi-thumbs-up text-green-800" v-prime-tooltip="{ value: 'Strongest of positive opinion', showDelay: 700, hideDelay: 300 }"></i></th>
        <th class="text-left"><i class="pi pi-thumbs-down text-red-800" v-prime-tooltip="{ value: 'Strongest of negative opinion', showDelay: 700, hideDelay: 300 }"></i></th>
        <th class="text-left"><i class="pi pi-chart-line" v-prime-tooltip="{ value: 'Hotnes of topic', showDelay: 700, hideDelay: 300 }"></i></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="topic in topics">
        <td>
          <game-topic-themes :topic="topic"/>
        </td>
        <td>
          {{topic.positivePoints.toFixed(2)}}
        </td>
        <td>
          {{topic.negativePoints.toFixed(2)}}
        </td>
        <td>
          {{topic.hotness.toFixed(1)}}
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const properties = defineProps<{
  topics: t.Topic[];
}>();

const game = useGameStore();

</script>
