<template>
  <div>
    <main id="game">
      <h1>You Won!!!!!!!!</h1>
      <div>
        <h3>Moves Count: {{ movesCount }} Time Taken: {{ timer }}</h3>
      </div>
      <br />
      <div class="gameWon-controller">
        <button class="stats-button" @click="submitStats">Statistics</button>
        <button @click="backHome">Go Back to Home Page</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "GameWon",
  computed: {
    movesCount() {
      return this.$store.state.movesCount;
    },
    timer() {
      return this.$store.getters.getTimer;
    },
  },
  mounted() {
    axios
      .post("http://localhost:8000/api/data", {
        movesCount: this.movesCount,
        time: this.timer,
      })
      .then((response) => {
        console.log(response);
        // this.$router.push("/posts");
      });
  },
  methods: {
    backHome() {
      this.$router.push({ path: "/" });
    },

    submitStats() {
      this.$router.push({ path: "/gameStats" });
    },
  },
};
</script>

<style scoped>
.gameWon-controller {
  margin-bottom: 15px;
  width: 400px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  /* background: #000000; */
}
.gameWon-controller button {
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
