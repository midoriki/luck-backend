import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../../user/entities/user.entity';

define(User, (faker: typeof Faker) => {
  const username = faker.internet.userName().toLowerCase();
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const phone = faker.phone.phoneNumber();
  const address = faker.address.streetAddress();
  const birthdate = faker.date.past();

  const user = new User();
  user.username = username;
  user.gender = gender;
  user.name = `${firstName} ${lastName}`;
  user.password = faker.random.word();
  user.phone = phone;
  user.address = address;
  user.birthdate = `${birthdate.getFullYear()}-${
    birthdate.getMonth() + 1
  }-${birthdate.getDate()}`;
  return user;
});
