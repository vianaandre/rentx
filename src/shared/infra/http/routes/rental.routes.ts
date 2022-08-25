import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsBYUserController';
import { Router } from 'express';

import { ensureAuthorization } from '../middlewares/ensureAuthorization';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthorization, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthorization, devolutionRentalController.handle);
rentalRoutes.get('/user', ensureAuthorization, listRentalsByUserController.handle);

export { rentalRoutes };
