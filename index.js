global.crypto = require("crypto");
let express = require('express');
let cors = require('cors');
const { productModel } = require('./model/Model');
const { connection } = require('./Configs/db');
require('dotenv').config()

let app = express();
app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/", async (req, res) => {
    try {
        let allData = await productModel.find();
        res.send(allData)
    }
    catch (err) {
        res.send("unable to get data", err)
    }
})

app.post("/add", async (req, res) => {
    try {
        let data= productModel(req.body)
        await data.save()
        res.send(data);
    } 
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

app.patch("/patch/:id", async (req, res) => {
    try {
        await productModel.findByIdAndUpdate(req.params.id,req.body)
        res.send("patch successfully");
    } 
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

app.put("/put/:id", async (req, res) => {
    try {
        await productModel.replaceOne({_id:req.params.id},req.body)
        res.send("put successfully");
    } 
    catch (err) {
        console.log(err);
        res.send(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id)
        res.send("deleted");
    } 
    catch (err) {
        console.log(err);
        res.send(err);
    }
});


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
    }
    catch (err) {
    console.log("Unable to connect to Database");
    }
     console.log(`Running on port ${process.env.PORT}`);
});