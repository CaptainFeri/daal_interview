import {
  ArgumentsHost,
  BadGatewayException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n';
import { TranslateHandler } from '../handler/translate.handler';
import { IResponse } from '../interface/response.interface';

@Catch(HttpException)
export class HttpExceptionFilter<T>
  extends TranslateHandler
  implements ExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost) {
    this.setI18nContextFromArgumentHost(host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const result: IResponse = {
      status: exception.getStatus(),
      data: null,
      errors: {},
    };
    let httpStatus = HttpStatus.BAD_REQUEST;

    if (exception instanceof I18nValidationException) {
      result.message = this.getMessage('BAD_REQUEST');
    } else if (exception instanceof InternalServerErrorException) {
      result.message = exception.message;
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof HttpException) {
      const message = exception.message;
      if (message.includes('.')) {
        result.message = this.getMessage(exception.message);
      } else {
        if (exception.getStatus() == HttpStatus.FORBIDDEN) {
          httpStatus = HttpStatus.FORBIDDEN;
          result.message = message;
          result.errors = {};
        } else {
          httpStatus = HttpStatus.UNAUTHORIZED;
          result.message = message;
          result.errors = {};
        }
      }
    }

    response.status(httpStatus).json(result);
  }
}