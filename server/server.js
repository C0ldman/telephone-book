const cors = require('cors');
const clientUrl = 'http://localhost:8081';
const express = require('express');

const corsOptions = {
  origin: clientUrl,
  optionsSuccessStatus: 200,
};

const port = 3000;

const app = express();
app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', clientUrl);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.send('Hello!')
  next();
});
app.get('/getProducts', cors(corsOptions), (req, res) => {
  products.getContent
    .then(data => res.json(data), err => res.json(err));
});
app.get('/getUsers', cors(corsOptions), (req, res) => {
  db.getUsers()
    .then(data => res.json(data), err => res.json(err));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
