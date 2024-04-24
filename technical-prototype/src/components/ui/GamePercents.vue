<template>
<div class="inline-block cursor-default"
     v-prime-tooltip="{ value: tooltip, showDelay: 700, hideDelay: 300 }">{{percent}}%</div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";

const properties = withDefaults(defineProps<{
  value: number;
  total: number;
  precision?: number;
}>(), {
  precision: 2,
});

const percent = computed(() => {
  return properties.total === 0 ? 0 : (properties.value / properties.total * 100).toFixed(properties.precision);
});

const tooltip = computed(() => {
  return `${properties.value} / ${properties.total}`;
});

</script>
