import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class DataEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    //
    @Column() name: string;
}
