import { CreateSpecificationsController } from "@modules/cars/useCases/createSpecification/CreateSpecificationsController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { Router } from "express";

import { ensureAuthorization } from "@shared/infra/http/middlewares/ensureAuthorization";
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.get("/", listSpecificationsController.handle);

specificationsRoutes.post(
  "/",
  ensureAuthorization,
  ensureIsAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
