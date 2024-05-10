import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { LeaseDTO } from '../../../models';

import { Company } from './Company';
import { Tool } from './Tool';

@Entity()
export class Lease implements LeaseDTO {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  timestamp: Date;
  @ManyToOne(() => Company, (company) => company.companyLeases, { eager: true })
  leasingCompany: Company;
  @OneToOne(() => Tool, (tool) => tool.connectedLease, { eager: true })
  @JoinColumn()
  leasedTool: Tool;
}
