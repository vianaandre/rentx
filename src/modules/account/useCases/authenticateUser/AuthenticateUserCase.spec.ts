import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '@modules/account/repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '@modules/account/useCases/createUser/CreateUserUseCase';

import { AppError } from '@shared/errors/AppError';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '1234556',
      name: 'User Test',
      password: 'userTest123',
      email: 'user@test.com',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate nonexist user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'userexist@mail.com',
      password: '1234',
    })).rejects.toEqual(new AppError('Incorrect password or email'));
  });

  it('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '1234556',
      name: 'User Test',
      password: 'userTest123',
      email: 'user@test.com',
    };

    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'IncorrectPassword',
    })).rejects.toEqual(new AppError('Incorrect password or email'));
  });
});
