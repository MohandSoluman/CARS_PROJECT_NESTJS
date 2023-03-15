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
import { AuthenticationService } from './authentication.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
  ) {}
  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    await this.authenticationService.signUp(body);
  }
  @Post('/signin')
  async signIn(@Body() body: CreateUserDto) {
    await this.authenticationService.signIn(body);
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
