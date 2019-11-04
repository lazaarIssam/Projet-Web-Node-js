const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserImport = require('../models/usercollection');
const User = UserImport.User

mongoose.connect('mongodb://localhost:27017/mydb/usercollection');
var db = mongoose.connection

module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({"email": email}).then(user => {
        if (!user) {
          return done(null, false, { message: 'Email  not registered' });
        }
        // Match PWD
        bcrypt.compare(password, user.userpassword, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id ,done) =>{
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

