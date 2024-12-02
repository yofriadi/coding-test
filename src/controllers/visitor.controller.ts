import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Visitor } from '@interfaces/visitor.interface';
import { VisitorService } from '@services/visitor.service';

export class VisitorController {
  public visitor = Container.get(VisitorService);

  public getVisitor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: Visitor[] = await this.visitor.findAll();

      res.status(200).json({ data, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
