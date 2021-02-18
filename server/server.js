const cors = require('cors');
const clientUrl = 'http://localhost:8081';
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const jsonParser = express.json();

const corsOptions = {
  origin: clientUrl,
  optionsSuccessStatus: 200,
};

const port = 3000;

const app = express();
app.use(cors());
const mongoClient = new MongoClient('mongodb://localhost:27017/', { useUnifiedTopology: true });

let dbClient;

mongoClient.connect(function (err, client) {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db('telephone-book')
    .collection('contacts');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

app.get('/api/contacts', function (req, res) {
  const collection = req.app.locals.collection;
  collection.find()
    .toArray(function (err, users) {
      if (err) return console.log(err);
      res.send(users);
    });
});

app.get('/api/contacts/:id', function (req, res) {
  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOne({ _id: id }, function (err, user) {
    if (err) return console.log(err);
    res.send(user);
  });
});

app.post("/api/contacts", jsonParser, function (req, res) {

  if(!req.body) return res.sendStatus(400);

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const number = req.body.number;
  const contact = {firstName: firstName, lastName: lastName,number:number, isFavourite:false};

  const collection = req.app.locals.collection;
  collection.insertOne(contact, function(err, result){
    if(err) return console.log(err);
    res.send(user);
  });
});

app.put("/api/contacts", jsonParser, function(req, res){

  if(!req.body) return res.sendStatus(400);
  const id = new objectId(req.body.id);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const number = req.body.number;
  const isFavourite = req.body.isFavourite;
  const contact = {firstName: firstName, lastName: lastName,number:number, isFavourite:isFavourite};

  const collection = req.app.locals.collection;
  collection.findOneAndUpdate({_id: id}, { $set: contact},
    {returnOriginal: false },function(err, result){
      if(err) return console.log(err);
      const user = result.value;
      res.send(user);
    });
});

app.delete("/api/contacts/:id", function(req, res){

  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOneAndDelete({_id: id}, function(err, result){
    if(err) return console.log(err);
    let user = result.value;
    res.send(user);
  });
});



process.on("SIGINT", () => {
  console.log('Start shutdown...');
  dbClient.close();
  console.log('Server down!');
  process.exit();
});
