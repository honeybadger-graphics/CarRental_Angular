import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Company } from './Company';
import { CompanyAccountDTO, CompanyDTO } from '../../../models';

@Entity()
export class CompanyAccount implements CompanyAccountDTO {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  companyBalance: number;
  @OneToOne(() => Company, (company) => company.companyAccount, {
    onDelete: 'CASCADE',
  }) // specify inverse side as a second parameter
  @JoinColumn()
  companyOwner: CompanyDTO;
}
