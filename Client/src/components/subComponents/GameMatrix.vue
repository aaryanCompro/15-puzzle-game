<template>
  <div class="game-matrix">
    <button
      id="game-matrix-overlay"
      @click="handleClickPlayBtn"
      v-show="showOverlay"
    >
      Click to {{ overlayText }}
    </button>
    <div v-for="(row, rowIndex) in grid" :key="rowIndex">
      <button
        v-for="(col, colIndex) in row"
        :key="colIndex"
        v-bind:disabled="showOverlay"
        v-bind:id="isCellsSame(rowIndex, colIndex, col) ? 'correctCell' : ''"
        @click="handleClick(rowIndex, colIndex)"
      >
        <span v-if="col != 0">{{ col }}</span>
        <span v-else>&nbsp;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameMatrix",
  data() {
    return {
      correct: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null],
      ],
      mat: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    };
  },
  computed: {
    movesCount() {
      return this.$store.state.movesCount;
    },
    timer() {
      localStorage.setItem("State", JSON.stringify(1));
      return this.$store.getters.getTimer;
    },
    showOverlay() {
      return this.$store.state.showOverlay;
    },
    overlayText() {
      // console.log("Grid", this.$store.state.overlayText);
      return this.$store.state.overlayText;
    },
    togglePlayPause() {
      return this.$store.state.togglePlayPause;
    },
    buttonText() {
      return this.$store.state.buttonText;
    },
    grid() {
      if (this.isSolved(this.$store.state.grid)) {
        this.handleGameSolved();
      }
      return this.$store.state.grid;
    },
    gameStatus() {
      return this.$store.state.gameStatus;
    },
    timerID() {
      return this.$store.state.getters.timerID;
    },
  },
  mounted() {
    if (localStorage.getItem("gameState")) {
      let localStoragState = JSON.parse(localStorage.getItem("gameState"));

      if (localStoragState.time != 0) {
        let ans = confirm("Do you want to resume the last saved game?");
        if (ans) {
          console.log("yes");
          this.$store.replaceState(
            Object.assign(this.$store.state, localStoragState)
          );

          this.$store.state.togglePlayPause = false;
          this.$store.state.showOverlay = true;
          this.$store.state.overlayText = "Play";
          this.$store.state.buttonText = "Play";
        } else {
          console.log("yes nahi chaiye");
          this.initializeGame();
        }
      } else {
        this.initializeGame();
      }
    } else {
      console.log("No");
      this.initializeGame();
    }
  },

  methods: {
    handleGameSolved() {
      localStorage.clear();
      this.$store.commit("clearTimerID");
      this.$router.push({ path: "/gameOver" });
    },

    initializeGame() {
      if (this.grid == this.mat) return;
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

      return (cnt & 1) == 0;
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
      // Initialize array with numbers 0 to 15
      let numbers = [];
      for (let i = 0; i <= 15; i++) {
        numbers.push(i);
      }

      // Shuffle the array
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }

      // Convert the shuffled array to a 4x4 matrix
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

    handleClick(rowIndex, colIndex) {
      this.$store.dispatch("handleClick", {
        rowIndex: rowIndex,
        colIndex: colIndex,
      });
    },
    handleClickPlayBtn() {
      if (!this.togglePlayPause) {
        console.log("play button chalega");
        let id = setInterval(() => this.$store.commit("incrementTime"), 1000);
        this.$store.commit("setTimerID", id);
      } else {
        clearInterval(this.timerID);
      }
      this.$store.dispatch("handleClickPlayBtn");
    },
    isCellsSame(rowIndex, colIndex, col) {
      return col == this.correct[rowIndex][colIndex];
    },
  },
};
</script>
