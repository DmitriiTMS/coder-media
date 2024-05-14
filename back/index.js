const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const router = require('./routes/index');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // { force: true }
    app.listen(5001, () => console.log(`server start 5001`));
  } catch (error) {
    console.log(error);
  }
};

start();