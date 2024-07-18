<template>
  <div class="game-controller">
    <span id="moves">Moves:{{ movesCount }}</span>
    <span id="time">Time:{{ timer }}</span>
    <button id="play" @click="handleClickPlayBtn">{{ buttonText }}</button>
    <button id="reset" @click="resetGame">Reset</button>
  </div>
</template>

<script>
export default {
  name: "GameController",
  computed: {
    movesCount() {
      return this.$store.state.movesCount;
    },
    timer() {
      return this.$store.getters.getTimer;
    },
    showOverlay() {
      return this.$store.state.showOverlay;
    },
    overlayText() {
      console.log("Grid", this.$store.state.overlayText);
      return this.$store.state.overlayText;
    },
    togglePlayPause() {
      return this.$store.state.togglePlayPause;
    },
    buttonText() {
      return this.$store.state.buttonText;
    },
    grid() {
      // console.log("Grid", this.$store.state.grid);
      return this.$store.state.grid;
    },
    gameStatus() {
      return this.$store.state.gameStatus;
    },
    timerID() {
      return this.$store.state.timerID;
    },
  },
  methods: {
    handleClickPlayBtn() {
      if (!this.togglePlayPause) {
        let id = setInterval(() => this.$store.commit("incrementTime"), 1000);
        this.$store.commit("setTimerID", id);
      } else {
        clearInterval(this.timerID);
      }
      this.$store.dispatch("handleClickPlayBtn");
    },

    initializeGame() {
      let matrix = this.getSolvedMatrix();
      this.$store.commit("setGrid", matrix);
    },

    isSolvable(matrix) {
      let arr = [];
      for (let i = 0; i <= 3; i++) {
        for (let j = 0; j <= 3; j++) {
          arr.push(matrix[i][j]);
        }
      }

      let cnt = 0;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) cnt++;
      }

      return (cnt & 1) === 0;
    },

    isSolved(matrix) {
      return (
        matrix[0][0] === 1 &&
        matrix[0][1] === 2 &&
        matrix[0][2] === 3 &&
        matrix[0][3] === 4 &&
        matrix[1][0] === 5 &&
        matrix[1][1] === 6 &&
        matrix[1][2] === 7 &&
        matrix[1][3] === 8 &&
        matrix[2][0] === 9 &&
        matrix[2][1] === 10 &&
        matrix[2][2] === 11 &&
        matrix[2][3] === 12 &&
        matrix[3][0] === 13 &&
        matrix[3][1] === 14 &&
        matrix[3][2] === 15 &&
        matrix[3][3] === 0
      );
    },

    getRandomMatrix() {
      let numbers = [];
      for (let i = 0; i <= 15; i++) {
        numbers.push(i);
      }

      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }

      let matrix = [];
      for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 0; j < 4; j++) {
          row.push(numbers[i * 4 + j]);
        }
        matrix.push(row);
      }

      return matrix;
    },

    getSolvedMatrix() {
      let matrix = this.getRandomMatrix();
      if (this.isSolved(matrix) || !this.isSolvable(matrix))
        return this.getSolvedMatrix();
      return matrix;
    },

    resetGame() {
      console.log("reset function ke andr agya");
      if (this.timer !== 0) {
        clearInterval(this.timerID);
      }
      localStorage.clear();
      this.$store.commit("resetState");
      this.initializeGame();
    },
  },
};
</script>
