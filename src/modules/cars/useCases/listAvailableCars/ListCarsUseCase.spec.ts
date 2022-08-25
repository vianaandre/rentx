import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test',
      description: 'Descrition Test',
      daily_rate: 110.00,
      license_plate: 'DEF=1234',
      fine_amount: 40,
      brand: 'Car brand Test',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test',
      description: 'Descrition Test',
      daily_rate: 110.00,
      license_plate: 'DEF=1234',
      fine_amount: 40,
      brand: 'Car brand Test 2',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car brand Test 2',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test 2',
      description: 'Descrition Test',
      daily_rate: 110.00,
      license_plate: 'DEF=1234',
      fine_amount: 40,
      brand: 'Car brand Test 2',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car Test 2',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test 2',
      description: 'Descrition Test',
      daily_rate: 110.00,
      license_plate: 'DEF=1234',
      fine_amount: 40,
      brand: 'Car brand Test 2',
      category_id: 'category_id 2',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id 2',
    });

    expect(cars).toEqual([car]);
  });
});
