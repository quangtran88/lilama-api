import { validateZod } from "../utils/validation";
import authService from "../services/authService";
import { LoginDTOValidation } from "../validations/auth";
import { success } from "../utils/response";
import { SESSION_AUTH_KEY } from "../config/common";
import { CustomRouter } from "../utils/router";

const router = new CustomRouter();

router.post("/login", async (req) => {
    const dto = validateZod(LoginDTOValidation, req.body);
    const user = await authService.verifyCredential(dto);
    req.session[SESSION_AUTH_KEY] = user.id.toString();
    return success();
});

router.post("/logout", async (req, res) => {
    res.clearCookie(SESSION_AUTH_KEY);
    req.session.destroy(() => {});
    return success();
});

export default router.getRouter();
