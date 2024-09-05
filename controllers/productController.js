import productModel from "../models/productModel.js"

export const getAllProductsController = async (req, res)  => {
    try {
        const products = await productModel.find({})
        res.status(200).send({
            success: true,
            message: "Product fetched successfully.",
            products
        })
    } catch (error) {
        console.log(error)
            res.status(500).send({
                success: false,
                message:"Error in get all product API",
                error
            })
    }
}