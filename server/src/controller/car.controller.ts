import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Car } from "../entity/Car";

export class CarController extends Controller {
    repository = AppDataSource.getRepository(Car);
}