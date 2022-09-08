import { Router } from "express";
import { validateZod } from "../utils/validation";
import authService from "../services/authService";
import { LoginDTOValidation } from "../validations/auth";
import { handleError, responseSuccess } from "../utils/response";
import { SESSION_AUTH_KEY } from "../config/common";

const router = Router();

router.post("/login", async (req, res) => {
    await handleError(res, async () => {
        const dto = validateZod(LoginDTOValidation, req.body);
        const user = await authService.verifyCredential(dto);
        req.session[SESSION_AUTH_KEY] = user.id.toString();
        return responseSuccess(res);
    });
});

router.post("/logout", (req, res) => {
    res.clearCookie(SESSION_AUTH_KEY);
    req.session.destroy(() => {});
    return responseSuccess(res);
});

export default router;
