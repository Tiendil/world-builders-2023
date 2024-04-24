<template>
    <prime-inline-message class="mb-2 w-full !justify-normal" :closable="false" :severity="severity">

      <a href="#" class="" @click="game.selectEvent(event.id)">{{event.textLog}}</a>

      <prime-button v-if="!event.hasInvestigation() && ! event.decorative"
                    class="!align-middle ml-2"
                    :disabled="!game.canCreateInvestigation()"
                    outlined
                    @click="game.createInvestigation({eventId: eventId})">
        Investigate
      </prime-button>
  </prime-inline-message>
</template>

<script setup lang="ts">
import * as _ from "lodash";
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";
import * as uuid from 'uuid';

const game = useGameStore();

const properties = defineProps<{
  eventId: t.EventId;
}>();

const event = computed(() => game.events[properties.eventId]);

const severity = computed(() => {
  if (event.value.decorative) {
    return 'success';
  }

  return 'info';
});

</script>
