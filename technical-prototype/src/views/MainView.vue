<template>
<div class="container mx-auto max-w-full p-4 bg-slate-200">

  <div class="flex flex-row">

    <div class="flex-none w-1/4">
      <game-info-panel/>
    </div>

    <div class="flex-none mx-2 w-1/2">

      <game-control-panel class="mb-2"/>

      <prime-tab-view class="game-simple-card">
        <prime-tab-panel header="Persons">
          <game-persons/>
        </prime-tab-panel>
        <prime-tab-panel header="Organizations">
          <game-organizations/>
        </prime-tab-panel>
      </prime-tab-view>

      <div class="grid 2xl:grid-cols-2 2xl:gap-2">
        <game-events class="flex-1 mb-2"/>
        <game-investigations class="flex-1 mb-2"/>
      </div>

      <div class="grid 2xl:grid-cols-2 2xl:gap-2">
        <game-materials class="mb-2"/>
        <game-material-info class="mb-2" :material-id="game.choosenMaterialId"/>
      </div>

      <div class="grid 2xl:grid-cols-2 2xl:gap-2">
        <game-twitter class="mb-2"/>
        <game-newspaper class="mb-2"/>
      </div>

    </div>

    <div class="flex-none w-1/4">
      <game-topics-summary/>
    </div>

  </div>

</div>
</template>

<script setup lang="ts">
import {useGameStore} from "@/stores/game";

const game = useGameStore();
</script>
