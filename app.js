const express = require('express');
const morgan = require('morgan');
const logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config(); 

const app = express();

const apiRouter = require('./routes/api')
const indexRouter = require('./routes/index')

// DB connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error: "));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api',apiRouter);
app.use('/', indexRouter);




app.listen(3000, () => console.log(`Server started on port 3000`));