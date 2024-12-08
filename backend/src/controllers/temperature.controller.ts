import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Temperature } from '@interfaces/temperature.interface';
import { TemperatureService } from '@services/temperature.service';

export class TemperatureController {
  public service = Container.get(TemperatureService);

  private isSupportedCity(value: string): boolean {
    return ['Jakarta', 'Singapore', 'Sydney'].includes(value);
  }

  public getTemperature = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const city: string = req.query.city;
      if (!this.isSupportedCity(city)) {
        res.status(400).json({ message: 'unsupported city' });
        return;
      }

      const limit: number = req.query.limit || 30;
      let data: Temperature[] = await this.service.findAll(city, limit);
      data = data.map((d: Temperature) => ({ createdAt: d.created_at, value: d.value }));

      res.status(200).json({ data, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
