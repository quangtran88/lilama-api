import { validateZod } from "../utils/validation";
import authService from "../services/authService";
import { LoginDTOValidation } from "../validations/auth";
import { success } from "../utils/response";
import { JWT_SECRET, SESSION_AUTH_KEY } from "../config/common";
import { CustomRouter } from "../utils/router";
import jwt from "jsonwebtoken";

const router = new CustomRouter();

router.POST("/login", async (req) => {
    const dto = validateZod(LoginDTOValidation, req.body);
    const user = await authService.verifyCredential(dto);
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: "24h" });
    return success({ token });
});

router.POST("/logout", async (req, res) => {
    res.clearCookie(SESSION_AUTH_KEY);
    req.session.destroy(() => {});
    return success();
});

export default router.getRouter();
