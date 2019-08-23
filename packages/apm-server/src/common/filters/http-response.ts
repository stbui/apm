import { ArgumentsHost, HttpException } from '@nestjs/common';

export const httpResponse = (
  exception: HttpException,
  host: ArgumentsHost
): void => {
  const ctx = host.switchToHttp();
  const res = ctx.getResponse();
  const status = exception.getStatus();
  let message = exception.getResponse() as any;
  if (message.error !== undefined) message = message.error;

  res.status(status).json({
    statusCode: status,
    message: message
  });
};
