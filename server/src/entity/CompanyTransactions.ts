import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Company } from "./Company";
import { CompanyTransactionsDTO } from "../../../models";

@Entity()
export class CompanyTransactions implements CompanyTransactionsDTO {
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    amount: number;
    @CreateDateColumn()
    timestamp: string;
    @Column()
    reason: string;
    @ManyToOne(() => Company,  (company) => company.transactions, { onDelete: 'CASCADE'})
    source: Company;
}