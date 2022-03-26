import { AppError } from "../../../errors/AppError";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationServices {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specifications = this.specificationsRepository.findByName(name);

    if (specifications) {
      throw new AppError("Alread Exist", 400);
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationServices };
