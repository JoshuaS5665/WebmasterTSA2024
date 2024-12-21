const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
  console.log("Home get req is working");
});

app.get("/winterMenu", (req, res) => {
  res.status(200).sendFile(__dirname + "/menu/seasonalMenus/winterMenu.html");
  console.log("Menus is running");
});

app.use((req, res, next) => {
  res.status(404).send("Page not found");
});
