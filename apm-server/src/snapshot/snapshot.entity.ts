import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class SnapshotEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;
}