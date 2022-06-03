import {
  ISpecificationsRepository,
  ISpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: ISpecificationDTO) {
    const specification = await this.specificationsRepository.findByName(name);

    if (specification) {
      throw new AppError("Alread Exist", 400);
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
