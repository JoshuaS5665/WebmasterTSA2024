const express = require("express");
const nodemon = require("nodemon"); 
const mongoose = require("mongoose"); 
const menuItem = require("./menuItem.js"); 

//const serverless = require("serverless-http");
const app = express();
const dbURI = "mongodb+srv://jshah266507:f10URi$hh!@cluster0.sdpbs.mongodb.net/";

const PORT = 80;
const path = require("path");

mongoose.connect(dbURI, {useNewURLParser:true, useUnifiedTopology:true})
.then((result) =>{
  console.log("The result of the connection was successful");
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) =>{
  console.log("ERROR! Connection failed!"); 
  console.log(error); 
})

//const morgan = require("Morgan");
//const router = express.Router();


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views")); 

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

app.get("/order", (req, res) =>{
  res.sendFile(path.join(__dirname, "/public/takeout/ordermenu.html")); 
});

app.get("/order/payment", (req, res) =>{
  res.redirect(301, "/order"); 
});

app.post("/order/payment", (req, res) =>{

  const menu = req.body.menu;
  const quantity = req.body.quantity; 
  //let orderProperties = {}; 
  let costArray = []; 
  let total = 0; 
  const promises = menu.map((item, index) =>{
    return menuItem.findOne({item:item})
    .then((menuItem) =>{
        console.log("The price of my item is" + menuItem.cost);
        total += menuItem.cost * parseInt(quantity[index]);
        costArray.push(menuItem.cost); 
    })

    .catch((err) =>{
        console.log("ERROR IN FINDING ITEM"); 
    })
});

console.log(promises); 
    Promise.all(promises)
    .then((result) =>{
        console.log(`The subtotal of my items is \$${total}.\n`); 
        res.render("paymentform", {myTotal:total, menuItems:menu, quantities:quantity, costs:costArray}); 
    })
    .catch((err) =>{
        console.log("ERROR. TOTAL CANNOT BE CALCULATED"); 
    })
  //res.sendFile(path.join(__dirname, "/public/takeout/paymentform.html")); 

});

app.post("/order/confirmation", (req, res) =>{
  console.log("Order was a success!");  
  //res.sendFile(path.join(__dirname, "/public/takeout/orderconfirmation.html"));
  //res.redirect("/order/confirmation"); 
});

app.get("/order/confirmation", (req, res) =>{
  //res.redirect(301, "/order"); 
  res.sendFile(path.join(__dirname, "/public/takeout/orderconfirmation.html"));
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
