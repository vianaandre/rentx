import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError("User alread exist", 400);
    }

    const passwordCrypto = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: passwordCrypto,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
