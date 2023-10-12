const userService = require("./user.service")

const uploadProfile = async function (req, res, next) {
    try {
        const resp = await userService.uploadImageToS3(req);
        return res.status(resp.status).json({
            success: true,
            resp,
        });
    } catch (error) {
        next(error);
    }
}

const registerUser = async function (req, res, next) {
    try {
        const resp = await userService.registerUser(req);
        return res.status(resp.status).json({
            success: true,
            resp,
        });
    } catch (error) {
        next(error);
    }
}

const loginUser = async function (req,res, next) {
    try {
        const resp = await userService.getUserLoginDetails(req,res);
        return res.status(resp.status).json({
            success: true,
            resp,
        });
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.toString()
        });
    }
}

module.exports.uploadProfile = uploadProfile
module.exports.registerUser = registerUser
module.exports.loginUser = loginUser