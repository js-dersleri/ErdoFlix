const Joi = require("joi")

const loginUser = Joi.object({
    email: Joi.string().email().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().min(8),
    password: Joi.string().required().min(3)
})
const createUser = Joi.object({
    first_name: Joi.string().min(3).required().optional().pattern(new RegExp(/^[a-z ,.'-]+$/i)).message('Enter a eligible first name'),
    last_name: Joi.string().required().min(3).pattern(new RegExp(/^[a-z ,.'-]+$/i)).message('Enter a eligible last name'),
    email: Joi.string().email().required().min(8).pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i)).message('Enter a eligible email').min(8),
    password: Joi.string().required().min(8).pattern(new RegExp(/[A-Za-z0-9\w\W]{8,}$/)).min(8).message('Enter a eligible password'),
    phones: Joi.string().required().min(11).pattern(new RegExp(/[0-9]{11,}$/)).message('Enter a eligible phone number'),
    isAdmin: Joi.boolean().default(true),
    isCosmuter: Joi.boolean().default(false),
    username: Joi.string().required().min(3),
})
const resetUserPassword = Joi.object({
    email: Joi.string().email().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required().min(8)
})
const updateUser = Joi.object({
    first_name: Joi.string().min(3).pattern(new RegExp(/^[a-z ,.'-]+$/i)).message('Enter a eligible first name'),
    last_name: Joi.string().min(3).pattern(new RegExp(/^[a-z ,.'-]+$/i)).message('Enter a eligible last name'),
    email: Joi.string().email().message('Enter a eligible email'),
    password: Joi.string().pattern(new RegExp(/[A-Za-z0-9\w\W]{8,}$/)).min(8).message('Enter a eligible password'),
    phones: Joi.string().min(8).pattern(new RegExp(/[0-9]{11,}$/)).message('Enter a eligible phone number'),


}
)

module.exports = {
    loginUser,
    createUser,
    resetUserPassword,
    updateUser
}