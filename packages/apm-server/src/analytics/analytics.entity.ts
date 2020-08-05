import { BaseEntity, Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('apm_account')
export class AccountEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    //
    @Column() name: string;
}
