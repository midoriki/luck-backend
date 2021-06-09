import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../user/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create({
      username: 'admin',
      name: 'Admin',
      password: 'superadmin',
      roles: 'admin',
    });
    await factory(User)().create({
      username: 'user',
      name: 'User',
      password: 'normaluser',
      roles: 'user',
    });
  }
}
