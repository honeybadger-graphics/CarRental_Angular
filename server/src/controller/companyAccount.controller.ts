import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";

import { CompanyAccount } from "../entity/CompanyAccount";

export class CompanyAccountController extends Controller {
    repository = AppDataSource.getRepository(CompanyAccount);
    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            delete entity.id;
            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}