import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tool } from "./entity/Tool"
import { Company } from "./entity/Company"
import { CompanyTransactions } from "./entity/CompanyTransactions"
import { CompanyAccount } from "./entity/CompanyAccount"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "tool_rental",
    synchronize: true,
    logging: true,
    entities: [Tool, Company, CompanyTransactions,CompanyAccount],
    migrations: [],
    subscribers: [],
})
