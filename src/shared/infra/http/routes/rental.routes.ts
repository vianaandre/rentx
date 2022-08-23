import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { Router } from 'express';

import { ensureAuthorization } from '../middlewares/ensureAuthorization';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post('/', ensureAuthorization, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthorization, devolutionRentalController.handle);

export { rentalRoutes };
