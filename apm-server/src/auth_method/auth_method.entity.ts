import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class AuthMethodEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    //
    @Column() name: string;
}
