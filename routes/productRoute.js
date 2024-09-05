import express from "express"
import { getAllProductsController } from "../controllers/productController.js"

const router = express.Router()

router.get("/get-all", getAllProductsController)

export default router