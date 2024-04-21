import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("succes connect");
  } catch (error) {
    console.log('error', error.message);
  }
};

export default connectMongoDb;
