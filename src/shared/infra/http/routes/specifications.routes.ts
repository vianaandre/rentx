import { CreateSpecificationsController } from "@modules/cars/useCases/createSpecification/CreateSpecificationsController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";

import { ensureAuthorization } from "@shared/infra/http/middlewares/ensureAuthorization";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuthorization);

specificationsRoutes.get("/", listSpecificationsController.handle);

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
