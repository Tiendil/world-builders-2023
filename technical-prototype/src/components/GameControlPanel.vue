<template>
<div class="game-simple-card p-6">

  <game-time class="inline-block align-baseline mr-2 min-w-36"/>

  <prime-button @click="game.gameStep()"
                :disabled="!game.logicTime.stepAllowed()"
                outlined
                class="!align-baseline ml-2">
    Step
  </prime-button>

  <prime-inline-message v-if="game.logicTime.shouldTwitToday() && !game.logicTime.mustTwit()"
                 severity="info"
                 class="ml-2"
                 :closable="false">
    You should twit today.
  </prime-inline-message>

  <prime-inline-message v-if="game.logicTime.mustTwit()"
                 severity="warn"
                 class="ml-2"
                 :closable="false">
    You must twit now.
  </prime-inline-message>

  <prime-inline-message v-if="game.logicTime.shouldReleaseNewspaperToday() && !game.logicTime.mustReleaseNewspaper()"
                 severity="info"
                 class="ml-2"
                 :closable="false">
    You should release newspaper today.
  </prime-inline-message>

  <prime-inline-message v-if="game.logicTime.mustReleaseNewspaper()"
                 severity="warn"
                 class="ml-2"
                 :closable="false">
    You must release newspaper now.
  </prime-inline-message>

</div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {useGameStore} from "@/stores/game";

const game = useGameStore();

const organization = computed(() => game.organizations[game.infoMode.objectId]);

const avatarNameStyle = computed(() => {
  return {
    'background-color': organization.value.color,
  };
});
</script>
