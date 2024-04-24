<template>
<prime-fieldset :legend="investigation.name" class="!p-2">

  <div class="flex">

    <div v-if="investigation.isStarted() || investigation.isCompleted()" class="inline-block flex flex-col mr-2">
      <game-person-chip v-for="participantId in investigation.participants"
                        :key="participantId"
                        class="mb-1"
                        :unassigne-button="false"
                        :person-id="participantId"/>
    </div>

    <div v-else-if="investigation.isNotStarted()" class="inline-block flex flex-col mr-2">
      <game-person-chip v-for="participantId in investigation.participants"
                        :key="participantId"
                        class="mb-1"
                        :unassigne-button="true"
                        :person-id="participantId"/>

      <game-person-choose v-if="game.freeWorkersIds.length > 0"
                          @person:selected="onPersonSelected"
                          class="rounded-full"
                          :candidateIds="game.freeWorkersIds"/>
    </div>

    <div v-else>
      <span class="text-red-800">Something went wrong. Investigation state: {{investigation.state}}</span>
    </div>

    <game-investigation-challenges class="flex-grow" :investigation-id="investigation.id"/>

    <div class="flex flex-col min-w-16">
      <prime-button v-if="investigation.isNotStarted() && investigation.canBeStarted()"
                    outlined
                    size="small"
                    @click="game.startInvestigation(investigation.id)"
                    class="mb-2">
        Start
      </prime-button>

      <prime-button @click="game.selectInvestigation(investigation.id)"
                    outlined
                    size="small"
                    severity="info"
                    class="mb-2">
        Info
      </prime-button>

      <prime-button v-if="investigation.canBeCanceled()"
                    outlined
                    size="small"
                    severity="danger"
                    @click="game.cancelInvestigation(investigation.id)">
        Cancel
      </prime-button>

    </div>

  </div>

  </prime-fieldset>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useGameStore} from "@/stores/game";
import * as t from "@/logic/types";

const game = useGameStore();

const properties = defineProps<{
  investigationId: t.InvestigationId;
}>();

const investigation = computed(() => game.investigations[properties.investigationId]);

function onPersonSelected(event: {personId: t.PersonId}) {
  game.assigneWorker(properties.investigationId, event.personId);
}

</script>
