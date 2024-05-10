import { Controller } from './base.controller';
import { AppDataSource } from '../data-source';
import { Lease } from '../entity/Lease';

export class LeaseController extends Controller {
  repository = AppDataSource.getRepository(Lease);
  update = async (req, res) => {
    try {
      const entity = this.repository.create(req.body as object);

      const currentEntity = await this.repository.findOneBy({ id: entity.id });
      if (!currentEntity) {
        return this.handleError(res, null, 404, 'Entity is not found.');
      }

      await this.repository.save(entity);
      res.json(entity);
    } catch (err) {
      this.handleError(res, err);
    }
  };
}
