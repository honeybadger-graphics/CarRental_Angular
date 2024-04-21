import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    companyName: string;
    @Column()
    companyContactName: string;
    @Column()
    companyTaxNumber: number;
    @Column()
    compRegNumber: number;
    @Column()
    companyHQ: string;
}