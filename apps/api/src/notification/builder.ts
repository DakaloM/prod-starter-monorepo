import { UserRole } from '@imax/client';
import { createBuilder } from '@imax/datakit';
import { faker } from '@imax/testkit';

import { User } from '~/account';
import { Gender, Race, Title } from '~/account/user';
import { Context } from '~/context';

import { Notification, NotificationCategory, NotificationStatus } from './notification';

const getUserId = async (ctx: Context, attrs: Partial<Notification>) => {
  const userId = faker.string.uuid();
  const password = 'password';
  const name = faker.person.firstName();
  const surname = faker.person.lastName();
  const sortName = `${name}${surname}`.toLowerCase();
  const tenantId = faker.string.uuid();

  return (
    userId ||
    (
      await User.query(ctx.db).insert({
        name,
        surname,
        sortName,
        role: faker.helpers.enumValue(UserRole),
        email: faker.internet.email(),
        title: faker.helpers.enumValue(Title),
        race: Race.African,
        gender: Gender.Male,
        birthDate: faker.date.past({ refDate: new Date(), years: 20 }),
        idNumber: faker.string.alphanumeric(13),
        password,
      })
    ).id
  );
};

export const notificationBuilder = createBuilder(
  async (attrs: Partial<Notification>, _factory, ctx) => {
    const userId = await getUserId(ctx as Context, attrs);
    const refId = attrs.refId || faker.string.uuid();
    const category = faker.helpers.enumValue(NotificationCategory);
    const message = faker.word.words(10);
    const status = NotificationStatus.New;

    return Notification.fromJson({
      userId,
      refId,
      category,
      message,
      status,
      attrs,
    });
  },
);
