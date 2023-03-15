import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  async signUp(user: CreateUserDto) {
    const users = await this.usersService.find(user.email);
    if (users.length) {
      throw new BadRequestException('user already exit');
    }

    //hash password
    const salt = randomBytes(8).toString('hex');
    //hash passw0rd with salt
    const hash = (await scrypt(user.password, salt, 32)) as Buffer;
    // add salt with result
    const result = salt + '.' + hash.toString('hex');
    user.password = result;
    // create and save user
    await this.usersService.createUser(user);
    return result;
  }

  async signIn(sinedUser: CreateUserDto) {
    const [user] = await this.usersService.find(sinedUser.email);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const [salt, hashedPassword] = user.password.split('.');

    const hash = (await scrypt(sinedUser.password, salt, 32)) as Buffer;

    if (hashedPassword !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    console.log(user);

    return user;
  }
}
