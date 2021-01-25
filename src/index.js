const express = require("express");
const userRouter = require("./routers/user");
require("../db/db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
