import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectMongoDb from "./db/mongoDb";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8888;

const startServer = async () => {
  try {
    await connectMongoDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

app.use(express.json());
app.use("/api/auth", authRoutes);

startServer();
