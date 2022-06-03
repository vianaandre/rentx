import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/account/useCases/updateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthorization } from "@shared/infra/http/middlewares/ensureAuthorization";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const upload = multer(uploadConfig.upload("./tmp/avatar"));

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuthorization,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
