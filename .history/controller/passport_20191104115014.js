const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');


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

