import { CreateUserDTOValidation } from "../validations/user";
import { validateZod } from "../utils/validation";
import userService from "../services/userService";
import { success } from "../utils/response";
import { UserResultDTO } from "../dtos/user";
import { CustomRouter } from "../utils/router";

const router = new CustomRouter();

router.post("/user", async (req) => {
    const dto = validateZod(CreateUserDTOValidation, req.body);
    const created = await userService.createUser(dto);
    return success({ created_id: created.id });
});

router.get("/users", async (req) => {
    const users = await userService.getAllUsers();
    const userDTOs = users.map((user) => new UserResultDTO(user));
    return { data: userDTOs };
});

export default router.getRouter();
