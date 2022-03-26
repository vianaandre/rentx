import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCateogryController";
import { importCateogryController } from "../modules/cars/useCases/importCategory";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  importCateogryController.handle(request, response);
});

export { categoriesRoutes };
