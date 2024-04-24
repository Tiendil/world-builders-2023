<template>
<select @change="updateSelection($event.target.value)">
  <option value="" :selected="personId==null">—</option>
  <option v-for="candidateId in candidateIds"
          :selected="candidateId==personId"
          :key="candidateId"
          :value="candidateId">
    {{game.persons[candidateId].name}}
  </option>
</select>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const properties = defineProps<{
  candidateIds: t.PersonId[];
}>();

const personId = ref<t.PersonId | null>(null);

const person = computed(() => properties.personId == null ? null : game.persons[properties.personId]);

const avatarStyle = computed(() => {
  if (person.value == null) {
    return {
      'background-color': 'gray'
    };
  }

  return {
    'background-color': person.value.color,
  };
});

const emit = defineEmits(["person:selected"]);

function updateSelection(personId: t.PersonId) {
  emit("person:selected", {personId: personId});
}

</script>
