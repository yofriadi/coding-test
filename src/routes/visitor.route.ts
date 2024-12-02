import { Router } from 'express';
import { VisitorController } from '@controllers/visitor.controller';
import { Routes } from '@interfaces/routes.interface';

export class VisitorRoute implements Routes {
  public path = '/data';
  public router = Router();
  public visitor = new VisitorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.visitor.getVisitor);
  }
}
