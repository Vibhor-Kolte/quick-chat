import { Router } from "express";
import AuthController from "../controller/AuthController";
import ChatGroupController from "../controller/ChatGroupController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.post("/auth/login", AuthController.login);

export default router;

// Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);