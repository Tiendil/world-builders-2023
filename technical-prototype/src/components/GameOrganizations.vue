<template>
  <game-organization v-for="organization in organizations" :key="organization.id" :organization-id="organization.id"/>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const organizations = computed(() => {
  const _organizations = [];

  for (const organization of Object.values(game.organizations)) {
    _organizations.push(organization);
  }

  _organizations.sort((a, b) => a.name.localeCompare(b.name));

  return _organizations;
});

</script>
