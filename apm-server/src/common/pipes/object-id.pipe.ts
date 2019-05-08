import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  Injectable
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdPipe implements PipeTransform<string> {
  async transform(value, { metatype }: ArgumentMetadata) {
    if (!Types.ObjectId.isValid(value)) throw new BadRequestException();
    return value;
  }
}
