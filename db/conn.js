require("dotenv").config({ path: "./config.env" });

const { MongoClient } = require('mongodb');
const db = process.env.ATLAS_URI;
const client = new MongoClient(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // verify we got a good db object
            if (db) {
                _db = db.db("AscendaLoyalty");
                console.log("Succesfully connected to MongoDB");
            }
            return callback(err);
        });
    },

    getDB: function() {
        return _db;
    },
};