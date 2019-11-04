const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var monk = require('monk');
var db = monk('localhost:27017/mydb');

//const UserImport = require('../models/usercollection');
//const User = UserImport.User

mongoose.connect('mongodb://localhost:27017/mydb');

module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      db.get('usercollection').findOne({email: email}).then(user => {
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
    db.get('usercollection').findById(id, (err, user) => {
      done(err, user);
    });
  });
};

