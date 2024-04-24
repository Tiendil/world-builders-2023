<template>
  <span v-if="properties.state" class="text-green-800">{{properties.textYes}}</span>
  <span v-else class="text-red-800">{{properties.textNo}}</span>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";

const properties = withDefaults(defineProps<{
  textYes?: string;
  textNo?: string;
  state: boolean;
}>(), {
  textYes: "yes",
  textNo: "no"
});

</script>
