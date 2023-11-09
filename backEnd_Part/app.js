const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const cors = require('cors')


const indexRouter = require('./src/routes/routes');



require('dotenv').config()


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// // // Use full middle wares --->
app.use(cors())



// // // Mongo DB connection code 
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true })
.then(() => console.log("Mongoose connected successfully"))
.catch((err) => { console.log("An error occured :- " + err) })



// app.use( (req, res , next)=>{
//   // console.log(req);
//   console.log(req.cookies);
//   next()
// } )


app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
