import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { validate } from 'class-validator';
import {
    BaseEntity,
    UpdateResult,
    DeleteResult,
    Repository,
    DeepPartial,
    FindManyOptions,
    ObjectID,
} from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Config } from '../../config/config';

@Injectable()
export class CrudService<T extends BaseEntity> {
    protected repository: Repository<T>;

    public async find(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    public async findAll(options?: FindManyOptions<T>): Promise<[T[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async findOneById(
        id?: string | number | Date | ObjectID,
        options?: FindOneOptions<T>,
    ): Promise<T> {
        return this.repository.findOneOrFail(id, options);
    }

    public async findOne(
        conditions?: FindConditions<T>,
        options?: FindOneOptions<T>,
    ): Promise<T> {
        return this.repository.findOne(conditions, options);
    }

    public async create(entityLike: DeepPartial<T>): Promise<T> {
        const entity: T = this.repository.create(entityLike);
        await this.validate(entity);
        return entity.save();
    }

    public async update(
        criteria:
            | string
            | string[]
            | number
            | number[]
            | Date
            | Date[]
            | ObjectID
            | ObjectID[]
            | FindConditions<T>,
        partialEntity: QueryDeepPartialEntity<T>,
    ): Promise<UpdateResult> {
        return this.repository.update(criteria, partialEntity);
    }

    public async patch(id: number, data: DeepPartial<T>): Promise<T> {
        const entity: T = await this.findOneById(id);
        this.repository.merge(entity, data);
        // Object.assign(entity, data);
        await this.validate(entity);
        return entity.save();
    }

    public async delete(
        criteria:
            | string
            | string[]
            | number
            | number[]
            | Date
            | Date[]
            | ObjectID
            | ObjectID[]
            | FindConditions<T>,
    ): Promise<DeleteResult> {
        return this.repository.delete(criteria);
    }

    public async validate(entity: T) {
        const errors = await validate(entity, Config.validator);
        if (errors.length) {
            throw new UnprocessableEntityException(errors);
        }
    }
}
