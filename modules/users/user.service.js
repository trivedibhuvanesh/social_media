const Users = require("./users.model.js")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const fs = require('fs');
const AWS = require('aws-sdk/clients/s3')
const s3 = new AWS({
  endpoint: "https://s3.tebi.io",
  region: "global",
  accessKeyId: "hp6un8mFiTVgayYn",
  secretAccessKey: "XuddWyVPcpE2qC3gJm6oXi8ylHYDIYxCwhJPxj8a",
})

const util = require("util")
const unlinkFile = util.promisify(fs.unlink)
const initializePassport = require("../../utils/passport-config")

const uploadImageToS3 = async function (req) {

  const blob = fs.createReadStream(req.file.path)

  const uploadedImage = await s3.upload({
    Bucket: "trivedibhuvanesh.demo1",
    Key: req.file.filename,
    Body: blob,
  }).promise()
  unlinkFile(req.file.path)

  return { status: 201, imageURL: uploadedImage.Location, key: uploadedImage.key }
}


const registerUser = async function (req) {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashedPassword
    var user = await Users.create(req.body);

    return { status: 201, user }

  } catch (error) {

    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return { status: 400, errors }
    }
    return { status: 500, "error": error.message }
  }


}


const getUserLoginDetails = async function getUserLoginDetails(req, res) {

  
  
}

module.exports.uploadImageToS3 = uploadImageToS3
module.exports.registerUser = registerUser
module.exports.getUserLoginDetails = getUserLoginDetails
