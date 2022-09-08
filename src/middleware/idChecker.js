const hs = require("http-status")

const idChecker = (req, res, next) => {
    if (!req?.params?.id?.match(/^[0-9a-fA-F]{24}$/)) {


        return res.status(hs.BAD_REQUEST).send({ message: "User not found." })
    }
    else {
        next()
    }

}

module.exports = idChecker;