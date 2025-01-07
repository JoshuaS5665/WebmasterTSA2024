const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 80;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.listen(PORT, "0.0.0.0", () => {
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

app.get("/contact/contactResponse", (req, res) => {
  res.sendFile(__dirname + "/public/contact/contactResponse.html");
  console.log("Contact response route hit");
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

app.get("/reservationsecond", (req, res) => {
  res.sendFile(__dirname + "/public/reservation/reservation2.html");
});

app.get("/public/reservation/reservation2.html", (req, res) => {
  res.redirect(301, "/reservationsecond");
});

app.get("/reservation/final", (req, res) => {
  res.sendFile(__dirname + "/public/reservation/bookTable.html");
});

app.get("/public/reservation/bookTable.html", (req, res) => {
  res.redirect(301, "/reservation/final");
});

app.get("/reservation/confirmation", (req, res) => {
  res.sendFile(__dirname + "/public/reservation/reservationConfirmation.html");
});
app.get("/public/reservation/reservationConfirmation.html", (req, res) => {
  res.redirect(301, "/reservation/confirmation");
});

app.get("/sources", (req, res) => {
  res.sendFile(__dirname + "/public/requirements/sources.html");
});
app.post("/", (req, res) => {
  //const data = req.body;
  //console.log("This is my data: " + data);
  //res.json({message: "Your data has been received", data});
  console.log("HELLO WORLD");
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404/404.html");
});
