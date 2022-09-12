import { CustomRouter } from "../utils/router";
import { allow } from "../utils/auth";
import { validateZod } from "../utils/validation";
import {
    CreateProjectDTOValidation,
    UpdateProjectDTOValidation,
    UploadProjectDTOValidation,
} from "../validations/project";
import projectService from "../services/projectService";
import { paginate, success } from "../utils/response";
import { ProjectResultDTO } from "../dtos/project";
import { file, validateFile } from "../utils/upload";
import { IMPORT_PROJECT_KEY } from "../config/excelMaping";
import { z } from "zod";

const router = new CustomRouter();

router.GET("/projects", allow(["D", "C", "B"]), async ({ currentUser, query }) => {
    const { page = 1, limit = 20 } = query;
    const paginateProjects = await projectService.getPage(currentUser!, +page, +limit);
    const data = paginateProjects.docs.map((p) => new ProjectResultDTO(p));
    return paginate(data, paginateProjects);
});

router.POST("/project", allow(["D", "C"]), async (req) => {
    const dto = validateZod(CreateProjectDTOValidation, req.body);
    const { id: createdId } = await projectService.create(dto, req.currentUser!.username);
    return success({ createdId });
});

router.POST("/project/upload/verify", allow(["D", "C"]), file(), async ({ file }) => {
    const dtoList = validateFile(file!.path, UploadProjectDTOValidation, IMPORT_PROJECT_KEY);
    const result = await projectService.verifyUpload(dtoList);
    return success(result);
});

router.POST("/project/upload/commit", allow(["D", "C"]), async ({ body, currentUser }) => {
    const dto = validateZod(z.array(UploadProjectDTOValidation), body.data);
    const created = await projectService.commitUpload(dto, currentUser!.username);
    return success({ createdIds: created.map((project) => project._id.toString()) });
});

router.PATCH("/project/:id", allow(["D"]), async (req) => {
    const dto = validateZod(UpdateProjectDTOValidation, { ...req.body, id: req.params.id });
    await projectService.update(dto, req.currentUser!.username);
    return success();
});

export default router.getRouter();
