import { BaseModel } from '@imax/datakit';

export enum ClientScope {
  auth = 'auth',
}

export class Client extends BaseModel {
  static tableName = 'client';
  id: string;
  secret: string;
  name: string;
  scope: string[];
}
