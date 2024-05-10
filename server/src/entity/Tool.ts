import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ToolDTO } from '../../../models';
import { Lease } from './Lease';

@Entity()
export class Tool implements ToolDTO {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  toolId: string;
  @Column()
  toolBrand: string;
  @Column()
  toolName: string;
  @Column()
  toolType: string;
  @Column()
  toolPower: number;
  @Column()
  toolWeight: number;
  @Column()
  toolDeposit: number;
  @Column()
  toolDailyCost: number;
  @Column()
  isToolAvailable: boolean;
  @OneToOne(() => Lease, (lease) => lease.leasedTool) // specify inverse side as a second parameter
  connectedLease: Lease;
}
