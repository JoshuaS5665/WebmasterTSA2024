const nodemailer = require("nodemailer"); 
const express = require("express");
const morgan = require("morgan");
const app = express(); 
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`); 
});

app.use(morgan("dev")); 
app.use(express.urlencoded({extended:true})); 

app.get("/index.html", (req, res) =>{
    res.sendFile(__dirname + "/index.html"); 
});

app.get("/index2.html", (req, res) =>{
    res.sendFile(__dirname + "/index2.html"); 
})

app.post("/index2.html", (req, res) =>{
     const firstName = req.body.firstName;
     const email = req.body.email;
     const children = req.body.children; 
     console.log(`Your first name is ${firstName}, your email is ${email}
        , you have ${children} children.`);

    const html = `<h1>HELLO ${firstName}</h1>
        <p>This is your email: ${email}</p>
        <p>You have ${children} children!`;
    const appPassword = "yxmp eluy ekwl lwjb"; 
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"jshah266507@gmail.com",
        pass:appPassword
        }

    });

    const mailOptions = {
        from:"jshah266507@gmail.com",
        to:email,
        subject:"Nodemailer TEST",
        html:html
    }; 

    transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
    } else{
        console.log(info.response); 
    }
    });
});
