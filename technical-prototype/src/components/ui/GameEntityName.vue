<template>

<span>

  <template v-if="t.isPersonId(entityId)">{{game.persons[entityId].name}}</template>
  <template v-else-if="t.isOrganizationId(entityId)">{{game.organizations[entityId].name}}</template>
  <template v-else-if="t.isStatementId(entityId)">{{game.statements[entityId].name({gameState: game})}}</template>
  <template v-else class="text-red-800">Unknown theme</template>

</span>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const properties = defineProps<{
  entityId: string;
}>();

const game = useGameStore();

</script>
