import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ApiService {
  options;

  constructor(@Inject('ApiModelToken') private readonly model) {
    this.options = {};
  }

  field(options: object): this {
    this.options.field = options;
    return this;
  }

  order(options: object): this {
    this.options.order = options;
    return this;
  }

  where(options: object): this {
    this.options.where = options;
    return this;
  }

  getId(): this {
    this.options.id = 1;
    return this;
  }

  find(options?: object) {
    if (this.options.where) options = this.options.where;

    return this.model.findOne(options);
  }

  add(data) {
    const model = new this.model(data);
    return model.save();
  }

  async thenAdd(data, where): Promise<object> {
    const findData = await this.where(where).find();
    if (findData !== null) {
      return { type: 'exist', data: findData };
    }
    const insertId = await this.add(data);
    return { type: 'add', data: insertId };
  }

  select(options?: object) {
    const model = this.model;
    let result;

    if (options) {
      result = model.find(this.options.where, options);
    } else {
      result = model.find();
    }

    if (this.options.order) {
      result = result.sort(this.options.order);
    }

    return result.exec();
  }

  page(p: Number = 1, pageSize: Number = 10) {
    this.options.limit = [p, pageSize];
    return this;
  }

  async countSelect(options?) {
    let limit = this.options.limit;
    let count = await this.count();
    let data = {
      count: count,
      currentPage: limit[0] - 1,
      pageSize: limit[1],
      totalPage: null,
      data: null,
    };

    const result = await this.model
      .find(null, options)
      .skip(data.currentPage * data.pageSize)
      .limit(limit[1])
      .exec();

    data.totalPage = Math.ceil(data.count / data.pageSize);
    data.data = result;

    return data;
  }

  count(field: string = '') {
    return this.model.count(field);
  }
}
