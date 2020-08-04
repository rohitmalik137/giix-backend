const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// const feedRoutes = require('./routes/feed');
// const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname));

app.use('/files', indexRoutes);
// app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message });
});

const port = process.env.PORT || 5000;

mongoose
  .connect(
    'mongodb+srv://rohit_new:rohit_new@cluster0-po0x5.mongodb.net/giix?retryWrites=true&w=majority',
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    app.listen(5000);
    console.log(`server started at ${port}`);
  })
  .catch((err) => console.log(err));
