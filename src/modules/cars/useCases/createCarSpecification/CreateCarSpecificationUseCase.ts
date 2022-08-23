import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    car_id: string;
    specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUse {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExist = await this.carsRepository.findById(car_id)
        
        if(!carExist) {
            throw new AppError("Car does not exists!")
        }

        const specifications = await this.specificationRepository.findByIds(specifications_id)

        carExist.specifications = specifications

        await this.carsRepository.create(carExist) 

        return carExist
    }
}

export { CreateCarSpecificationUse }