import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  user: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });

    this.user.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.user.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.user.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory };
