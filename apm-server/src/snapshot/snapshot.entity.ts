import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class SnapshotEntity {
    @ObjectIdColumn() id: ObjectID;
}