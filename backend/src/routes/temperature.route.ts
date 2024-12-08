import { Router } from 'express';
import { TemperatureController } from '@controllers/temperature.controller';
import { Routes } from '@interfaces/routes.interface';

export class TemperatureRoute implements Routes {
  public path = '/data';
  public router = Router();
  public controller = new TemperatureController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getTemperature);
  }
}
