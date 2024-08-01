import { BaseModel } from '@imax/datakit';

import Objection from 'objection';
import { Context } from '~/context';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'NonBinary',
}

export enum Title {
  Mr = 'Mr',
  Ms = 'Ms',
  Mrs = 'Mrs',
  Miss = 'Miss',
  Dr = 'Dr',
  Prof = 'Prof',
  Rev = 'Rev',
  Other = 'Other',
  Advocate = 'Advocate',
}

export enum UserRole {
  Admin = 'Admin',
  Applicant = 'Applicant',
  Recruiter = 'Recruiter',
  SecretaryGeneral = 'SecretaryGeneral',
  SuperAdmin = 'SuperAdmin',
}

export enum Race {
  African = 'African',
  Coloured = 'Coloured',
  Indian = 'Indian',
  White = 'White',
  Other = 'Other',
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  NotConfirmed = 'NotConfirmed',
  Suspended = 'Suspended',
  Deleted = 'Deleted',
}

type Name = {
  name: string;
  surname: string;
};

export class User extends BaseModel {
  static tableName = 'user';
  static typeIdentifier = 'User';

  id: string;
  sequence: number;
  applicantId: string | null;
  role: UserRole;
  status: UserStatus;
  email: string;
  title: Title | null;
  name: string;
  middleName: string | null;
  surname: string;
  gender: Gender | null;
  race: Race | null;
  birthDate: Date | null;
  idNumber: string;
  sortName: string;
  password?: string | null;


  static getName({ name, surname }: Name) {
    return `${name} ${surname}`;
  }

  static getSortName(name: string, surname: string) {
    return User.getName({ name, surname }).toLowerCase().replace(/\s/g, '');
  }

  static applySearch(
    query: Objection.QueryBuilder<User, User[]>,
    db: Context['db'],
    text?: string | null,
  ) {
    if (text) {
      const rank = `ts_rank(search, websearch_to_tsquery('simple', ?))`;
      query
        .select(db.raw(`*, ${rank} as rank`, text))
        .whereRaw(`search @@ websearch_to_tsquery('simple', ?)`, text)
        .andWhereRaw(`${rank} > 0`, text)
        .orderBy('rank', 'desc');
    } else {
      query.select('*');
    }
  }

  // static get relationMappings() {
  //   return {
  //     applicant: {
  //       relation: BaseModel.HasOneRelation,
  //       modelClass: Applicant,
  //       join: {
  //         from: 'user.id',
  //         to: 'applicant.userId',
  //       },
  //     },
  //   };
  // }
}
