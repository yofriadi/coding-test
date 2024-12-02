import { Service } from 'typedi';
import pg from '@database';
import { Visitor } from '@interfaces/visitor.interface';

@Service()
export class VisitorService {
  public async findAll(): Promise<Visitor[]> {
    const { rows } = await pg.query(`SELECT * FROM visitors;`);
    return rows;
  }
}
