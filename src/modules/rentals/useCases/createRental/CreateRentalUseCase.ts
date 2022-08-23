import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
  ) {}

  async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
    const MINIMUM_HOUR = 24;
    const carNotAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carNotAvailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError('Theres a rental in progress for user!');
    }

    const dateNow = this.dateProvider.dateNow();
    const compareDate = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compareDate < MINIMUM_HOUR) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
