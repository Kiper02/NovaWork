import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SingleErrorValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
    });

    const errors = await validate(object, {
      stopAtFirstError: true,
    });

    if (errors.length > 0) {
      const firstErrorMessage = this.getFirstErrorMessage(errors[0]);
      throw new BadRequestException(firstErrorMessage);
    }

    return object;
  }

  private getFirstErrorMessage(error: ValidationError): string {
    if (error.constraints) {
      const messages = Object.values(error.constraints);
      return messages[0];
    }
    if (error.children && error.children.length > 0) {
      return this.getFirstErrorMessage(error.children[0]);
    }
    return 'Validation failed';
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
