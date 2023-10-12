const userRouter = require("./users/users.route")
const router = require("express").Router()

router.use("/users", userRouter)

module.exports = router