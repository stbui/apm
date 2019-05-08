import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';

@Injectable()
export class CrudService<T> {
  constructor(private readonly _model) {}

  public async findAll(): Promise<T[]> {
    return this._model.find().exec();
  }

  public async findOne(entity: object, projection?: string): Promise<T> {
    if (!entity) throw new BadRequestException();
    const one = await this._model.findOne(entity, projection).exec();
    if (!one) throw new NotFoundException();
    return one;
  }

  public findOneById(id: Number): Promise<T> {
    return this.findOne({ _id: id });
  }

  public findById(id: Number): Promise<T> {
    return this._model.findById(id);
  }

  public create(data: object): Promise<T> {
    const model = new this._model(data);
    return model.save();
  }

  public async update(id: Number, data: any): Promise<T> {
    const resut = await this.findById(id);

    if (!resut) {
      throw new BadRequestException();
    }

    await this._model.updateOne({ _id: id }, data);

    return await this.findById(id);
  }

  public delete(id: Number): Promise<T> {
    return this._model.deleteOne({ _id: id });
  }
}
