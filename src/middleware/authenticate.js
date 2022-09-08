const hs = require("http-status")
const JWT = require("jsonwebtoken")

const NormalUserAuthenticateToken = (req, res, next) => {
    const token = req.headers?.token
    if (!token) {
        return res.status(hs.UNAUTHORIZED).send ({ message: "You must be logged in to view this section."})
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(hs.FORBIDDEN).send({ messeage: err})
        }
        req.user = user
        next ()
    })
}

const AdminUserAuthenticateToken = (req, res, next) => {
    const token = req.headers?.token;
    if (!token) {
        return res.status(hs.UNAUTHORIZED).send({ message: "Dont have permission for this section." })
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (!user?._doc?.isAdmin) {
            return res.status(hs.UNAUTHORIZED).send({ message: "You must be an admin to access this area.." })
        }
        if (err) {
            return res.status(hs.FORBIDDEN).send({ message: err })
        }
        req.user = user?._doc;
        next()
    })
}

module.exports = {
    NormalUserAuthenticateToken,
    AdminUserAuthenticateToken,

}