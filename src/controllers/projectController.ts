import { CustomRouter } from "../utils/router";
import { allow } from "../utils/auth";
import { validateZod } from "../utils/validation";
import { CreateProjectDTOValidation } from "../validations/project";
import projectService from "../services/projectService";
import { success } from "../utils/response";

const router = new CustomRouter();

router.POST("/project", allow(["D", "C"]), async (req) => {
    const dto = validateZod(CreateProjectDTOValidation, req.body);
    const { id: createdId } = await projectService.create(dto, req.currentUser!.username);
    return success({ createdId });
});

export default router.getRouter();
