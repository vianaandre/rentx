import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

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
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuario existe?
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect password or email", 400);
    }

    // Senha é correta?
    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) {
      throw new AppError("Incorrect password or email", 400);
    }

    // Gerar Token!
    const token = sign({}, "8d1974398f2164000c5e2491e08b628b", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
