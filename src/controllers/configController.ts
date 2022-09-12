import { CustomRouter } from "../utils/router";
import { allow } from "../utils/auth";
import { validateZod } from "../utils/validation";
import { GetConfigDTOValidation, SetConfigDTOValidation } from "../validations/config";
import configService from "../services/configService";
import { data, success } from "../utils/response";
import { ConfigResultDTO } from "../dtos/config";

const r = new CustomRouter();

r.GET("/config/:key", allow(["A", "B", "C", "D"]), async ({ params }) => {
    const dto = validateZod(GetConfigDTOValidation, { key: params.key });
    const value = await configService.get(dto.key);
    return data(value);
});

r.GET("/configs", allow(["D"]), async () => {
    const configs = await configService.getAll();
    const dtoList = configs.map((config) => new ConfigResultDTO(config));
    return data(dtoList);
});

r.POST("/config/:key", allow(["D"]), async ({ params, body }) => {
    const { key, value } = validateZod(SetConfigDTOValidation, {
        key: params.key,
        value: body.value,
    });
    await configService.set(key, value);
    return success();
});

export default r.getRouter();
