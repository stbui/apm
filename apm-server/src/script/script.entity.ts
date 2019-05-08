import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class ScriptEntity {
    @ObjectIdColumn() id: ObjectID;
}