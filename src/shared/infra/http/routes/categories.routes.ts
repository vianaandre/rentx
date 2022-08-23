import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCateogryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { Router } from 'express';
import multer from 'multer';

import { ensureAuthorization } from '@shared/infra/http/middlewares/ensureAuthorization';
import { ensureIsAdmin } from '@shared/infra/http/middlewares/ensureIsAdmin';

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

const upload = multer({
  dest: './tmp',
});

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  ensureAuthorization,
  ensureIsAdmin,
  createCategoryController.handle,
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  ensureAuthorization,
  ensureIsAdmin,
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
