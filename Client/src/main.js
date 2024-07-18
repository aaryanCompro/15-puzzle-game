import "./assets/main.css";
import { createApp } from "vue";
// import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

const app = createApp(App);
app.use(store);
app.use(router);
// axios.defaults.baseURL = "loacalhost:8000";
app.mount("#app");
