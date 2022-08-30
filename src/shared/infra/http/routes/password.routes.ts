import { ResetPasswordUserController } from '@modules/account/useCases/resetPasswordUSer/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
