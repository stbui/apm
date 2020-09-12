import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class FeaturesEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column() isAssureCoWorkaroundEnabled: boolean;
    @Column() isToolkitEnabled: boolean;
    @Column() isControlTakeoverEnabled: boolean;
    @Column() ignoreFormsAutofill: boolean;
    @Column() captureMetadataOnly: boolean;
}
