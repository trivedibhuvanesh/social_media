const multer  = require('multer')
const upload = multer({dest: "uploads/"})
const router = require("express").Router()
const usersController = require("./users.controller") 
const passport = require("passport")

router.post("/uploadImage", upload.single("image"), usersController.uploadProfile)

router.post("/",usersController.registerUser)

router.post("/login",passport.authenticate('local', {
    session: false
  }))

module.exports = router