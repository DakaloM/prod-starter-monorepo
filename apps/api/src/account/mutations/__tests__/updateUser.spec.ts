
import { faker } from "@imax/testkit";
import { User, UserRole, UserStatus } from "~/account/user";
import { Context } from "~/context";
import { createContext, destroyContext } from "~/test/context";
import { Environment, createEnv, destroyEnv } from "~/test/environment"
import { Factory, createFactory } from "~/test/factory";
import { updateUser } from "~/account/mutations/updateUser";
import { omit } from "lodash";

describe('user/mutation/updateUser', () => {
  let env: Environment;
  let ctx: Context;
  let factory: Factory;
  let user : User;

  beforeAll(async () => {
    env = await createEnv()
  });

  afterAll(async () => {
    await destroyEnv(env);
  });


  beforeEach(async () => {
    ctx = await createContext(env);
    factory = createFactory(ctx);
    await factory.seed('types');
    ctx.auth.update(await factory.insert('user'));
    user = await factory.insert('user', {
      status: UserStatus.Active,
      role: UserRole.Admin
    })
  })

  afterEach(async () => {
    await destroyContext(ctx);
  });

  it('should update a user', async () => {
    const update = {
      id: user.id,
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      status: UserStatus.Inactive,
      role: UserRole.Applicant
    };

    

    const response = await updateUser(update, ctx);

    const updatedUser = await User.query(ctx.db).findById(user.id).throwIfNotFound();
    expect(updatedUser).toBeDefined();
    expect(updatedUser?.name).toEqual(update.name);
    expect(updatedUser?.status).toEqual(update.status);
    expect(updatedUser?.surname).toEqual(update.surname);
    expect(updatedUser?.role).toEqual(update.role);

    expect(response).toMatchObject(omit(updatedUser, ['search']));

  })

  it('should fail if user does not exist', async () => {
    const update = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      status: UserStatus.Inactive,
      role: UserRole.Applicant
    };

    await expect(
      updateUser(update, ctx)
    ).rejects.toMatchSnapshot();
  })


})