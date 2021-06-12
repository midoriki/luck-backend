import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('creat-user-dto', () => {
  it('should resolve on correct data', async () => {
    const user = new CreateUserDto();
    user.username = 'thanhnv';
    user.name = 'Thanh Nguyen';
    user.password = 'password';
    user.passwordConfirmation = 'password';

    await expect(validate(user)).resolves.toHaveLength(0);
  });

  it('should reject on incorrect data', async () => {
    const usernameStartWithNumber = new CreateUserDto();

    usernameStartWithNumber.username = '1thanhnv';
    usernameStartWithNumber.name = 'Thanh Nguyen';
    usernameStartWithNumber.password = 'password';
    usernameStartWithNumber.passwordConfirmation = 'password';

    await expect(validate(usernameStartWithNumber)).resolves.toHaveLength(1);
  });
});
