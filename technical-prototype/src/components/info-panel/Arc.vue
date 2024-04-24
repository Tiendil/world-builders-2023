<template>
  <div>

<h3>{{arcName}}</h3>

<prime-knob :min="0"
            :max="factory.pointsToStep"
            v-model="points"
            valueTemplate="{value}%"
            class="inline-block"
            readonly
            :size="75"/>

<div class="inline-block align-top ml-2">
  <span class="font-medium">step:</span> {{arc.step}}<br/>
  <span class="font-medium">role:</span> {{arc.roleOf(person.id)}}
</div>


</div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {useGameStore} from "@/stores/game";

const properties = defineProps<{
  arc: t.Arc;
  personId: t.PersonId;
}>();

const game = useGameStore();

const person = computed(() => game.persons[properties.personId]);

const factory = computed(() => game.arcFactories[properties.arc.id]);

const arcName = computed(() => {
  // capitalize first letter
  return factory.value.name.charAt(0).toUpperCase() + factory.value.name.slice(1);
});

const points = computed(() => {
  return Math.min(factory.value.pointsToStep, properties.arc.points);
});

</script>
