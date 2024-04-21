import "reflect-metadata"
import { DataSource } from "typeorm"
import { Car } from "./entity/Car"
import { Company } from "./entity/Company"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "car_Rental",
    synchronize: true,
    logging: true,
    entities: [Car, Company],
    migrations: [],
    subscribers: [],
})
