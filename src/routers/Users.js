const express = require("express")
const UserController = require("../controllers/UserController")
const schema = require("../validatons/User")
const validate = require("../middleware/validate")
const { NormalUserAuthenticateToken, AdminUserAuthenticateToken } = require("../middleware/authenticate")
const idChecker = require("../middleware/idChecker")
const router = express.Router()

router.route("/").get(AdminUserAuthenticateToken, UserController.index)
router.route("/register").post(UserController.create)
router.route("/login").post(validate(schema.loginUser, "body"), UserController.login)
router.route("/resetPassword").patch(validate(schema.resetUserPassword, "body"), UserController.resetPassword)
router.route("/updateUser/:id").patch(idChecker, NormalUserAuthenticateToken, validate(schema.updateUser, "body"), UserController.updateUser)
router.route("/deleteUser/:id").delete(idChecker, UserController.deleteUser)
module.exports = router