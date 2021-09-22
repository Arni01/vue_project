const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const PORT = process.env.PORT || config.get('PORT') || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
