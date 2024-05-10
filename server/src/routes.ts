import express from 'express';
import { ToolController } from './controller/tool.controller';
import { CompanyController } from './controller/company.controller';
import { TransactionController } from './controller/transaction.controller';
import { CompanyAccountController } from './controller/companyAccount.controller';
import { LeaseController } from './controller/lease.controller';


export function getRouter() {
    const router = express.Router();

    const toolController = new ToolController();

    router.get('/tool', toolController.getAll);
    router.get('/tool/:id', toolController.getOne);
    router.post('/tool', toolController.create);
    router.put('/tool', toolController.update);
    router.delete('/tool/:id', toolController.delete);
    
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

    const leaseController = new LeaseController();

    router.get('/lease', leaseController.getAll);
    router.get('/lease/:id', leaseController.getOne);
    router.post('/lease', leaseController.create);
    router.put('/lease', leaseController.update);
    router.delete('/lease/:id', leaseController.delete);
    return router;
}