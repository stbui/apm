import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_script')
export class ScriptEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;
}
