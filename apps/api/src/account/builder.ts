import { createBuilder } from "@imax/datakit";
import { faker } from "@imax/testkit";

import * as argon from "argon2";
import {
  Gender,
  Race,
  UserRole,
  Title,
  User,
  UserStatus,
} from "~/account/user";
import { Context } from "~/context";




export const userBuilder = createBuilder(
  async ({ password: pwd, ...attrs }: Partial<User>, _factory, ctx) => {
    const password = pwd ? await argon.hash(pwd) : undefined;
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const sortName = `${name}${surname}`.toLowerCase();

    return User.fromJson({
      name,
      surname,
      sortName,
      role: UserRole.Admin,
      status: UserStatus.Active,
      email: faker.internet.email(),
      title: faker.helpers.enumValue(Title),
      gender: faker.helpers.enumValue(Gender),
      birthDate: faker.date.past({
        refDate: new Date(),
        years: 20,
      }),
      race: faker.helpers.enumValue(Race),
      idNumber: faker.string.alphanumeric(13),
      password,
      ...attrs,
    });
  }
);

export const registerBuilder = createBuilder(
  async ({ password: pwd, ...attrs }: Partial<User>, _factory, ctx) => {
    const password = pwd ? await argon.hash(pwd) : undefined;
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const sortName = `${name}${surname}`.toLowerCase();

    return User.fromJson({
      name,
      surname,
      sortName,
      role: UserRole.Applicant,
      status: UserStatus.Active,
      email: faker.internet.email(),
      password,
      ...attrs,
    });
  }
);


// export const registerBuilder = createBuilder(async (attrs: Partial<User>, _factory, ctx) => {
//   const email = faker.internet.email
// })
