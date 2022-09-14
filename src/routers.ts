import { Router } from "express";
import { ensureAuthenticated } from "./utils/auth";
import authControllers from "./controllers/authController";
import userController from "./controllers/userController";
import projectController from "./controllers/projectController";
import configController from "./controllers/configController";
import bindingPackageController from "./controllers/bindingPackageController";
import customerController from "./controllers/customerController";

const router = Router();

router.use(authControllers);
router.use(
    "/api",
    ensureAuthenticated,
    userController,
    projectController,
    configController,
    bindingPackageController,
    customerController
);

export default router;
