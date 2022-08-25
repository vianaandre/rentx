import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('rentals')
class Rental {
    @PrimaryColumn()
      id: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: 'car_id' })
      car: Car;

    @Column()
      car_id: string;

    @Column()
      user_id: string;

    @Column()
      star_date: Date;

    @Column()
      end_date: Date | null;

    @Column()
      expected_return_date: Date;

    @Column()
      total: number | null;

    @CreateDateColumn()
      created_at: Date;

    @UpdateDateColumn()
      updated_at: Date;

    constructor() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}

export { Rental };
