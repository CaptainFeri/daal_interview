import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService, ConfigType } from '@nestjs/config';
import { i18nValidationErrorFactory } from 'nestjs-i18n';
import * as basicAuth from 'express-basic-auth';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './datasource';
import appEnvConfig from './config/app-env.config';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { HttpExceptionFilter } from './common/filter/http.filter';

async function bootstrap() {
  const app = await NestFactory.create<any>(AppModule);
  const logger = new Logger('daal');
  const configService = app.get(ConfigService<ConfigType<typeof appEnvConfig>>);

  const swaggerInfo = configService.get('swagger', { infer: true });

  AppDataSource.initialize()
    .then(() => {
      // console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      // console.error('Error during Data Source initialization', err);
    });

  app.use(
    ['/swagger', '/swagger-json'],
    basicAuth({
      challenge: true,
      users: {
        [swaggerInfo.username]: swaggerInfo.password,
      },
    }),
  );

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('DaaL wallet API Document')
    .setDescription('API description')
    .setVersion('0.0.1')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = configService.get('port');

  await app.listen(port || 3003);
  logger.log(`Application listening on port: ${port}`);
  logger.log(`Application can see: ${await app.getUrl()}`);
  logger.log(`swagger Documentation: ${await app.getUrl()}/swagger`);
}
bootstrap();
