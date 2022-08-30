import { ICreateUserTokenDTO } from '@modules/account/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/account/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private userTokens: UserTokens[] = [];

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find((ut) => ut.user_id === user_id && ut.refresh_token === refresh_token);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find((ut) => ut.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find((ut) => ut.refresh_token === refresh_token);

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
