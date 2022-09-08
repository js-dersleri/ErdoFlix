const hs = require("http-status")

const validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body)
    if (error) {
        const errorMessage = error.details?.map((details) => details.message)
            .join(",")


        return res.status(hs.BAD_REQUEST).send({ message: errorMessage })
    }
    Object.assign(req, value)
    next()
}

module.exports = validate