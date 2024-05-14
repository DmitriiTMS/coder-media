const router = require("express").Router();
const { auth } = require("../controllers/userController");


router.get("/auth", auth);

module.exports = router;
