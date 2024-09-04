import express from "express"
import { getUserProfileController, loginController, logoutController, registerController, updatePasswordController, updateProfileController, updateProfilePicController } from "../controllers/userController.js"
import { isAuth } from "../middlewares/authMiddleware.js"
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router()

router.post('/register', registerController)


router.post('/login', loginController)

router.get("/profile",isAuth, getUserProfileController)

router.get("/logout",isAuth, logoutController)

router.patch("/profile-update",isAuth, updateProfileController)

router.patch("/password-update",isAuth, updatePasswordController)

router.put("/update-picture", isAuth, singleUpload, updateProfilePicController)
 

export default router