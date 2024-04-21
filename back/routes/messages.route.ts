import express from "express";
import protectRoute from "../middleware/protectRoute";
import { getMessage, messageSend } from "../controllers/message.controller";

const router = express.Router()

router.post('/send/:id', protectRoute, messageSend)
router.get('/:id', protectRoute, getMessage)

export default router