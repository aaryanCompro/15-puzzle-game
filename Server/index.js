const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 8000;
const data = require("./data.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/api/data", (req, res) => {
  const body = req.body;
  console.log(body);
  data.push(body);
  fs.writeFile("./data.json", JSON.stringify(data), (err, data) => {
    return res.status(200).json({ status: "Success" });
  });
});

app.get("/", (req, res) => {
  res.json({ msg: "hey from server" });
});

app.get("/api/data", (req, res) => {
  return res.json(data);
});

app.listen(PORT, () => console.log(`Server Started!! at Port: ${PORT}`));
