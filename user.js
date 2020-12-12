const { MongoClient } = require("mongodb");
var express = require("express");
const bodyParser = require("body-parser");
const uri = "mongodb+srv://dbUser:Admin123!@cluster0.2rvcr.mongodb.net/?w=majority";

const client = new MongoClient(uri);

async function user(doc) {
    try {
        await client.connect();
        const database = client.db("Forex");
        const collection = database.collection("user");
        const result = await collection.insertOne(doc);
        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedCount}`,
        );
    } finally {
        await client.close();
    }
}

async function book(doc) {
    try {
        await client.connect();
        const database = client.db("Forex");
        const collection = database.collection("book");
        const result = await collection.insertOne(doc);
        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedCount}`,
        );
    } finally {
        await client.close();
    }
}

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
.
var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("listening on port " + port);
});

app.get("/", (req, res) => {
    res.status(200).send("Book api");
});

app.post("/api/user", (req, res) =>{
    res.send(req.body);
    user(req.body).catch(console.dir);
});

app.post("/api/book", (req, res) =>{
    res.send(req.body);
    book(req.body).catch(console.dir);
});