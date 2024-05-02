import express from 'express';
import { CarController } from './controller/car.controller';

export function getRouter() {
    const router = express.Router();

    const carController = new CarController();

    router.get('/car', carController.getAll);
    router.get('/car/:id', carController.getOne);
    router.post('/car', carController.create);
    router.put('/car', carController.update);
    router.delete('/car/:id', carController.delete);

    return router;
}