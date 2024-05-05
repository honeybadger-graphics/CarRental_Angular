import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, Transaction } from "typeorm"
import { CompanyAccount } from "./CompanyAccount";
import { CompanyDTO } from "../../../models";
import { CompanyTransactions } from "./CompanyTransactions";

@Entity()
export class Company implements CompanyDTO{
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
    @OneToOne(() => CompanyAccount, (companyAccount) => companyAccount.companyOwner, { eager: true , onDelete: 'CASCADE'} )
    companyAccount: CompanyAccount;
    @OneToMany(() => CompanyTransactions, (transactions) => transactions.source, { eager: true , onDelete: 'CASCADE'} )
    transactions: Transaction[];
}