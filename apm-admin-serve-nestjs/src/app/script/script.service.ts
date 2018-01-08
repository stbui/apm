import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ScriptModel } from './script.model';
import { ScriptDb } from './script.db';

@Component()
export class ScriptService {

    private options;
    private db = ScriptDb;


    constructor( @Inject('ScriptModelToken') private readonly scriptModel: Model<any>) {
        this.options = {};
    }

    field(options) {
        this.options.field = options;
        return this;
    }

    order(options) {
        this.options.order = options;
        return this;
    }

    where(options) {
        this.options.where = options;
        return this;
    }

    page(p: Number = 0, pageSize: Number = 10) {
        this.options.limit = [p, pageSize];
        return this;
    }

    getId() {
        this.options.id = 1;
        return this;
    }

    find(options?) {
        if (this.options.where) options = this.options.where;

        return this.scriptModel.findOne(options);
    }

    add(data) {
        const model = new this.scriptModel(data);
        return model.save();
    }

    async thenAdd(data, where) {
        const findData = await this.where(where).find();
        if (findData !== null) {
            return { type: 'exist', data: findData }
        }
        const insertId = await this.add(data);
        return { type: 'add', data: insertId };
    }

    select() {
        const model = this.scriptModel;
        let result = model.find();

        if (this.options.field) {
            result = model.find({}, this.options.field);
        }

        if (this.options.order) {
            return result.sort(this.options.order);
        }

        return result;
    }

    async countSelect() {
        let limit = this.options.limit;
        let count = this.count();
        let data = {
            count: null,
            currentPage: 0,
            pageSize: 10,
            totalPage: null,
            data: null
        };

        data.totalPage = Math.ceil(count / data.pageSize);
        data.currentPage = Math.floor((this.options.limit[0] / this.options.limit[1]) + 1)

        if (data.currentPage > data.totalPage) {
            if (this.options.limit) {
                data.currentPage = this.options.limit[0];
            } else {
                data.currentPage = 0;
            }
        }

        limit = [(data.totalPage - 1) * data.pageSize, data.pageSize];

        data.count = count;
        data.data = await this.select();

        return data;
    }

    count(field: String = '') {
        return 2;
    }
}