<template>
  <div>
    <main id="game">
      <h1 class="game-title">Fifteen Puzzle Game</h1>
      <GameController />
      <GameMatrix />
      <GameFooter />
    </main>
  </div>
</template>

<script>
import GameController from "./subComponents/GameController.vue";
import GameMatrix from "./subComponents/GameMatrix.vue";
import GameFooter from "./subComponents/GameFooter.vue";

export default {
  name: "HomePage",
  components: {
    GameController,
    GameMatrix,
    GameFooter,
  },
};
</script>
