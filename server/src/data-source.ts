import "reflect-metadata"
import { DataSource } from "typeorm"
import { Car } from "./entity/Car"
import { Company } from "./entity/Company"
import { CompanyTransactions } from "./entity/CompanyTransactions"
import { CompanyAccount } from "./entity/CompanyAccount"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "car_rental",
    synchronize: true,
    logging: true,
    entities: [Car, Company, CompanyTransactions,CompanyAccount],
    migrations: [],
    subscribers: [],
})
