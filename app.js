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

       const html = `
    <body style="font-family: Bodoni Moda, serif;
            line-height: 1.6;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            color: #333;">
    <p>Hi <strong>${name}</strong>,</p><br>
        <p>According to our server, you booked a reservation at Flourish for <strong>${partySize}</strong> people on <strong>${date}</strong> 
            at <strong>${time}.</strong>
            Thanks for reserving a table with us at Flourish! We can’t wait to welcome you.</p>
        
            <br>

        <p>To make your visit as seamless and enjoyable as possible, please keep the following in mind:</p> <br>

        <ul style="padding-left: 20px;"><h2 style="margin-top: 20px;
            color: #32372b;">Please:</h2>
            <li style=" margin:15px; ">Arrive 10-15 minutes before your scheduled reservation to receive access to the room ahead of time.</li>
            <li style=" margin:15px; ">Let us know about any dietary concerns for anyone in your party. (Feel free to give us a call or head to the contact page). <a href="/contact">Contact Link</a></li>
            <li style=" margin:15px; ">Bring your ID as well as this reservation's confirmation number (${confirmationNumber}).</li>
            <li style=" margin:15px; ">Enjoy your time in our exclusive private room -- we are here to make this occasion special for you!</li>
        </ul>

        <ul style="padding-left: 20px;"><h2 style="margin-top: 20px;
            color: #32372b;">Please DO NOT:</h2>
            <li style=" margin:15px; ">Bring disposable food or beverage items. Flourish is proud to be eco-conscious.</li>
            <li style=" margin:15px; ">Forget to call us if you are running late or need to cancel. (Up to <b>4</b> days before your reservation day, you may cancel for free. After that, based on your individual guest count, you will be charged a flat cancellation fee of \$${limiter[2]}).
            In the event that the host (you) or a representative fails to show up for the confirmed reservation, the cancellation fee will apply as outlined. </li>
            <li style=" margin:15px; ">Bring a guest count outside the range you booked. We allow a grace of ±1 guest.
                For your reservation in particular, please ensure that between ${limiter[0]} and ${limiter[1]} guests (including yourself) are present. 
            </li>
        </ul>
        <br>
        <p>If you filled out the "special requests" section of our form, we want to inform you that we have received this information
        and will be in contact with you to clarify any details to customize your time with us.</p>
        <br>
        <p>For any questions or concerns, feel free to respond to this email, message us using the aforementioned contact page, or call us directly. 
            We cannot wait to provide a memorable experience for you at Flourish. 
        </p>
        <p>Sincerely,<br>
             The Flourish Team
        </p>
</body>`;
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
