const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { fetchPrice, fetchRoomPrices } = require("./controllers/fetchPrice");
const { fetchHotels, fetchOneHotel } = require("./controllers/fetchHotels");
const nodemailer = require('nodemailer');
const app = express()

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'ascenda_loyalty@outlook.com',
        pass: 'AscendaLoyalty',
    }
});

transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    }
    console.log('Server is ready to take messages');
})



app.use(
    cors({
        origin: "*"
    })
)

app.use(bodyParser.json());
const dbo = require("./db/conn");

app.listen(7788, () => { 
    console.log("Server started on port 7788");
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err); 
    }); 

});


//API 3.1
app.post("/api/hotels/prices", async(req,res,next)  => {
    try{
        console.log("Post request for prices received!");
        //Send GET request via axios in fetchPrice.js
        const data = await fetchPrice(req,res,next);
        // console.log(data);
        //Return Data to frontend
        res.send(data);

    }catch(err){
        res.json(err)
    }

});

//API 3.2
app.post("/api/hotels/rooms/prices", async(req, res, next)  => {
    try{
        console.log("Post request for rooms received!");
        //Send GET request via axios in fetchRooms.js
        const data = await fetchRoomPrices(req, res, next);
        // console.log(data);
        //Return Data to frontend
        console.log(data);
        res.send(data);

    }catch(err){
        res.json(err)
    }

});

//API 3.3
app.post("/api/hotels", async(req,res,next)  => {
    try{
        console.log("Post request for hotels received!")
        //Send GET request via axios in fetchHotels.js
        const data = await fetchHotels(req,res,next)
        // console.log(data)
        //Return Data to frontend
        res.send(data)

    }catch(err){
        res.json(err)
    }

});

//API 3.4
app.post("/api/hotels/:id", async(req,res,next)  => {
    try{
        
        console.log("Post request for one hotel detail received!")
        //Send GET request via axios in fetchHotels.js
        const data = await fetchOneHotel(req,res,next)
        // console.log(data)
        //Return Data to frontend
        console.log(data);
        res.send(data)

    }catch(err){
        res.json(err)
    }

});

app.post("/sendemail", function(req,res) {
        //const data = req.body;
        console.log("Request body: ",req.body);
        const mailOptions = {
            from: 'ascenda_loyalty@outlook.com',
            to: `${req.body.emailAddress}`,
            subject: 'AscendaLoyalty User ID',
            text: `Hi ${req.body.firstName} ${req.body.lastName}. Please do not reveal the following to anyone. This is your User ID: ${req.body.uniqueID}. Click this link if you would like to remove all your data from our website: http://localhost:3000/deleteuser`,
        };
        // send email
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent succesfully!');
            }
        });
    });

app.use(require('./routes/record'));