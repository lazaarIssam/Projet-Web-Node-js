const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var monk = require('monk');
var db = monk('localhost:27017/mydb');

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
  passport.serializeUser(function(user, done) {
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.get('usercollection').findById(id, function(err, user) {
    done(err, user);
  });
});
  
};

