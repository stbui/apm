import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class ScriptEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;
}