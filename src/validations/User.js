const hs = require("http-status")
const Joi = require("joi")

class AuthClass {
    constructor () {
    const login = async (req,res,next) => {
        try {
           await Joi.object({
            email: Joi.string().email().trim().regex(/^[a-z ,.'-]+$/i).messages({"string.base": "Email formatına uygun olmalıdır." , "string.empty": "Email boş bırakılamaz" , "string.min": "Email minimum 3 karakter olabilir." , "string.required": "İsim alanı girmek zorunludur"}),
            password: Joi.string().required().trim().min(3).messages({"string.base": "Parola formatına uygun olmalıdır." , "string.empty" : "Parola boş bırakılamaz", "string.min": "Parola minimum 3 karakter olabilir" , "string.required": "Parola alanını doldurmak zorunludur" })
           }).validateAsync(req.body)
        } catch (error) {
            res.status(hs.BAD_REQUEST).send({ messages: "Bir hata oluştu"})
            
        }
    }
    const createUser = async (req,res,next)=> {
        try {
            await Joi.object({
                first_name: Joi.string().required().trim().min(3).pattern.messages({"string.base":"İsim formatına uygun olmalıdır.", "string.empty": "İsim boş bırakalamaz.", "string.min": "İsim alanı minimum 3 karakter olabilir.", "string.required": "İsim alanı girmek zorunludur."}),
                last_name: Joi.string().required().trim().min(2).pattern(new RegExp(/^[a-z ,.'-]+$/i)).messages({"string.base": "Uygun bir soyisim giriniz.", "string.empty": "Soyisim boş bırakalamaz.", "string.min": "Soyisim minimum 2 karakter olmalıdır.", "string.required": "Soyisim alanı girmek zorunludur.", "string.pattern.base": "Soyadında sayı bulunamaz."}),
                email: Joi.string().required().trim().min(8).pattern(new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/i)).messages({"string.email": "Email formatına uygun olmalıdır."," string.empty": "Email boş bırakalamaz.","string.min":"Email minumum 8 karakter olmalıdır.", "string.required": "Email boş bırakalamaz."}),
                password: Joi.string().required().trim().min(8).pattern(new RegExp(/[A-Za-z0-9\w\W]{8,}$/)).messages({"string.base": "Şifre uygun değil.","string.empty": "Şifre boş bırakalamaz.","string.min": "Şifre minimum 8 karakter olmalıdır.", "string.required": "Şifre boş bırakalamaz."}),
                isAdmin: Joi.boolean().default(true),
                isCosmuter: Joi.boolean().default(false),
            })
        } catch (error) {
            res.status(hs.BAD_REQUEST).send({ messages: "Bir hata oluştu"})
        }
    }
    }
}
