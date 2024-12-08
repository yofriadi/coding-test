import { Service } from 'typedi';
import pg from '@database';
import { Temperature } from '@interfaces/temperature.interface';

@Service()
export class TemperatureService {
  public async findAll(city: string, limit: number): Promise<Temperature[]> {
    city = city.toLowerCase();
    const { rows } = await pg.query(`SELECT * FROM ${city}_temperatures ORDER BY created_at DESC LIMIT ${limit};`);
    return rows;
  }

  public async findLast(city: string): Promise<Temperature> {
    city = city.toLowerCase();
    const { rows } = await pg.query(`SELECT * FROM ${city}_temperatures ORDER BY created_at DESC LIMIT 1;`);
    return rows[0];
  }
}
