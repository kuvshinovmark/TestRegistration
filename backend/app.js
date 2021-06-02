const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const mailer = require("./nodemailer")
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

app.post("/api/recover/:mail", jsonParser, async function (req, res) {
    const m = req.params["mail"];
    const collection = dbClient.db("RegTest").collection("users");
    await collection.findOne({ mail: m }, await function (err, result) {
        if (err) return console.log(err);
        console.log(result);
        let ID = result._id;
        const message = {
            from: 'Mailer Test <test_registration2@mail.ru>',
            to: m,
            subject: "Востоновление пароля",
            text: `ID - ${ID}`
        }
        mailer(message);
    });
});

app.post("/api/recover", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const userMail = req.body.mail;
    const userID = req.body.code;
    // console.log("Провера с " + userMail + " + " + userID);
    const collection = dbClient.db("RegTest").collection("users");
    collection.findOne({mail: userMail}, function (err, result) {
        if (err) return console.log(err);
        if(result._id == userID){
            console.log("Good");
            res.send(result.password);
        }else {
            console.log("No good");
        }
        // console.log(result);
        // res.send(result);
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

app.put("/api/users", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const userMail = req.body.mail;
    const userNewPass = req.body.newPass;
    console.log("начало на сервере " + userMail + " " + userNewPass);
    const collection = dbClient.db("RegTest").collection("users");
    collection.findOneAndUpdate(
        { mail: userMail },
        { $set: { password: userNewPass } },
        function (err, result) {
            if(err) return console.log(err); 
            res.send(result);
        }
    );
});