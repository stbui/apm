import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ProjectService {
  options;

  constructor(@Inject('ProjectModelToken') private readonly model) {
    this.options = {};
  }

  select(options?) {
    const model = this.model;

    let result = model.find();

    if (options) {
      result = model.find(null, options);
    }

    return result.exec();
  }

  add(data) {
    const model = new this.model(data);
    return model.save();
  }
}
