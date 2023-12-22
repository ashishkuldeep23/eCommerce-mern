const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require("./src/model/userModel")
require('dotenv').config()



const indexRouter = require('./src/routes/routes');


// // // Mongo DB connection code 
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true })
  .then(() => console.log("Mongoose connected successfully"))
  .catch((err) => { console.log("An error occured :- " + err) })



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// // // Use full middle wares --->

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// // // ---> 
app.use(cors({
  credentials: true,
  origin: `${process.env.FRONTEND_URL}`
}))

app.use(session({
  secret: 'keyboard',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));

app.use(passport.authenticate('session'));



// // // Code for local strategy --->
passport.use("local", new LocalStrategy(
  // { usernameField: "email" },

  async function (username, password, done) {


    try {


      const userProfile = await userModel.findOne({ email: username }).exec()

      // console.log(userProfile)

      if (!userProfile) {
        return done(null, false, { message: "No such user found with this email." });
      }

      // console.log("1010")

      // // // Check user password here -------->
      let passCompare = await bcrypt.compare(password, userProfile.password)

      // console.log(passCompare)
      if (!passCompare) {
        return done(null, false, { message: "Password not matched with DB password." });
      }


      // // // Create JWT Token, store UUID id of user inside it.
      const token = jwt.sign({ id: userProfile.id }, process.env.JWT_SECRET_KEY, { expiresIn: '100d' });

      let sendUserdetails = {
        id: userProfile.id,
        name: `${userProfile.firstName} ${userProfile.lastName}`,
        email: userProfile.email,
        profilePic: userProfile.profilePic,
        role: userProfile.role,
        token: token,
      }

      return done(null, sendUserdetails); // this lines sends to serializer


    } catch (err) {
      console.log(err.message)
      return done(err, false, { message: `Error by server (${err.message})` })
    }


  }
));


// // // Code for Google Stratgy ---->
passport.use("google", new GoogleStrategy({
  clientID: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
},
  async function (accessToken, refreshToken, profile, done) {
    // userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });



    const { id, photos, name } = profile

    const { familyName: lastName, givenName: firstName } = name

    // console.log(id)
    // console.log(displayName)
    // console.log(photos[0].value)
    // console.log(firstName)
    // console.log(lastName)

    // let createOrFindUser = await userModel.

    let newUserDataObj = { email: id, firstName: firstName, lastName: lastName, profilePic: photos[0].value , whenCreted : `${new Date()}`}

    let userProfile = await userModel.findOneAndUpdate({ email: id }, newUserDataObj , { upsert: true }).lean()

    // console.log(userProfile)


    // // // Create JWT Token, store UUID id of user inside it.
    const token = jwt.sign({ id: userProfile.id }, process.env.JWT_SECRET_KEY, { expiresIn: '100d' });

    let sendUserdetails = {
      id: userProfile.id,
      name: `${userProfile.firstName} ${userProfile.lastName}`,
      email: userProfile.email,
      profilePic: userProfile.profilePic,
      role: userProfile.role,
      token: token,
    }

    // console.log(sendUserdetails)

    done(null, sendUserdetails)

  }
));


// // // This creates session variable req.user on being from callbacks -->
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {

    // return cb(null, {
    //   id: user.id,
    //   username: user.username,
    //   picture: user.picture
    // });


    return cb(null, user);


  });
});


// // // This chenges session variable req.user when called from authorized user request --->
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});



// // // Stripe intgration ------------>


let stripekey = `${process.env.STRIPE_KEY}`


const stripe = require("stripe")(stripekey);


const calculateOrderAmount = (price) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  // console.log(price * 100)

  return price*100;
};



app.post("/create-payment-intent", async (req, res) => {
  const { totalPrice } = req.body;

  // console.log(req.body)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount( totalPrice ),
    // amount: totalPrice,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

});




// app.use( (req, res , next)=>{
//   // console.log(req);
//   console.log(req.cookies);
//   next()
// } )

// // // Index route api ----->

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
