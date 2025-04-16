const express = require("express");
//const nodemon = require("nodemon"); 
const mongoose = require("mongoose"); 
const menuItem = require("./menuItem.js"); 
const nodemailer = require("nodemailer");


//const serverless = require("serverless-http");
const app = express();
const dbURI = "mongodb+srv://jshah266507:f10URi$hh!@cluster0.sdpbs.mongodb.net/";
//const dbURI = "mongodb+srv://ashtray272727:flourish@cluster0.sdpbs.mongodb.net/";

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
app.use(express.json()); 
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

app.get("/faqs#", (req, res) =>{
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
  res.sendFile(path.join(__dirname, "/public/reservation/reservationstart.html"));
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

app.post("/order/payment", (req, res) => {
  //const menu = Array.isArray(req.body.menu) ? req.body.menu : [req.body.menu];
  //const quantity = Array.isArray(req.body.quantity) ? req.body.quantity : [req.body.quantity];

  const menu = req.body.menu;
  const quantity = req.body.quantity; 
  console.log(`My menu stuff is ${menu}`); 
  //let orderProperties = {}; 
  let costArray = []; 
  let total = 0; 
  //if(!menu){
    //return res.status(400).json({message: "Invalid order: You must order something!"}); 
  //}

  const promises = menu.map((item, index) =>{
    return menuItem.findOne({item:item})
    .then((menuItem) =>{
        console.log("The price of my item is" + menuItem.cost);
        total += menuItem.cost * parseInt(quantity[index]);
        costArray.push(menuItem.cost);
      })
      .catch((err) => {
        console.log("ERROR IN FINDING ITEM");
      });
  });

  console.log(promises);
  Promise.all(promises)
    .then((result) => {
      console.log(`The subtotal of my items is \$${total}.\n`);
      res.render("paymentform", { myTotal: total, menuItems: menu, quantities: quantity, costs: costArray });
    })
    .catch((err) => {
      console.log("ERROR. TOTAL CANNOT BE CALCULATED");
    });
});


app.post("/order/confirmation", (req, res) =>{
  console.log("Order was a success!");  
  //res.sendFile(path.join(__dirname, "/public/takeout/orderconfirmation.html"));
  //res.redirect("/order/confirmation"); 
});

app.get("/order/confirmation", (req, res) =>{
  //res.redirect(301, "/order"); 
  const from = req.query.from; 
  if(from && from == "payment"){
    res.sendFile(path.join(__dirname, "/public/takeout/orderconfirmation.html"));
  } else{
    res.redirect(301, "/order"); 
  }
}); 

// Private Room Reservation routes
app.get("/reservations", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/reservation/reservationstart.html"));
});

app.get("/reservations.html", (req, res) =>{
  res.redirect(301, "/reservations"); 
});

app.get("/reservations/times", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/reservation/picktime.html"));
});

app.get("/reservations/confirmation", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/reservation/confirmation.html"));

});

// Sources route
app.get("/sources", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/requirements/sources.html"));
});

app.get("/merch", (req, res) =>{
  res.sendFile(path.join(__dirname, "/public/merch/merch.html")); 
});

app.post("/merch/payment", (req, res) =>{
  const merch = req.body.merch; 
  //const merchArray = merch.value.split(",");  
  console.log("My merch is " + merch); 
  const merchQuantities = req.body.merchQuantity; 
  let total = 0; 
  let merchQuantArray = []; 
  const promises = merch.map((item, index) =>{
    return menuItem.findOne({item:item})
    .then((myItem) =>{
      let cost = myItem.cost; 
      total += parseFloat(cost * merchQuantities[index]); 
      merchQuantArray[index] = parseInt(merchQuantities[index]); 
    })
    .catch((err) =>{
      throw new Error("The merch item you requested could not be found!"); 
    })
  })

  Promise.all(promises)
  .then(() =>{
    console.log(`My total is ${total}`); 
    res.render("merchpaymentform", {merchTotal: total, items: merch, quantities: merchQuantArray});
    
  })
  .catch((err) =>{
    throw new Error("Yeah, chat, this isn't working."); 
  })
  //res.send("My merch is " + merch + " and my quantities are " + merchQuantities);

 
});

app.get("/merch/payment", (req, res) =>{
  res.redirect(301, "/merch"); 
});

/*app.get("/add-item", (req, res) =>{
  const MenuItem = new menuItem({
    item:"Flourish Water Bottle",
    season:"All-Year",
    type:"Merch",
    cost:30
});
MenuItem.save()
.then((result) =>{
    res.send(result);
})
.catch((err) =>{
    console.log("ERROR IN PUSHING TO DATABASE"); 
})
})*/

app.post("/", (req, res) =>{
  const {name, email, phone, date, time, partySize, confirmationNumber, limiter} = req.body; 

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Flourish Reservation Confirmation</title>
    <style>
      body { font-family: Arial, sans-serif; color: #000; margin: 0; padding: 30px; font-size: 1.2em; }
      h2 { margin-top: 30px; color: #000; font-size: 1.3em; }
      ul { padding-left: 20px; }
      li { margin-bottom: 10px; }
      a { color: #000; text-decoration: underline; }
      .strong-text { font-weight: bold; }
      .confirmation-number { font-weight: bold; }
      p { margin-bottom: 15px; }
    </style>
  </head>
  <body>
    <p>Hi <strong>${name}</strong>,</p>

    <p>You’ve booked a reservation at <strong>Flourish</strong> for <strong>${partySize}</strong> people on <strong>${date}</strong> at <strong>${time}</strong>. Thank you!</p>

    <p><strong>Do:</strong></p>
    <ul>
      <li>Arrive 10–15 minutes early.</li>
      <li>Notify us of dietary concerns via <a href="/contact">contact us</a>.</li>
      <li>Bring your ID and confirmation number: <span class="confirmation-number">${confirmationNumber}</span>.</li>
    </ul>

    <p><strong>Do NOT:</strong></p>
    <ul>
      <li>Bring disposable food or drinks.</li>
      <li>Forget to call if late or cancel (free up to 4 days before; after, a fee of $${limiter[2]} applies).</li>
      <li>Bring more or fewer guests than booked (±1 guest allowed).</li>
    </ul>

    <p>If you included special requests, we’ve received them and will reach out for any clarifications.</p>

    <p>For questions or concerns, reply here, visit <a href="/contact">our contact page</a>, or call us.</p>

    <p>We look forward to welcoming you at Flourish!</p>

    <p><strong>The Flourish Team</strong></p>
  </body>
</html>`;


  
        const appPassword = "agwc cxbq rehc hhsg"; 
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
            user:"flourish.veg.dining@gmail.com",
            pass:appPassword
            }
    
        });
    
        const mailOptions = {
            from:"flourish.veg.dining@gmail.com",
            to:email,
            subject:"Your Reservation at Flourish -- You are Booked!",
            html:html
        }; 
    
        transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.status(500).json({message:"Error in sending message"}); 
        } else{
            console.log(info.response); 
            res.status(200).json({message:"Message was sent"}); 
        }
        });
})

app.get("/emails", (req, res) =>{
  res.sendFile(path.join(__dirname, "/email-template.html")); 
})

// Handle 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/public/404/404.html"));
});


//app.use("/.netlify/functions/app", router);
//module.exports.handler = serverless(app);
