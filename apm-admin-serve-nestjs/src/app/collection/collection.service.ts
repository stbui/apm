import { Component, Inject } from '@nestjs/common';
import { CollectionDb } from './collection.db';

@Component()
export class CollectionService {

    options;

    constructor() {
        this.options = {};
    }

    page(p: Number = 0, pageSize: Number = 10) {
        this.options.limit = [p, pageSize];
        return this;
    }

    select() {
        const db = CollectionDb.index;

        return db;
    }

    countSelect() {
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
        data.data = this.select();

        return data;
    }

    count(field: String = '') {
        const db = CollectionDb.index;
        return db.length;
    }
}