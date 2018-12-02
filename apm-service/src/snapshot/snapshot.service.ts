import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class SnapshotService {
  options;

  constructor(@Inject('SnapshotModelToken') private readonly model) {
    this.options = {};
  }

  where(options: object) {
    this.options.where = options;
    return this;
  }

  async update(options: object) {
    if (!this.options.where) {
      return {
        statusCode: 500,
        error: '更新失败',
        message: '更新文档条件有误',
      };
    }

    const ret = await this.model.update(this.options.where, {
      $set: options,
    });

    return {
      statusCode: 0,
      error: '更新成功',
      message: '',
      data: ret,
    };
  }

  findById(id) {
    return this.model
      .findOne({
        _id: id,
      })
      .exec();
  }

  select(options?) {
    const model = this.model;

    let result = model.find();

    if (options) {
      result = model.find(null, options);
    }

    return result.sort({ _id: 1 }).exec();
  }

  add(data) {
    const model = new this.model(data);
    return model.save();
  }
}
