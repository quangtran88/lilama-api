import { Router } from "express";
import { ensureAuthenticated } from "./utils/auth";
import authControllers from "./controllers/authController";
import userController from "./controllers/userController";
import projectController from "./controllers/projectController";
import configController from "./controllers/configController";
import bindingPackageController from "./controllers/bindingPackageController";
import customerController from "./controllers/customerController";
import mainContractController from "./controllers/mainContractController";
import incomeController from "./controllers/incomeController";
import financeController from "./controllers/financeController";
import executorController from "./controllers/executorController";

const router = Router();

router.use(authControllers);
router.use(
    "/api",
    ensureAuthenticated,
    userController,
    projectController,
    configController,
    bindingPackageController,
    customerController,
    mainContractController,
    incomeController,
    financeController,
    executorController
);

export default router;
