const router = require("express").Router();
const { login, me, logOut } = require("../controllers/authController");

router.post("/login", login);
router.get("/me", me);
router.delete("/logout", logOut);

module.exports = router;
