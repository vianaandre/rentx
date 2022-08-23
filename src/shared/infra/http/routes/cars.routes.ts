import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';

import { ensureAuthorization } from '@shared/infra/http/middlewares/ensureAuthorization';
import { ensureIsAdmin } from '@shared/infra/http/middlewares/ensureIsAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthorization,
  ensureIsAdmin,
  createCarController.handle,
);
carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/specifications/:id', ensureAuthorization, ensureIsAdmin, createCarSpecificationController.handle);
carsRoutes.post(
  '/images/:id',
  ensureAuthorization,
  ensureIsAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
