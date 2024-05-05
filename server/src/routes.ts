import express from 'express';
import { CarController } from './controller/car.controller';
import { CompanyController } from './controller/company.controller';
import { TransactionController } from './controller/transaction.controller';
import { CompanyAccountController } from './controller/companyAccount.controller';


export function getRouter() {
    const router = express.Router();

    const carController = new CarController();

    router.get('/car', carController.getAll);
    router.get('/car/:id', carController.getOne);
    router.post('/car', carController.create);
    router.put('/car', carController.update);
    router.delete('/car/:id', carController.delete);
    
    const compamyController = new CompanyController();

    router.get('/company', compamyController.getAll);
    router.get('/company/:id', compamyController.getOne);
    router.post('/company', compamyController.create);
    router.put('/company', compamyController.update);
    router.delete('/company/:id', compamyController.delete);

    const compamyAccountController = new CompanyAccountController();

    router.get('/companyAccount', compamyAccountController.getAll);
    router.get('/companyAccount/:id', compamyAccountController.getOne);
    router.post('/companyAccount', compamyAccountController.create);
    router.put('/companyAccount', compamyAccountController.update);
    router.delete('/companyAccount/:id', compamyAccountController.delete);

    const transactionController = new TransactionController();

    router.get('/transactions', transactionController.getAll);
    router.get('/transactions/created-by/:companyId', transactionController.transactionsOfCompany);
    router.post('/transactions', transactionController.create);

    return router;
}