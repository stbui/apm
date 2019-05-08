import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class ProjectEntity {
    @ObjectIdColumn() id: ObjectID;

}