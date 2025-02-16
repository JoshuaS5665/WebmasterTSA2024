const express = require("express");

//const serverless = require("serverless-http");
const app = express();
//const morgan = require("Morgan");
//const router = express.Router();
const PORT = 80;
const path = require("path");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//app.use(morgan("dev"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

// Main routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/index.html", (req, res) => {
  res.redirect(301, "/");
});

// FAQ routes
app.get("/faqs", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/faq/faqs.html"));
});

app.get("/faqs.html", (req, res) => {
  res.redirect(301, "/faqs");
});

// About routes
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/about/about.html"));
});

app.get("/about.html", (req, res) => {
  res.redirect(301, "/about");
});

// Contact routes
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/contact/contact.html"));
});

app.get("/contact/contactResponse", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/contact/contactResponse.html"));
});

// Menu routes
app.get("/menus", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/menu/menuHome.html"));
});

app.get("/menus/winter", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/public/menu/seasonalMenus/winterMenu.html"),
  );
});

app.get("/menus/spring", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/public/menu/seasonalMenus/springMenu.html"),
  );
});

app.get("/menus/summer", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/public/menu/seasonalMenus/summerMenu.html"),
  );
});

app.get("/menus/fall", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/public/menu/seasonalMenus/fallMenu.html"),
  );
});

// Mission routes
app.get("/mission", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/mission/mission.html"));
});

// Reservation routes
app.get("/reservation", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/reservation/reservation.html"));
});

app.get("/reservationsecond", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/reservation/reservation2.html"));
});

app.get("/reservation/final", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/reservation/bookTable.html"));
});

app.get("/reservation/confirmation", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/public/reservation/reservationConfirmation.html"),
  );
});

// Sources route
app.get("/sources", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/requirements/sources.html"));
});

// Handle 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/public/404/404.html"));
});

//app.use("/.netlify/functions/app", router);
//module.exports.handler = serverless(app);
