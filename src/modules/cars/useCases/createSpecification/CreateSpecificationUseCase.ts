import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import {
  ISpecificationsRepository,
  ISpecificationDTO,
} from "../../repositories/ISpecificationsRepository";

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
