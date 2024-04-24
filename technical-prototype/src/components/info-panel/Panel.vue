<template>
<game-info-panel-none v-if="game.infoMode.mode == 'none'"/>
<game-info-panel-person v-else-if="game.infoMode.mode == 'person'"/>
<game-info-panel-organization v-else-if="game.infoMode.mode == 'organization'"/>
<game-info-panel-event v-else-if="game.infoMode.mode == 'event'"/>
<game-info-panel-investigation v-else-if="game.infoMode.mode == 'investigation'"/>
</template>

<script setup lang="ts">
import {useGameStore} from "@/stores/game";

const game = useGameStore();
</script>
