const bcrypt = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy
const Users = require("../modules/users/users.model")


const initialize = async function (passport) {

    const authenticateUser = async (email, password, done) => {
        console.log(email)
        const user = await Users.findOne({email})
        console.log(user.toString())
        if(user == null) {
            return done(null,false,{message: "No user with that email"})
        }

        try {
            if(await bcrypt.compare(password, user.password) ) {
                 return done(null,user)
            } else {
                return done(null, false, {message: "Password is incorrect"})
            }
        } catch(e) {
            return done(null,false,{message:e.toString()})
        }
    }
    passport.use(new LocalStrategy(authenticateUser))

}

module.exports.initialize = initialize