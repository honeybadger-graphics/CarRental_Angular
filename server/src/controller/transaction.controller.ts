import { Controller } from "./base.controller"
import { AppDataSource } from "../data-source"
import { CompanyTransactions } from "../entity/CompanyTransactions"

export class TransactionController extends Controller {
    repository = AppDataSource.getRepository(CompanyTransactions);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            delete entity.id;
            delete entity.timestamp;

            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    transactionsOfCompany = async (req, res) => {
        try {
            const companyId = req.params.companyId;

            const transactions = await this.repository.find({
                where: {
                    source: { id: companyId }
                }
            });

            res.json(transactions);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}