const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const cors = require("cors");

const app = express();
const jsonParser = express.json();
const url = "mongodb+srv://makusinov:152245@regt.n4k7z.mongodb.net/TestRegistration";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
let dbClient;

var corsO = {
    origin: "http://localhost:3000"
};
app.use(cors(corsO));

mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.listen(5000, function () {
        console.log("Server has been start...");
    });
});


app.post("/api/users", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const userMail = req.body.mail;
    const userPassword = req.body.password;
    const user = { mail: userMail, password: userPassword };
    const collection = dbClient.db("RegTest").collection("users");
    collection.insertOne(user, function (err, result) {
        if (err) return console.log(err);
        res.send(result);
    })
});

app.post("/api/users/:mail", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const userPassword = req.body.password;
    const m = req.params["mail"];
    const collection = dbClient.db("RegTest").collection("users");
    collection.findOne({ mail: m }, function (err, result) {
        if (err) return console.log(err);
        if (result === null) {
            res.send({_id:"0000"});
        } else {
            if(result.password === userPassword){
                res.send(result);
            } else {
                res.send({_id:"1111"});
            }  
        }
    });
});