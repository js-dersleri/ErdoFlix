const UserService = require("../services/UserService")
const hs = require("http-status")
const {passwordToHash, generateAccessToken, generateRefreshToken } = require("../script/utils/helper")
const uuid = require("uuid")
const eventEmitter = require("../script/events/eventEmitter")

class UserController {
    index(req, res) {
        UserService.list().then((response) => {
            res.status(hs.OK).send(response)
            console.log(response)
        })
            .catch(e => {
                res.status(hs.BAD_REQUEST).send(e)
            })
    }
    create(req, res, next) {
        req.body.password = passwordToHash(req.body.password)
        UserService.insert(req.body).then(create => {
            try {
                eventEmitter.emit("send_careate_email", {
                    to: create.email,
                    subject: "User registiration succesfull ✔",

                    html: `<!doctype html>
                    <html lang="en">
                      <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>Bootstrap demo</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
                      </head>
                      <body>
                      <p class="fs-2">Hello ${create.first_name}${create.last_name} User registiration succesfull. </p> <br /> <h1 class="text-danger">Welcome the Erdoflix family</h1>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
                      </body>
                    </html>`,

                },
                )
                next();
            } catch(e) {
                res.status(hs.BAD_REQUEST).send({msg: e})
            }

            res.status(hs.OK).send({
                code: 0,
                msg: "Registration successfully created",
                create
            })
        })
            .catch(e => {
                res.status(hs.BAD_REQUEST).send({ msg: e})
            })
    }
    login(req, res, next) {
        req.body.password = passwordToHash(req.body.password)
        const {email} = req.body
        const emailexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        console.log(email.match(emailexp))
        if (email.match(emailexp)) {
            UserService.findOne(req.body).then((user) => {

                if(!user) {
                    return res.status(hs.NOT_FOUND).send({ message: "Email or password incorrect"})
                }
                user = {
                    ...user.toObject(),
                    tokens: {
                        access_token: generateAccessToken(user),
                        refresh_token: generateRefreshToken(user)

                    }
                }
                console.log(req.body.password)
                delete user.password
                res.status(hs.OK).send({
                    message: "Login succesfull",
                    
                })
            })
            .catch(e => {
                console.log("Error",e)
            })
            
        }
        else {
            res.status(hs.BAD_REQUEST).send({ message: "Email is wrong format" })
        }

    }
    resetPassword(req, res) {
        const new_password = `${uuid.v4()?.split("-")[0]}${uuid.v4()?.split("-")[1]}` || `erdoflix-${new Date().getTime()}`
        console.log(new_password)
        UserService.changePassword({ email: req.body.email }, { password: passwordToHash(new_password) }).then((updatedPassword) => {
            if (!updatedPassword) {
                return res.status(hs.NOT_FOUND).send({ message: "User not found" })

            }
            eventEmitter.emit("send_email", {

                to: updatedPassword.email,
                subject: "Reset password ✔",

                html: `Hello ${updatedPassword.full_name}${updatedPassword.last_name} Your password reset has been successfully completed.. <br /> Don't forget to change your password after logging in.. <br /> New password:<b>${new_password}</b> <h1> ErdoFlix </h1>`, // html body
            },
            )
            res.status(hs.OK).send({
                message: "Password change completed successfully.",
                updatedPassword

            })
        }).catch((e) => {
            res.status(hs.BAD_REQUEST).send({ error: e })
        })
    }
    updateUser(req, res) {


        UserService.update(req.params.id, req.body).then((updateUser) => {
            console.log(updateUser)
            return res.status(hs.OK).send({ message: "Update successful", updateUser })
        })
            .catch(e => {

                return res.status(hs.NOT_FOUND).send({ message: "Something wrong", e })
            })

    }
    deleteUser(req, res, next) {

        if (!req.params?.id) {
            return res.status(hs.NOT_FOUND).send({ message: "User not found" })
        }
        UserService.delete(req.params?.id).then((deleteUser) => {
            if (!deleteUser) {
                res.status(hs.BAD_REQUEST).send({ message: "User not found" })
            }


            res.status(hs.OK).send({ message: "User successfully deleted" })
        })
            .catch((e) => console.log(e))


    }




}

module.exports = new UserController()