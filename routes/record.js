const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// help in connection to database
const dbo = require("../db/conn");

// convert id from string to ObjectId
const ObjectId = require('mongodb').ObjectId;

// get all records function
recordRoutes.route("/record").get(function(req, res) {
    let db_connect = dbo.getDB("ascenda");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err; 
            res.json(result);
        });
});

// add records to database function
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDB();
  let myobj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    requests: req.body.requests,
    creditCardNumber: req.body.creditCardNumber,
    expiryDate: req.body.expiryDate,
    cvc: req.body.cvc,
    streetName: req.body.streetName,
    streetNumber: req.body.streetNumber,
    postalCode: req.body.postalCode,
    uniqueID: req.body.uniqueID,
    destinationID: req.body.destinationID,
    hotelName: req.body.hotelName,
    hotelID: req.body.hotelID,
    numberOfNights: req.body.numberOfNights,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    numberOfGuests: req.body.numberOfGuests,
    roomType: req.body.roomType,
    cost: req.body.cost,
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   console.log("One new document added to MongoDB");
   response.json(res);
 });
 //console.log(response.json(res));
});

// delete all records in database
recordRoutes.route("/delete").delete((req, response) => {
  let db_connect = dbo.getDB();
  db_connect.collection("records").remove({}, function (err, obj) {
    if (err) throw err;
      console.log("All documents deleted");
      response.json(obj);
    });
});

 // delete all records in database
recordRoutes.route("/deleteone").post((req, response) => {
  console.log(req.body);
  let db_connect = dbo.getDB();
  db_connect.collection("records").deleteMany({uniqueID: req.body.uniqueID}, function (err, obj) {
    if (err) throw err;
    console.log(`All user data of ID ${req.body.uniqueID} deleted`);
    response.json(obj);
  });
 });

module.exports = recordRoutes;