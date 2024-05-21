const router = require("express").Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const authRouter = require("./authRouter");


router.use("/", userRouter);
router.use("/", productRouter);
router.use("/", authRouter);


module.exports = router;