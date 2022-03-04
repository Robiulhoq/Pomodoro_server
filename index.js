const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

const { MongoClient } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tx9ov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log(err);
  console.log(process.env.DB_PASS);
  const allTask = client.db("pomodoro").collection("allTask");
  app.post("/addTask", (req, res) => {
    const task = req.body;
    allTask.insertOne(task).then((result) => {
      res.send(result);
    });
  });
  app.post("/getLoginTask", (req, res) => {
    const { emailId } = req.body;
    allTask.find({ loginEmail: emailId }).toArray((err, documents) => {
      res.send(documents);
    });
  });
    app.post("/findDay", (req, res) => {
      const { date } = req.body;
      allTask.find({ date: date }).toArray((err, documents) => {
        res.send(documents);
      });
    });
 
  app.get("/rankingTask", (req, res) => {
    allTask.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });
  console.log("connect");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
 