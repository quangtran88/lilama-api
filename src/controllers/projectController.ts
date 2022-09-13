import {
    createDisableRoute,
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { allow } from "../utils/auth";
import { validateZod } from "../utils/validation";
import {
    CreateProjectDTOValidation,
    UpdateProjectDTOValidation,
    UploadProjectDTOValidation,
} from "../validations/project";
import projectService from "../services/projectService";
import { success } from "../utils/response";
import { ProjectResultDTO } from "../dtos/project";
import { IMPORT_PROJECT_KEY } from "../config/excelMaping";

const PATH = "/project";
const PATHS = "/projects";

const router = new CustomRouter();

createPaginateRoute(router, PATHS, projectService, ProjectResultDTO);

createGetDetailsRoute(router, PATH, projectService);

router.POST("/project", allow(["D", "C"]), async (req) => {
    const dto = validateZod(CreateProjectDTOValidation, req.body);
    const { _id: createdId } = await projectService.create(dto, req.currentUser!.username);
    return success({ createdId });
});

createUploadRoute(router, PATH, UploadProjectDTOValidation, IMPORT_PROJECT_KEY, projectService);

createUpdateRoute(router, PATH, UpdateProjectDTOValidation, projectService);

createDisableRoute(router, PATH, projectService);

export default router.getRouter();
