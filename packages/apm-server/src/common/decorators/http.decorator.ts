import * as lodash from 'lodash';
import { ReflectMetadata, HttpStatus } from '@nestjs/common';

// 构造器参数
interface IBuildDecoratorOption {
  errCode?: HttpStatus;
  successCode?: HttpStatus;
  errMessage?: any;
  successMessage?: any;
  usePaginate?: boolean;
}

// handle 参数
interface IHandleOption {
  error?: HttpStatus;
  success?: HttpStatus;
  message: any;
  usePaginate?: boolean;
}

type THandleOption = IHandleOption;

// 构造请求装饰器
const buildHttpDecorator = (
  options: IBuildDecoratorOption
): MethodDecorator => {
  const {
    errMessage,
    successMessage,
    errCode,
    successCode,
    usePaginate
  } = options;
  return (_, __, descriptor: PropertyDescriptor) => {
    if (errCode) {
      ReflectMetadata('META.HTTP_ERROR_CODE', errCode)(descriptor.value);
    }
    if (successCode) {
      ReflectMetadata('META.HTTP_SUCCESS_CODE', successCode)(descriptor.value);
    }
    if (errMessage) {
      ReflectMetadata('META.HTTP_ERROR_MESSAGE', errMessage)(descriptor.value);
    }
    if (successMessage) {
      ReflectMetadata('META.HTTP_SUCCESS_MESSAGE', successMessage)(
        descriptor.value
      );
    }
    if (usePaginate) {
      ReflectMetadata('META.HTTP_RES_TRANSFORM_PAGINATE', true)(
        descriptor.value
      );
    }
    return descriptor;
  };
};

/**
 * 异常响应装饰器
 * @exports success
 * @example @HttpProcessor.success('error message', 500)
 */
export const error = (
  message: any,
  statusCode?: HttpStatus
): MethodDecorator => {
  return buildHttpDecorator({ errMessage: message, errCode: statusCode });
};

/**
 * 成功响应装饰器
 * @exports success
 * @example @HttpProcessor.success('success message', 200)
 */
export const success = (
  message: any,
  statusCode?: HttpStatus
): MethodDecorator => {
  return buildHttpDecorator({
    successMessage: message,
    successCode: statusCode
  });
};

/**
 * 统配构造器
 * @function handle
 * @description 两种用法
 * @example @HttpProcessor.handle('获取某项数据')
 * @example @HttpProcessor.handle({ message: '操作', error: error, success: 200, usePaginate: true })
 */
export function handle(args: any): MethodDecorator;
export function handle(...args) {
  const option = args[0];
  const isOption = (value: any): value is IHandleOption =>
    lodash.isObject(value);
  const message: any = isOption(option) ? option.message : option;
  const errMessage: any = message + 'TEXT.HTTP_ERROR_SUFFIX';
  const successMessage: any = message + 'TEXT.HTTP_SUCCESS_SUFFIX';
  const errCode: HttpStatus = isOption(option) ? option.error : null;
  const successCode: HttpStatus = isOption(option) ? option.success : null;
  const usePaginate: boolean = isOption(option) ? option.usePaginate : null;
  return buildHttpDecorator({
    errCode,
    successCode,
    errMessage,
    successMessage,
    usePaginate
  });
}

/**
 * 分页装饰器
 * @exports paginate
 * @example @HttpProcessor.paginate()
 */
export const paginate = (): MethodDecorator => {
  return buildHttpDecorator({ usePaginate: true });
};

/**
 * 导出的不同模块
 * @exports HttpProcessor
 * @description { error, success, handle, paginate }
 */
export const HttpProcessor = { error, success, handle, paginate };
