import { Controller } from "./base.controller"
import { AppDataSource } from "../data-source"
import { CompanyTransactions } from "../entity/CompanyTransactions"

import { CompanyAccount } from "../entity/CompanyAccount";

export class TransactionController extends Controller {
    repository = AppDataSource.getRepository(CompanyTransactions);
    companyAccountRepository = AppDataSource.getRepository(CompanyAccount);

    create = async (req, res) => {
        try {
            const companyId = req.body.source.id;
            const amountChange = req.body.amount;
            const entity = this.repository.create(req.body as object);
            delete entity.id;
            delete entity.timestamp;
            await this.repository.save(entity);
            var currentEntity = await this.companyAccountRepository.findOneBy({ companyOwner: companyId });
            if (!currentEntity) {
                return this.handleError(res, null, 404, 'Entity is not found.');
            }
            const changedBalance = currentEntity.companyBalance  + amountChange;
            currentEntity.companyBalance = changedBalance;
            await this.companyAccountRepository.save(currentEntity);
            res.json(currentEntity);
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