import { UserRepositoryInMemory } from '@modules/account/repositories/in-memory/UserRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersTokensRepositoryInMemory';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/DateProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersReposiotryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersReposiotryInMemory = new UserRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersReposiotryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory,
    );
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    await usersReposiotryInMemory.create({
      driver_license: '672199',
      email: 'me@su.td',
      name: 'Maurice Bowers',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('me@su.td');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('me@su.td'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersReposiotryInMemory.create({
      driver_license: '808651',
      email: 'cal@zep.np',
      name: 'Hulda Rodriquez',
      password: '4567',
    });

    await sendForgotPasswordMailUseCase.execute('cal@zep.np');

    expect(generateTokenMail).toBeCalled();
  });
});
