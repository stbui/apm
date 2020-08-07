import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_account')
export class AnalyticsEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    //
    @Column() name: string;
}
