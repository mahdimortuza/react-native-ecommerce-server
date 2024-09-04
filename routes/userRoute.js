import express from "express"
import { getUserProfileController, loginController, logoutController, registerController } from "../controllers/userController.js"
import { isAuth } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post('/register', registerController)


router.post('/login', loginController)

router.get("/profile",isAuth, getUserProfileController)

router.get("/logout",isAuth, logoutController)

export default router