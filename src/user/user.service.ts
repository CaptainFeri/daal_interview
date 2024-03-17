import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getUser(id: number): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new BadRequestException('USER.NOT_FOUND');
    return user;
  }
}
