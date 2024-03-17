import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:id')
  async getHello(@Param('id') id: number) {
    return { data: await this.userService.getUser(id) };
  }
}
