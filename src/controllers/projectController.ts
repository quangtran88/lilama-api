import { CustomRouter } from "../utils/router";
import { allow } from "../utils/auth";
import { validateZod } from "../utils/validation";
import { CreateProjectDTOValidation, UpdateProjectDTOValidation } from "../validations/project";
import projectService from "../services/projectService";
import { data, success } from "../utils/response";
import { ProjectResultDTO } from "../dtos/project";

const router = new CustomRouter();

router.GET("/projects", allow(["D", "C", "B"]), async ({ currentUser }) => {
    const projects = await projectService.getAll(currentUser!);
    return data(projects.map((p) => new ProjectResultDTO(p)));
});

router.POST("/project", allow(["D", "C"]), async (req) => {
    const dto = validateZod(CreateProjectDTOValidation, req.body);
    const { id: createdId } = await projectService.create(dto, req.currentUser!.username);
    return success({ createdId });
});

router.PATCH("/project/:id", allow(["D"]), async (req) => {
    const dto = validateZod(UpdateProjectDTOValidation, { ...req.body, id: req.params.id });
    await projectService.update(dto, req.currentUser!.username);
    return success();
});

export default router.getRouter();
