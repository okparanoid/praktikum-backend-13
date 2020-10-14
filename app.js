const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.user = {
    _id: '5f80a2d5113c39246e00e99a',
  };
  next();
});

app.use('/cards', cards);
app.use('/users', users);

app.use((req, res) => {
  res.status('404');
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
