import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ToolDTO } from "../../../models";

@Entity()
export class Tool implements ToolDTO{
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
}
