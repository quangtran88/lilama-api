import { CreateUserDTOValidation, UpdateUserDTOValidation } from "../validations/user";
import { validateZod } from "../utils/validation";
import userService from "../services/userService";
import { data, success } from "../utils/response";
import { UserResultDTO } from "../dtos/user";
import { CustomRouter } from "../utils/router";
import { IdDTOValidation } from "../validations/base";
import { allow } from "../utils/auth";

const router = new CustomRouter();

router.POST("/user", allow(["D"]), async (req) => {
    const dto = validateZod(CreateUserDTOValidation, req.body);
    const created = await userService.create(dto);
    return success({ created_id: created.id });
});

router.GET("/users", allow(["D"]), async () => {
    const users = await userService.getAll();
    const userDTOs = users.map((user) => new UserResultDTO(user));
    return data(userDTOs);
});

router.GET("/user/:id", allow(["D"]), async (req) => {
    const dto = validateZod(IdDTOValidation, { id: req.params.id });
    const userDetails = await userService.getDetails(dto);
    return data(new UserResultDTO(userDetails));
});

router.PATCH("/user/:id", allow(["D"]), async (req) => {
    const dto = validateZod(UpdateUserDTOValidation, { ...req.body, id: req.params.id });
    await userService.update(dto);
    return success();
});

router.POST("/user/:id/block", allow(["D"]), async (req) => {
    const dto = validateZod(IdDTOValidation, { id: req.params.id });
    await userService.block(dto);
    return success();
});

export default router.getRouter();
