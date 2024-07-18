import { createStore } from "vuex";

const persistState = (store) => {
  store.subscribe((mutation, state) => {
    localStorage.setItem("gameState", JSON.stringify(state));
  });
};

export default createStore({
  state() {
    return {
      movesCount: 0,
      time: 0,
      timerID: "",
      togglePlayPause: false,
      showOverlay: true, // toggle for overlay
      overlayText: "Play", //toogle between play and reset
      buttonText: "Play",
      grid: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      gameStatus: "ready",
    };
  },

  getters: {
    getTimer(state) {
      let h = Math.floor(state.time / 60);
      let m = state.time % 60;
      if (isNaN(m)) m = 0;
      return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}`;
    },
    getTimerId(state) {
      return state.timerID;
    },
    getGridElement: (state) => (row, col) => {
      return state.grid[row][col];
    },
  },
  mutations: {
    setOverlayText(state) {
      if (state.overlayText == "Play") state.overlayText = "Resume";
      // else state.overlayText = "Play";
    },
    setButtonText(state) {
      if (state.buttonText == "Play") state.buttonText = "Pause";
      else state.buttonText = "Play";
    },
    toggleShowOverlay(state) {
      state.showOverlay = !state.showOverlay;
    },
    setGrid(state, matrix) {
      state.grid = matrix;
    },
    setGridElement(state, payload) {
      state.grid[payload.i][payload.j] = payload.val;
    },
    setTimerID(state, id) {
      console.log("timer chalaya");
      state.timerID = id;
    },
    clearTimerID(state) {
      clearInterval(state.timerID);
    },
    incrementTime(state) {
      state.time++;
    },
    incrementMovesCount(state) {
      state.movesCount++;
    },
    setgameStatus(state, payload) {
      state.gameStatus = payload;
    },
    settogglePlayPause(state) {
      state.togglePlayPause = !state.togglePlayPause;
    },
    resetState(state) {
      state.movesCount = 0;
      state.time = 0;
      state.timerID = "";
      state.togglePlayPause = false;
      state.showOverlay = true;
      state.overlayText = "Play";
      state.buttonText = "Play";
      state.grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      state.gameStatus = "ready";
      // this.$router.push({ path: "/" });
    },
  },
  actions: {
    handleClickPlayBtn(context) {
      if (!context.state.togglePlayPause) {
        context.commit("setButtonText");
        context.commit("toggleShowOverlay");
        context.state.togglePlayPause = true;
        if (context.state.gameStatus == "ready") {
          context.commit("setgameStatus", "Playing");
        }
      } else {
        console.log("Else");
        clearInterval(context.state.timerID);
        context.commit("setButtonText"); //   playButton.textContent = "Play";
        context.commit("toggleShowOverlay"); //   overlay.style = "display: flex;";
        //   disableGrid();
        context.commit("setOverlayText"); //   overlay.textContent = "Click to Resume";
        context.state.togglePlayPause = false; //   togglePlayPause = false;
      }
    },

    handleClick(context, payload) {
      let ithIndex = payload.rowIndex;
      let jthInddex = payload.colIndex;
      // console.log(ithIndex, jthInddex);
      let positionChange = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (let idx = 0; idx < 4; idx++) {
        let ni = ithIndex + positionChange[idx][0];
        let nj = jthInddex + positionChange[idx][1];

        if (ni >= 0 && ni < 4 && nj >= 0 && nj < 4) {
          if (context.getters.getGridElement(ni, nj) === 0) {
            // console.log(ni, nj);
            let temp = context.getters.getGridElement(ithIndex, jthInddex);
            context.commit("setGridElement", {
              i: ithIndex,
              j: jthInddex,
              val: context.getters.getGridElement(ni, nj),
            });
            context.commit("setGridElement", { i: ni, j: nj, val: temp });
            context.commit("incrementMovesCount");

            // localStorage.setItem("Game", JSON.stringify(game));
            // localStorage.setItem("timer", JSON.stringify(timer));
          }
        }
      }
    },
  },

  plugins: [persistState],
});
