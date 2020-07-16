import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_features')
export class FeaturesEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    //
    @Column() name: string;
}
