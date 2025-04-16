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
      body {
        font-family: 'Times New Roman', serif;
        color: #333333;
        max-width: 600px;
        margin: auto;
        padding: 40px;
        line-height: 1.8;
      }

      h2 {
      font-size: 1.3em;
        color: #000000;
        text-align: center;
        margin-bottom: 10px;
      }

      h1 {
        font-size: 1.8em;
        color: #4b5c3a;
        text-align: center;
        margin-bottom: 20px;
      }

      p {
        font-size: 1.1em;
        margin-bottom: 20px;
        color: #000000;
      }

      ul {
        font-size: 1.1em;
        margin-left: 20px;
        margin-bottom: 20px;
        color: #000000;
      }

      li {
        margin-bottom: 12px;
        color: #000000;
      }

      .strong-text {
        font-weight: bold;
        color: #4b5c3a;
      }

      .confirmation-number {
        font-weight: bold;
        color: #4b5c3a;
      }

      .footer {
        margin-top: 40px;
        font-size: 1.1em;
        text-align: center;
        color: #555555;
      }

      a {
        color: #4b5c3a;
        text-decoration: underline;
        font-weight: bold;
      }

      a:hover {
        text-decoration: underline;
      }

      .divider {
        border-top: 2px solid #4b5c3a;
        margin: 20px 0;
      }

    </style>
  </head>
  <body>
    <h1>Reservation Confirmation at Flourish</h1>

    <p>Hi <strong class="strong-text">${name}</strong>,</p>

    <p>Thank you for choosing <strong class="strong-text">Flourish</strong> for your upcoming visit. We are pleased to confirm your reservation for <strong class="strong-text">${partySize}</strong> people on <strong class="strong-text">${date}</strong> at <strong class="strong-text">${time}</strong>.</p>

    <div class="divider"></div>

    <h2>Important Information:</h2>

    <ul>
      <li>Arrive 10–15 minutes early to gain access to your reserved table.</li>
      <li>Notify us of any dietary restrictions via our <a href="3.146.166.139/contact">contact page</a>.</li>
      <li>Bring your ID and reservation confirmation number: <span class="confirmation-number">${confirmationNumber}</span>.</li>
      <li>We look forward to providing a special experience for you at Flourish.</li>
    </ul>

    <div class="divider"></div>

    <h2>Do Not Forget:</h2>

    <ul>
      <li>Flourish is eco-conscious; please refrain from bringing disposable food or drinks.</li>
      <li>If you're running late or need to cancel, call us. Cancellations are free up to <strong>4</strong> days in advance. After that, a cancellation fee of <strong>$${limiter[2]}</strong> will apply based on your guest count. No-shows will also be charged.</li>
      <li>Ensure your guest count is within <strong class="strong-text">${limiter[0]}</strong> to <strong class="strong-text">${limiter[1]}</strong> guests (including yourself).</li>
    </ul>

    <div class="divider"></div>

    <p>If you've provided special requests, we will review them and contact you if needed.</p>

    <p>If you have any questions, please feel free to reply to this email, visit our <a href="/contact">contact page</a>, or call us directly. We can’t wait to make your experience memorable!</p>

    <div class="footer">
      <p>Warmly,</p>
      <p><strong class="strong-text">The Flourish Team</strong></p>
    </div>
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
