<template>
  <prime-card>
<template #title>
  <span :style="avatarNameStyle" class="p-2">{{person.name}}</span>
</template>

<template #content>

  <prime-tag v-for="statement in person.statements" :key="statement.id" rounded severity="info" class="ml-1 mb-1 font-normal !text-sm">
      <game-entity-name :entity-id="statement.id"/>
  </prime-tag>

  <table class="w-full border-collapse mt-2">
    <thead>
      <tr class="border-b border-slate-100">
        <th>Mind</th>
        <th class="w-16"></th>
        <th>Spirit</th>
        <th class="w-16"></th>
        <th>Body</th>
        <th class="w-16"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-slate-100">
        <td>logic</td><td class="text-center">{{person.attributes.logic}}</td>
        <td>empathy</td><td class="text-center">{{person.attributes.empathy}}</td>
        <td>agility</td><td class="text-center">{{person.attributes.agility}}</td>
      </tr>
      <tr class="border-b border-slate-100">
        <td>awareness</td><td class="text-center">{{person.attributes.awareness}}</td>
        <td>charisma</td><td class="text-center">{{person.attributes.charisma}}</td>
        <td>endurance</td><td class="text-center">{{person.attributes.endurance}}</td>
      </tr>
      <tr class="border-b border-slate-100">
        <td>knowledge</td><td class="text-center">{{person.attributes.knowledge}}</td>
        <td>willpower</td><td class="text-center">{{person.attributes.willpower}}</td>
        <td>strength</td><td class="text-center">{{person.attributes.strength}}</td>
      </tr>
      <tr class="border-b border-slate-100">
        <td>divination</td><td class="text-center">{{person.attributes.divination}}</td>
        <td>sensitivity</td><td class="text-center">{{person.attributes.sensitivity}}</td>
        <td>witchery</td><td class="text-center">{{person.attributes.witchery}}</td>
      </tr>
    </tbody>
  </table>

  <prime-fieldset legend="Other Stats">
    <ul>
      <li>Alive: <game-text-flag :state="person.isAlive"/></li>
      <li>Followers: {{person.followers()}}</li>
    </ul>
  </prime-fieldset>

  <prime-fieldset legend="Memory">
    <p v-if="person.memory.length == 0">No topics in memories</p>
    <game-person-topics v-else :topics="person.memory"/>
  </prime-fieldset>

  <prime-fieldset legend="Arcs">
    <p v-if="arcs.length == 0">Participated in no arcs</p>

    <ul v-else>
      <li v-for="arc in arcs" :key="arc.id">
        <game-info-panel-arc :arc="arc" :person-id="person.id"/>
      </li>
    </ul>
  </prime-fieldset>

  <prime-fieldset legend="Challenges" :collapsed="true" toggleable>
    <game-info-panel-raw-challenges-list :challenge-type-ids="person.challengeTypes"/>
  </prime-fieldset>

</template>
</prime-card>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {useGameStore} from "@/stores/game";

const game = useGameStore();

const person = computed(() => game.persons[game.infoMode.objectId]);

const arcs = computed(() => {
  const arcs = [];

  for (const arcId in game.arcs) {
    const arc = game.arcs[arcId];

    if (arc.hasActor(person.value.id)) {
      arcs.push(arc);
    }
  }

  return arcs;
});

const avatarNameStyle = computed(() => {
  return {
    'background-color': person.value.actualColor()
  };
});

</script>
