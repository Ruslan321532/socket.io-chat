import express from "express";
import protectRoute from "../middleware/protectRoute";
import { getUsersList } from "../controllers/user.controller";

const router = express.Router()

router.get('/', protectRoute, getUsersList)

export default router