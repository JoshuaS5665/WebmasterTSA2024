const express = require("express");
const app = express();
const PORT = 80;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
  console.log("Home get req is working");
});

app.get("/index.html", (req, res) => {
  console.log("Home page redirect is working");
  res.redirect(301, "/");
});

app.get("/faqs", (req, res) => {
  res.sendFile(__dirname + "/public/faq/faqs.html");
});

app.get("/faqs.html", (req, res) => {
  res.redirect(301, "/faqs");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about/about.html");
});

app.get("/about.html", (req, res) => {
  res.redirect(301, "/about");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact/contact.html");
});

app.get("/contact.html", (req, res) => {
  res.redirect(301, "/contact");
});

app.get("/menus", (req, res) => {
  res.sendFile(__dirname + "/public/menu/menuHome.html");
});

app.get("/menuHome.html", (req, res) => {
  res.redirect(301, "/menus");
});

app.get("/menus/winter", (req, res) => {
  res.sendFile(__dirname + "/public/menu/seasonalMenus/winterMenu.html");
});

app.get("/menus/spring", (req, res) => {
  res.sendFile(__dirname + "/public/menu/seasonalMenus/springMenu.html");
});

app.get("/menus/summer", (req, res) => {
  res.sendFile(__dirname + "/public/menu/seasonalMenus/summerMenu.html");
});

app.get("/menus/fall", (req, res) => {
  res.sendFile(__dirname + "/public/menu/seasonalMenus/fallMenu.html");
});

app.get("/mission", (req, res) => {
  res.sendFile(__dirname + "/public/mission/mission.html");
});

app.get("/mission.html", (req, res) => {
  res.redirect(301, "/mission");
});

app.get("/reservation", (req, res) => {
  res.sendFile(__dirname + "/public/reservation/reservation.html");
});

app.get("/reservation.html", (req, res) => {
  res.redirect(301, "/reservation");
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404/404.html");
});
