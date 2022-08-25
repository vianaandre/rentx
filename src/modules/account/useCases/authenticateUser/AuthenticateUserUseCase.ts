import auth from '@config/auth';
import { IUserRepository } from '@modules/account/repositories/IUserRepository';
import { IUsersTokensRepository } from '@modules/account/repositories/IUsersTokensRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private daysjsDateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect password or email', 400);
    }

    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) {
      throw new AppError('Incorrect password or email', 400);
    }

    const token = sign({}, auth.SECRET_TOKEN, {
      subject: user.id,
      expiresIn: auth.EXPIRES_IN_TOKEN,
    });

    const refresh_token = sign({ email }, auth.SECRET_REFRESH_TOKEN, {
      subject: user.id,
      expiresIn: auth.EXPIRES_IN_REFRESH_TOKEN,
    });

    await this.usersTokensRepository.create({
      expires_date: this.daysjsDateProvider.addDays(auth.EXPIRES_REFRESH_TOKEN_DAYS),
      refresh_token,
      user_id: user.id,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
      token,
    };
  }
}

export { AuthenticateUserUseCase };
