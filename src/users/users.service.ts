import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(data: CreateUserDto) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async find(email: string) {
    const data = await this.repo.find({ where: { email: email } });
    return data;
  }

  async updataUser(id: number, data: Partial<User>) {
    const user = await this.findOne(id);

    Object.assign(user, data);

    return this.repo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.findOne(id);

    return await this.repo.remove(user);
  }
}
