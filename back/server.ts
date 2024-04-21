import express, { Response, Request } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8888;

app.get("/", (req: Request, res: Response) => {
  res.send("hello 8888 port");
});
;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
