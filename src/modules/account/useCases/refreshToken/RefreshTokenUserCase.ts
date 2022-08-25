import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/account/repositories/IUsersTokensRepository';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class RefreshTokeUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { sub, email } = await verify(token, auth.SECRET_REFRESH_TOKEN) as { sub: string, email: string };

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.SECRET_REFRESH_TOKEN, {
      subject: sub,
      expiresIn: auth.EXPIRES_IN_REFRESH_TOKEN,
    });

    const expires_date = this.dayjsDateProvider.addDays(
      auth.EXPIRES_REFRESH_TOKEN_DAYS,
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokeUseCase };
