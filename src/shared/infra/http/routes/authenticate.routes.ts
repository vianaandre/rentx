import { AuthenticateUserController } from '@modules/account/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokeController } from '@modules/account/useCases/refreshToken/RefreshTokenController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokeController();

authenticateRoutes.post('/session', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };
