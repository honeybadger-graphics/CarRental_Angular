import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    carId: string;
    @Column()
    carBrand: string;
    @Column()
    carName: string;
    @Column()
    carType: string;
    @Column()
    carPower: number;
    @Column()
    carWeight: number;
    @Column()
    carDeposit: number;
    @Column()
    carDailyCost: number;
}
