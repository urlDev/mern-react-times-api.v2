const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
require("../db/db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // One day in ms
      maxAge: 86_400_000,
    },
  })
);
require("./utils/passport")(passport);
// Cookie parser secret same with session
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
