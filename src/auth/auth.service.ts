import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }
    const isValidate = await compare(password, user.password);
    const { password: pass, ...result } = user;
    return isValidate ? result : null;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      roles: user.roles,
      name: user.name,
      coin: user.coin
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
