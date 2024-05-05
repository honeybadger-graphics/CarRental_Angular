import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Company } from "../entity/Company";
import { CompanyAccount } from "../entity/CompanyAccount";

export class CompanyController extends Controller {
    repository = AppDataSource.getRepository(Company);
    repositoryAcc = AppDataSource.getRepository(CompanyAccount);
   
    create = async (req, res) => {
       const account = new CompanyAccount();
        try {
            const entity = this.repository.create(req.body as object);
            const companyAccount = this.repositoryAcc.create( account as object)
            delete entity.id;
           
            const entityInserted = await this.repository.save(entity);
            delete account.id;
            account.companyBalance = 15000;
            account.companyOwner =entityInserted;
            await this.repositoryAcc.save(account);
            res.json(entityInserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}