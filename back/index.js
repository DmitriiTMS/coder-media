const express = require("express");
require("dotenv").config();
const sequelize = require("./config/database");
const SequelizeStore = require("connect-session-sequelize");
const cors = require("cors");
const session = require("express-session");
const router = require("./routes/index");

const PORT = process.env.PORT || 5001;
const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);

store.sync();

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
