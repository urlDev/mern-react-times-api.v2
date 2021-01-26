const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, cb) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return cb(null, false);
          }

          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            return cb(null, false, { message: "Check your credentials" });
          }

          return cb(null, user);
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    const user = await User.findById(id);
    try {
      if (!user) {
        return cb(null, false, { message: "Could not find user" });
      }
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  });
};
