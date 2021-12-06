const express = require("express");
const roomRouter = require("./routes/routeRoom");
const reviews = require("./routes/routeReviews");
const userRouter = require("./routes/routeUser");
const connectToDb = require("./config/dbConfig");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/", reviews);
app.use("/", roomRouter);
app.use("/", userRouter);

connectToDb
  .then(() => {
    app.listen(4000, () => {
      console.log("Servidor On!");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(5);
  });