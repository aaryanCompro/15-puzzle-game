<template>
  <div>
    <main id="game">
      <h1 class="game-title">Game Stats</h1>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Moves Count</th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in gameData" :key="data.id">
              <td>{{ data.id }}</td>
              <td>{{ data.movesCount }}</td>
              <td>{{ data.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="backHome">Go Back to Home Page</button>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GameStats",
  data() {
    return {
      gameData: [],
    };
  },

  mounted() {
    const apiUrl = process.env.VUE_APP_API_URL || "http://localhost:8000"; // Using environment variable for API URL
    axios
      .get(`${apiUrl}/api/data`)
      .then((response) => {
        this.formatPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  methods: {
    formatPosts(data) {
      for (let key in data) {
        this.gameData.push({ ...data[key], id: key });
      }
    },
    backHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.table-container {
  max-height: 500px;
  overflow-y: auto;
  margin: 20px 0;
  border: 1px solid #dddddd;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1em;
  text-align: left;
}

.table thead tr {
  background-color: #d4ee9f;
  color: #003333;
  text-align: left;
  font-weight: bold;
}

.table th,
.table td {
  padding: 12px 15px;
  border: 1px solid #dddddd;
}

.table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

button {
  border: none;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  padding: 5px;
  background-color: #d4ee9f;
  color: #003333;
  cursor: pointer;
  margin: 5px;
}
</style>
