<template>
  <div class="game-footer">
    <div>
      Instructions: Place each block in it's corect position starting from 1 to
      15. To move a block you can click on it an swap it with the empty block if
      its ajacent.
      <br />
    </div>
    <button class="stats-button" @click="submitStats">
      Click here to see Statistics
    </button>
  </div>
</template>

<script>
export default {
  name: "GameFooter",
  computed: {
    timer() {
      return this.$store.getters.getTimer;
    },
    timerID() {
      return this.$store.state.timerID;
    },
  },
  methods: {
    submitStats() {
      console.log("reset function ke andr agya");
      if (this.timer !== 0) {
        clearInterval(this.timerID);
      }
      localStorage.clear();
      this.$store.commit("resetState");
      this.$router.push({ path: "/gameStats" });
    },
  },
};
</script>

<style scoped>
button {
  border: none;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  padding: 5px;
  /* width: 80px; */
  background-color: #d4ee9f;
  color: #003333;
  /* outline: none; */
  cursor: pointer;
  margin: 5px;
}
</style>
