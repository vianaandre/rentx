import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";

interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<User>;
  findById: (email: string) => Promise<User>;
}

export { IUserRepository };
