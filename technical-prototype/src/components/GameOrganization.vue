<template>
<div class="game-organization-avater text-center inline-block m-2" @click="game.selectOrganization(organization.id)">
  <div class="block">
    <prime-avatar :label="label" :style="avatarStyle" shape="circle" size="large"/>
  </div>

  <span>{{organization.name}}</span>

</div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const properties = defineProps<{
  organizationId: t.OrganizationId;
}>();

const organization = computed(() => game.organizations[properties.organizationId]);

const avatarStyle = computed(() => {
  return {
    'background-color': organization.value.color,
  };
});

const label = computed(() => {
  // split by space and take first letter of each word
  return organization.value.name.split(' ').map((word) => word[0]).join('');
});

</script>
