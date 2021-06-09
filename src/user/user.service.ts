import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  select: any[] = [
    'id',
    'name',
    'username',
    'coin',
    'birthdate',
    'address',
    'phone',
    'gender',
  ];
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: this.select,
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const newUser = this.userRepository.create(createUserDto);
    const { password, ...result } = await this.userRepository.save(newUser);
    return result;
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id, {
      select: this.select,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    await this.userRepository.update(id, updateUserDto);
    const { password, ...user } = await this.userRepository.findOne(id);
    return user;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      return null;
    }
    return this.userRepository.remove(user);
  }
}
