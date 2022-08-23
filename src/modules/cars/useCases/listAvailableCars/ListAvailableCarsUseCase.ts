import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private CarsRepository: ICarsRepository
  ) {}
  
  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.CarsRepository.listAvailable(brand, name, category_id)

    return cars
  }
}

export { ListAvailableCarsUseCase };