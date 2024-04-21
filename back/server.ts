import express from "express";
import dotenv from "dotenv";
import connectMongoDb from "./db/mongoDb";
import authRoutes from "./routes/auth.routes";
import messagesRoutes from "./routes/messages.route"
import cookieParser from "cookie-parser";
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

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use('/api/messages', messagesRoutes)

startServer();
