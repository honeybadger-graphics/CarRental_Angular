import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Tool } from "../entity/Tool";

export class ToolController extends Controller {
    repository = AppDataSource.getRepository(Tool);
}