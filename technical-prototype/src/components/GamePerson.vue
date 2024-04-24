<template>
<div class="game-person-avatar text-center inline-block m-2 relative" @click="game.selectPerson(person.id)">

  <div class="block">
    <prime-avatar :label="label" :style="avatarStyle" shape="circle" size="large"/>
  </div>

  <span class="">{{person.name}}</span>

  <prime-message v-if="topicOpinion != null"
                 class="absolute -top-14 left-5 z-50 min-w-full break-keep whitespace-nowrap"
                 @click.stop=""
                 @close="game.hideOpinion()"
                 severity="info"
                 :closable="true">
    <span :style="opinionNameStyle" class="text-black p-1">{{person.name}}</span>
    {{opinionPrefix}}
    <game-topic-themes class="inline-block" :topic="topicOpinion.topic"/>
  </prime-message>
</div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const properties = withDefaults(defineProps<{
  personId: t.PersonId;
  unassigneButton?: boolean;
}>(), {
  unassigneButton: false,
});

const person = computed(() => game.persons[properties.personId]);

const avatarStyle = computed(() => {
  return {
    'background-color': person.value.actualColor()
  };
});

const opinionNameStyle = computed(() => {
  return {
    'background-color': person.value.actualColor(),
  };
});

const label = computed(() => {
  // split by space and take first letter of each word
  return person.value.name.split(' ').map((word) => word[0]).join('');
});

const topicOpinion = computed(() => {
  if (game.shownOpinion == null) {
    return null;
  }

  if (game.shownOpinion.personId != properties.personId) {
    return null;
  }

  return game.shownOpinion;
});

const opinionPrefix = computed(() => {
  if (topicOpinion.value == null) {
    return '';
  }

  if (topicOpinion.value.topic.connotation() == t.MaterialThemeConnotation.positive) {
    return '🥰😄🙂👍';
  }

  return '🤬😢😠👎';
});

</script>
