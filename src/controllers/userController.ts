import { Router } from "express";
import { CreateUserDTOValidation } from "../validations/user";
import { validateZod } from "../utils/validation";
import userService from "../services/userService";
import { handleError, responseSuccess } from "../utils/response";

const router = Router();

router.post("/user", async (req, res) => {
    await handleError(res, async () => {
        const dto = validateZod(CreateUserDTOValidation, req.body);
        const created = await userService.createUser(dto);
        return responseSuccess(res, { createdId: created.id });
    });
});

export default router;
