import { Repository, EntityRepository, getRepository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create(data: ICreateUserDTO) {
    const user = await this.repository.create(data);

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const userExist = await this.repository.findOne({ email });

    return userExist;
  }

  async findById(id: string): Promise<User> {
    const userExist = await this.repository.findOne({ id });

    return userExist;
  }
}

export { UserRepository };
