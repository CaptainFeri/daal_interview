import { ConfigService, ConfigType } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import appEnvConfig from '../config/app-env.config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<ConfigType<typeof appEnvConfig>>,
      ) => ({
        secret: configService.get('user', { infer: true }).userJwtSecret,
        signOptions: {
          expiresIn: configService.get('user', { infer: true })
            .userJwtExpirationTime,
        },
      }),
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
