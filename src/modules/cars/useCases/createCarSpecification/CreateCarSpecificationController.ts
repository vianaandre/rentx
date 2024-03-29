import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCarSpecificationUse } from './CreateCarSpecificationUseCase'


class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const { specifications_id } = request.body

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUse)

        const cars = await createCarSpecificationUseCase.execute({
            specifications_id,
            car_id: id
        })

        return response.json(cars)
    }
}

export { CreateCarSpecificationController }