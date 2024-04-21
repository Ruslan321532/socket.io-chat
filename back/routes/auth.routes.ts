import express from "express";
import { login, logount, signUp } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/logount", logount);

export default router;
