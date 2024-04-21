import express from "express";
import { getMessage, messageSend } from "../controllers/message.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router()

router.post('/send/:id', protectRoute, messageSend)
router.get('/:id', protectRoute, getMessage)

export default router