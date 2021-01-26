const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const userRouter = require("./routers/user");
require("../db/db");
const app = express();
const db = mongoose.connection;

require("./utils/passport")(passport);

const sessionStore = new MongoStore({
  mongooseConnection: db,
  collection: "sessions",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 30,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
