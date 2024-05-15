const express = require("express");
require("dotenv").config();
const sequelize = require("./config/database");
const cors = require("cors");
const session = require("express-session");
const router = require("./routes/index");

const PORT = process.env.PORT || 5001;
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: 'auto'
    }
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // { force: true }
    app.listen(PORT, () => console.log(`server start ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
