import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import appEnvConfig from './config/app-env.config';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, 'i18n'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvConfig],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<ConfigType<typeof appEnvConfig>>,
      ) => ({
        secret: configService.get('user', { infer: true }).userJwtRefSecret,
        signOptions: {
          expiresIn: configService.get('user', { infer: true })
            .userJwtRefExpirationTime,
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (
        configService: ConfigService<ConfigType<typeof appEnvConfig>>,
      ) => {
        const postgresConfig = configService.get('postgres', { infer: true });
        return {
          type: 'postgres',
          host: postgresConfig.url,
          port: +postgresConfig.port,
          username: postgresConfig.username,
          password: postgresConfig.password,
          database: postgresConfig.dbname,
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/**/*{.ts,.js}'],
          synchronize: false,
          migrationsRun: true,
          logging: ['warn', 'error'],
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
