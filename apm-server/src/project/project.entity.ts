import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class ProjectEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

}