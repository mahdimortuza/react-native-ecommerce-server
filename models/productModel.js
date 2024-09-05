import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Product name is required.'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required.'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category"
    },
    profilePic:{
        public_id: {type: String},
        url: {type: String}
      }
  }, { timestamps: true });
  
  export const productModel = mongoose.model('Product', productSchema);
  
  export default productModel;