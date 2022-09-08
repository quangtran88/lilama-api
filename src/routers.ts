import { Router } from "express";
import authControllers from "./controllers/authController";
import userController from "./controllers/userController";
import { ensureAuthenticated } from "./utils/auth";

const router = Router();

router.use(authControllers);
router.use("/api", ensureAuthenticated, userController);

export default router;
