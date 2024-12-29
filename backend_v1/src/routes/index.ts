import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router();

router.post("/auth/login", AuthController.login);

export default router;