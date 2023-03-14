import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interseptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    await this.usersService.createUser(body);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }
  @Get()
  async getAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.removeUser(+id);
  }
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.updataUser(+id, data);
  }
}
