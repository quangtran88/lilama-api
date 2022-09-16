import { Router } from "express";
import { ensureAuthenticated } from "./utils/auth";
import authControllers from "./controllers/authController";
import userController from "./controllers/userController";
import projectController from "./controllers/projectController";
import configController from "./controllers/configController";
import bindingPackageController from "./controllers/bindingPackageController";
import costTypeController from "./controllers/costTypeController";
import customerController from "./controllers/customerController";
import mainContractController from "./controllers/mainContractController";
import incomeController from "./controllers/incomeController";

const router = Router();

router.use(authControllers);
router.use(
    "/api",
    ensureAuthenticated,
    userController,
    projectController,
    configController,
    bindingPackageController,
    costTypeController,
    customerController,
    mainContractController,
    incomeController
);

export default router;
