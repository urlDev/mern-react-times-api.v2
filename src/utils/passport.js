const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    "local",
    new LocalStrategy(
      // for being able to use email, I need to set it here
      // otherwise, it doesnt work
      { usernameField: "email", passwordField: "password" },
      async (email, password, cb) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return cb(null, false);
          }

          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            return cb(null, false);
          }

          return cb(null, user);
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });
};
