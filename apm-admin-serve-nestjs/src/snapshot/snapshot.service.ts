import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class SnapshotService {
  options;

  constructor(@Inject('SnapshotModelToken') private readonly model) {
    this.options = {};
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
