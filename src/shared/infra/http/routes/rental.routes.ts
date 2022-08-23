import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { Router } from 'express';

import { ensureAuthorization } from '../middlewares/ensureAuthorization';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post('/', ensureAuthorization, createRentalController.handle);

export { rentalRoutes };
