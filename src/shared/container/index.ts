import '@shared/container/providers';
import { UserRepository } from '@modules/account/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/account/repositories/IUserRepository';
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { container } from 'tsyringe';

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

// IUserRepository
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

// ICarRepository
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

// ICarImageRepository
container.registerSingleton<ICarsImageRepository>('CarsImageRepository', CarsImageRepository);

// IRentalRepository
container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository);
