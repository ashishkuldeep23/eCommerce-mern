

const passport = require('passport');
const LocalStrategy = require("passport-local")
const userModel = require("../src/model/userModel")
const bcrypt = require("bcrypt")


function hello(req, res) {
    console.log("Hiii")
}



module.exports = { hello }