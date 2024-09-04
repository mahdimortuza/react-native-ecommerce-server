import mongoose from "mongoose";

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo connected ${mongoose.connection.host }`)
      } catch (error) {
        console.log(`Mongodb error ${error}`);
      }
}

export default connectDb