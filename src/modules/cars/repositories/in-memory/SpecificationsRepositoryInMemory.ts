import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = []

    async create({ name, description }: ISpecificationDTO): Promise<Specification> {
        const specification = new Specification()
        
        Object.assign(specification, {
            description,
            name
        })

        await this.specifications.push(specification)


        return specification
    };

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((specification) => specification.name === name) 
    };

    async list(): Promise<Specification[]> {
        return this.specifications
    };

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) => ids.includes(specification.id))
        
        return allSpecifications
    }
}

export { SpecificationRepositoryInMemory }