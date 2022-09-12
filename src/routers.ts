import { Router } from "express";
import { ensureAuthenticated } from "./utils/auth";
import authControllers from "./controllers/authController";
import userController from "./controllers/userController";
import projectController from "./controllers/projectController";
import configController from "./controllers/configController";
import bindingPackageController from "./controllers/bindingPackageController";

const router = Router();

router.use(authControllers);
router.use("/api", ensureAuthenticated, userController, projectController, configController, bindingPackageController);

export default router;
